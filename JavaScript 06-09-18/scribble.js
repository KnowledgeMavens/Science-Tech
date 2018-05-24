/*
const scribble = require('scribbletune');
var clip = scribble.clip({
    notes: 'c4'
});
scribble.midi(clip);
'''
*/
const scribble = require('scribbletune');
let chords = scribble.clip({
	notes: 'F#m C#m DM Bm EM AM DM C#m AM',
	pattern: 'x_x_x_--'.repeat(8),
	sizzle: true
});

scribble.midi(chords, 'chords.mid');
