Why JavaScript and Music?
JavaScript is most popular web programming language
Easy to Learn
I was looking for a way to combine my passion of music and programming; both of them are math based. 
Coding is highly demanded skill and music is highly desirable in life.

How did I find Scribbletunes
Found SFNode talk on youtube
Slides from Walmik’s talk 
Searched github for code

What does Scribbletunes do?
Creates a midi file of repetitive notes or wav files
It has built in libraries to play notes,scales, and chords
You can program your own .wav files
You can concatenate multiple notes, chords, files together to create a intro, melody, chorus, song, etc
Music theory is helpful to produce tracks. It’s not needed to get started creating basic sounds.
Import these midi files into a DAW Digital audio workstation like Ableton Live or Garageband.

What is Node JS?
Used for programming on server side or non-browser based

What are the steps?
Write Code, run with node to export as Midi, import into DAW - Music is created

How do I get started?
You’ll need to download Nodejs from nodejs.org or apt-get on Linux
sudo apt-get install nodejs
apt-get install npm
apt-get nvm
You’ll need to use npm Node Package Manager to install packages 
npm install scribbletune
npm install --save tonal
npm install browserify
npm install jsmidgen
npm install --save pluggable-synth
Clone repo from Github
Apt-get install git
Git clone https://github.com/walmik/scribbletune.git




Demo Time - Let’s make some music - Example Script

const scribble = require ('../src');


let cMajor = scribble.scale('c', 'major');
let clip1 = scribble.clip({
        notes: cMajor.filter((a, x) => x % 2 === 0),
        pattern: 'x-x-x-x-x-x-x-x-'
});
let clip2 = scribble.clip({
        notes: cMajor.filter((a, x) => x % 2),
        pattern: 'x-'.repeat(8)
});

scribble.midi(clip1.concat(clip2));









