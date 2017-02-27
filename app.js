// --- 主要依赖 ---
// 载入electron模块
const electron = require("electron");
// 创建应用程序对象
const app = electron.app;
// 创建一个浏览器窗口，主要用来加载HTML页面
const BrowserWindow = electron.BrowserWindow;

// --- 其他依赖 ---
const {
    ipcMain
} = require('electron');
// --- 窗口 ---
// 声明一个BrowserWindow对象实例
let mainWindow;
var settingsWindow = null;
var backendfunctions = require('./js/json.js');

//定义一个创建浏览器窗口的方法
function createWindow() {
    // 创建一个浏览器窗口对象，并指定窗口的大小
    // 1024×768 合理的窗口大小
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        title: "Cynotepp",
        icon: './src/windows/bgbg.jpg'
    });

    //addClass("test1231231", "COMS 353", "1", "4:10", "5:10", ["Mon", "Wed", "Fri"], "none");
    // 通过浏览器窗口对象加载index.html文件，同时也是可以加载一个互联网地址的
    // 同时也可以简化成：mainWindow.loadURL('./index.html');
    mainWindow.loadURL('file://' + __dirname + '/welcompage/welcomPage/welcomPage.html');
    // mainWindow.loadURL('http://www.sushithedog.com');
    // 打开程序的同时打开开发者工具
    // mainWindow.openDevTools();
    // 监听浏览器窗口对象是否关闭，关闭之后直接将mainWindow指向空引用，也就是回收对象内存空间
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}
ipcMain.on('asynchronous-message', (event, arg) => {
    event.sender.send('asynchronous-reply', 'pong');
});
ipcMain.on('switchto', (event, arg) => {
    mainWindow.loadURL('file://' + __dirname + '/src/windows/' + arg + '.html');
});
ipcMain.on('createsemester', (event, arg) => {
    backendfunctions.addSemester(arg);
});

ipcMain.on('close-start-window', (event, arg) => {
    settingsWindow.close();
});

ipcMain.on('getsemester', (event, arg) => {
    backendfunctions.listsemester(function (resoponse) {
        event.sender.send('getsemester-reply', resoponse);
    })

});
ipcMain.on('switchtotable', (event, arg) => {
    mainWindow.loadURL('file://' + __dirname + '/Table.html');
    console.log(arg);
});
ipcMain.on('createcourse', (event, arg) => {
    var classes = new Object();
    for (var i = 0; i < arg[0].length; i++) {
        var days = [];
        if (arg[0][i].mon == true) {
            days.push("Mon");
        }
        if (arg[0][i].tue == true) {
            days.push("Tue");
        }
        if (arg[0][i].wed == true) {
            days.push("Wed");
        }
        if (arg[0][i].thu == true) {
            days.push("Thu");
        }
        if (arg[0][i].fri == true) {
            days.push("Fri");
        }
        classes["class" + (i + 1)] = {
            semester: arg[1],
            className: arg[0][i].courseid,
            section: arg[0][i].section,
            startTime: arg[0][i].starttime,
            endTime: arg[0][i].endtime,
            day: days,
            color: arg[0][i].color,
            note: []
        };
    }
    backendfunctions.addClassSync(classes);
    console.log(backendfunctions.listsemester(function (resoponse) {
        console.log(resoponse);
    }));
    settingsWindow.close();
    createWindow();
});
ipcMain.on('processtable', (event, arg) => {
    backendfunctions.log();
});
ipcMain.on('processwindow', (event, arg) => {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        height: 700,
        width: 1080,
        frame: false
    });

    settingsWindow.loadURL('file://' + __dirname + '/src/windows/start/start.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});
ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    event.returnValue = 'pong';
});
// 监听应用程序对象是否初始化完成，初始化完成之后即可创建浏览器窗口
app.on("ready", function () {
    // app.setAboutPanelOptions({
    //     applicationName: 'CyNote',
    //     applicationVersion: '0.1.0',
    //     copyright: 'Whatever if it is cool',
    //     version: '0.1.2'
    // });
    createWindow();
});

// 监听应用程序对象中的所有浏览器窗口对象是否全部被关闭，如果全部被关闭，则退出整个应用程序。该
app.on("window-all-closed", function () {
    // 判断当前操作系统是否是window系统，因为这个事件只作用在window系统中
    if (process.platform != "darwin") {
        // 退出整个应用程序
        app.quit();
    }
});

// 监听应用程序图标被通过点或者没有任何浏览器窗口显示在桌面上，那我们应该重新创建并打开浏览器窗口，避免Mac OS X系统回收或者销毁浏览器窗口
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});