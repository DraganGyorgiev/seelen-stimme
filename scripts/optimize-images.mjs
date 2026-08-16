import { readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import sharp from 'sharp'

const assetsDir = new URL('../src/assets/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const sourceFormats = new Set(['.jpg', '.jpeg', '.png', '.webp'])

// The gallery grid shows each image in a ~400px cell but the lightbox needs the full size, so gallery
// images additionally get a "-thumb" variant for the grid.
const thumbnailSuffix = '-thumb'
const thumbnail = { match: /gallery[\\/]/, maxEdge: 800, quality: 78 }

// The lightbox never shows an image larger than 90vh, so 1400px covers even a tall desktop screen.
const profiles = [
	{ match: /gallery[\\/]/, maxEdge: 1400, quality: 82 },
	{ match: /life_tree/, maxEdge: 2400, quality: 80 },
	{ match: /Logo/, maxEdge: 480, quality: 90 },
	{ match: /./, maxEdge: 1600, quality: 80 },
]

const kilobytes = (bytes) => String(Math.round(bytes / 1024)).padStart(5)

async function collectImages(directory) {
	const found = []
	for(const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name)
		if(entry.isDirectory()) found.push(...(await collectImages(path)))
		else if(sourceFormats.has(extname(entry.name).toLowerCase())) found.push(path)
	}
	return found
}

let before = 0
let after = 0
let skipped = 0

const allImages = await collectImages(assetsDir)

for(const path of allImages) {
	if(path.includes(thumbnailSuffix)) continue

	const profile = profiles.find(({ match }) => match.test(path))
	const originalSize = (await stat(path)).size
	const isWebp = extname(path).toLowerCase() === '.webp'
	// Note: sharp keeps a file handle open on a path input, which blocks the later unlink on Windows.
	const input = await readFile(path)
	const { width = 0, height = 0 } = await sharp(input).metadata()
	const oversized = Math.max(width, height) > profile.maxEdge

	await writeThumbnail(path, input)

	// Re-encoding a WebP that already fits its profile would only lose quality, so leave it alone and
	// keep this script safe to run repeatedly.
	if(isWebp && !oversized) {
		skipped++
		before += originalSize
		after += originalSize
		continue
	}

	const target = path.replace(/\.(jpe?g|png|webp)$/i, '.webp')

	const output = await sharp(input)
		.rotate()
		.resize({ width: profile.maxEdge, height: profile.maxEdge, fit: 'inside', withoutEnlargement: true })
		.webp({ quality: profile.quality })
		.toBuffer()

	if(target !== path) await unlink(path)
	await writeFile(target, output)

	const newSize = output.length
	before += originalSize
	after += newSize
	console.log(
		`${relative(assetsDir, path).padEnd(42)} ${kilobytes(originalSize)} KB -> ${kilobytes(newSize)} KB  (${Math.round((1 - newSize / originalSize) * 100)}%)`,
	)
}

console.log(
	`\n${skipped} already optimal. Total ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB` +
		` (-${Math.round((1 - after / before) * 100)}%)`,
)

async function writeThumbnail(path, input) {
	if(!thumbnail.match.test(path)) return

	const target = path.replace(/\.(jpe?g|png|webp)$/i, `${thumbnailSuffix}.webp`)
	if(await exists(target)) return

	const output = await sharp(input)
		.rotate()
		.resize({ width: thumbnail.maxEdge, height: thumbnail.maxEdge, fit: 'inside', withoutEnlargement: true })
		.webp({ quality: thumbnail.quality })
		.toBuffer()

	await writeFile(target, output)
	console.log(`${relative(assetsDir, target).padEnd(42)} ${kilobytes(output.length)} KB  (thumbnail)`)
}

async function exists(path) {
	return stat(path).then(
		() => true,
		() => false,
	)
}
