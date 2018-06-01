const scribble = require('scribbletune');
let chords = scribble.clip({
	notes: 'F#m C#m DM Bm EM AM DM C#m AM',
	pattern: 'x_x_x_--'.repeat(8),
	sizzle: true
});

scribble.midi(chords, 'chords.mid');
