const scribble = require('scribbletune');

var clip = scribble.clip({
    notes: scribble.scale('C4 major'),
	pattern: 'x-'.repeat(8),
	synth: 'Synth'
});

scribble.transport.start();
clip.start();

// OR export a midi file by saving this JS as cscale.js and run node cscale.js from its location in the terminal
scribble.midi(clip, 'cscale.mid');
