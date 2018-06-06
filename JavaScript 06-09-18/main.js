const scribble = require('scribbletune');
scribble.transport.start(140);

scribble.clip({ sample: '/kick.wav', pattern: 'x' }).start();
scribble.clip({ sample: '/bass.wav', pattern: '[--xx]' }).start();
scribble.clip({ sample: '/hats.wav', pattern: '[-x]' }).start();
