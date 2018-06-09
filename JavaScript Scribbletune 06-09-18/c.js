const scribble = require('scribbletune');
var clip = scribble.clip({
    notes: 'c4'
});
scribble.midi(clip);
