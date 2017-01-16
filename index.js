var midi = require('midi');
var fs = require('fs');
var brightness = require('brightness');
var input = new midi.input();
var stream = midi.createReadStream(input);
var exec = require('child_process').exec;
var child;

brightness.get().then(level => {
  console.log(level);
});
console.log(input.getPortCount());
console.log(input.getPortName(0));
input.on('message', function(deltaTime, message) {
  console.log('m:' + message[0] + ' d:' + deltaTime);
  console.log(typeof message[0]);

  if (message[0] == 144 && message[2] > 0) {
    brightness.set(message[1]/79);
  }

  if (message[0] == 144 && message[2] > 0) {
    child = exec("pwd", function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
});
input.openPort(0);
//var inStream = midi('Keystation Mini 32');

