import { msg } from '@lit/localize'

export type FaqEntry = {
	question: string
	answer: string
}

export type FaqTopic = {
	id: string
	label: string
	entries: FaqEntry[]
}

export function getFaqTopics(): FaqTopic[] {
	return [
		{
			id: 'jk',
			label: msg('Jenseitskontakt'),
			entries: [
				{
					question: msg('Wie gehe ich bei einem Jenseitskontakt vor?'),
					answer: msg(
						'Als beweisführendes Medium möchte ich keinerlei Vorinformationen von dir oder deinen Lieben erhalten – so stelle ich sicher, dass ich alle Informationen ausschließlich von deinem Lieben erhalte.\n\nZuallererst beschreibe ich dir deinen Lieben, damit du sicher sein kannst, dass es sich um die richtige Seele handelt. Danach erhältst du eine persönliche Botschaft oder auch mehrere Botschaften.\n\nIm Anschluss kannst du gerne 2–3 Fragen an deine liebe Seele stellen – oder auch an mich, falls noch Unklarheiten bestehen.',
					),
				},
				{
					question: msg('Wo findet die Jenseitssitzung statt?'),
					answer: msg(
						'Die Jenseitssitzung findet ausschließlich über Zoom oder WhatsApp statt. Bitte beachte, dass nur über Zoom eine Aufzeichnung der Sitzung möglich ist.',
					),
				},
				{
					question: msg('Was ist, wenn sich keine Verbindung zeigt?'),
					answer: msg(
						'Ich arbeite beweisführend: Zuerst beschreibe ich die Person, die sich zeigt, damit du selbst erkennen kannst, um wen es geht. In aller Regel kommt eine Verbindung zustande – versprechen lässt sich das aus der Natur dieser Arbeit heraus jedoch nicht. Sollte sich wider Erwarten keine Verbindung einstellen, finden wir gemeinsam eine Lösung.',
					),
				},
			],
		},
		{
			id: 'sw',
			label: msg('Seelenweg'),
			entries: [
				{
					question: msg('Was ist ein Seelenweg?'),
					answer: msg(
						'Der Seelenweg ist eine gechannelte Sitzung, in der ich mich mit deiner Seele verbinde und weitergebe, was sich zeigt: welche Themen dich gerade prägen, welche Aufgaben zu deinem Weg gehören und welcher Schritt als Nächstes ansteht.\n\nIm Unterschied zum Jenseitskontakt geht es dabei nicht um Verstorbene, sondern um dich – um deine Situation, deine Muster und deine Richtung.\n\nAm Ende hast du Antworten auf die Fragen, die dich beschäftigen, und ein klareres Bild davon, wohin dein Weg führt.',
					),
				},
				{
					question: msg('Ist der Seelenweg das Richtige für mich?'),
					answer: msg(
						'Vermutlich ja, wenn du in einer Situation steckst, in der du nicht weiterweißt, wenn sich bestimmte Muster in deinem Leben immer wiederholen, oder wenn du spürst, dass etwas Grundsätzliches nicht stimmig ist.\n\nGeht es dir dagegen um eine konkrete Frage zu einer aktuellen Situation, ist die mediale Beratung meist die passendere Wahl. Und wenn du Kontakt zu einer verstorbenen Person suchst, ist der Jenseitskontakt der richtige Weg.\n\nWenn du unsicher bist, schreib mir einfach – ich sage dir ehrlich, was zu deinem Anliegen passt.',
					),
				},
				{
					question: msg('Findet ein Vorgespräch statt?'),
					answer: msg(
						'Ein Vorgespräch ist nicht unbedingt erforderlich. Du kannst mir deine Fragen, die du bereits im Vorfeld hast, aber gerne mitteilen – so lasse ich diese in mein Channeling einfließen.',
					),
				},
				{
					question: msg('Was bekomme ich in der Sitzung?'),
					answer: msg(
						'Am Ende unserer Sitzung erhältst du die gesamte Sitzung als Video und den Bericht der Sitzung in schriftlicher Form per E-Mail zugeschickt.',
					),
				},
			],
		},
		{
			id: 'ablauf',
			label: msg('Ablauf & Organisation'),
			entries: [
				{
					question: msg('Wie vereinbare ich einen Termin?'),
					answer: msg(
						'Schreib mir über das Kontaktformular, per E-Mail oder direkt über WhatsApp und nenne mir die gewünschte Leistung. Ich melde mich mit möglichen Terminen bei dir zurück.\n\nFür den Jenseitskontakt sind die Termine zeitweise ausgebucht – melde dich trotzdem gerne, dann sage ich dir Bescheid, sobald wieder etwas frei wird.',
					),
				},
				{
					question: msg('In welcher Sprache finden die Sitzungen statt?'),
					answer: msg(
						'Die Sitzungen finden auf Deutsch oder auf Englisch statt. Sag mir bei der Terminanfrage einfach, was dir lieber ist.',
					),
				},
				{
					question: msg('Wie und wann bezahle ich?'),
					answer: msg(
						'Die Bezahlung erfolgt vor der Sitzung über die Zahlungsmethode, die wir gemeinsam vereinbaren. Die Details bekommst du von mir, sobald der Termin feststeht.',
					),
				},
				{
					question: msg('Muss ich mich auf die Sitzung vorbereiten?'),
					answer: msg(
						'Nein. Du brauchst nichts vorzubereiten und nichts mitzubringen. Sorge nur dafür, dass du während der Sitzung ungestört bist und eine stabile Internetverbindung hast.\n\nWenn du magst, kannst du dir vorher Fragen notieren – nötig ist das aber nicht.',
					),
				},
				{
					question: msg('Was ist, wenn ich während der Sitzung sehr emotional werde?'),
					answer: msg(
						'Das ist völlig in Ordnung und kommt häufig vor. Wir machen so lange Pause, wie du brauchst, und du bestimmst das Tempo. Es gibt nichts, was du „richtig“ machen musst.',
					),
				},
				{
					question: msg('Kann ich einen Termin verschieben oder absagen?'),
					answer: msg(
						'Ja. Bitte sage mindestens 24 Stunden vorher per E-Mail ab, dann finden wir einen neuen Termin. Bei kurzfristigeren Absagen wird der volle Preis der gebuchten Leistung als Ausfallgebühr fällig – die Details stehen in den AGB.',
					),
				},
			],
		},
	]
}
