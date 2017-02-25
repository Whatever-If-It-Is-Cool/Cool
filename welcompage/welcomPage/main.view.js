const {
    ipcRenderer
} = require('electron');

function test() {
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"
    //test
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg); // prints "pong"
    })
    ipcRenderer.send('asynchronous-message', 'ping');
}

function switchs() {
    ipcRenderer.send('processwindow');
}

function log() {
    ipcRenderer.send('processtable');
}