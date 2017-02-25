// var Vue = require('vue');

var main = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        buttons: [0, 1, 2, 3, 5, 6]
    }
})
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