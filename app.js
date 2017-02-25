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


//定义一个创建浏览器窗口的方法
function createWindow() {
    // 创建一个浏览器窗口对象，并指定窗口的大小
    // 1024×768 合理的窗口大小
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080
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
    addSemester(arg);
});

ipcMain.on('close-start-window', (event, arg) => {
    settingsWindow.close();
});

ipcMain.on('getsemester', (event, arg) => {
    listsemester(function (resoponse) {
        event.sender.send('getsemester-reply', resoponse);
    })

});
ipcMain.on('switchtotable', (event, arg) => {
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
    addClassSync(classes);
    console.log(listsemester(function (resoponse) {
        console.log(resoponse);
    }));
    settingsWindow.close();
    createWindow();
});
ipcMain.on('processtable', (event, arg) => {
    log();
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
app.on("ready", createWindow);

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

function log() {
    mainWindow.loadURL('file://' + __dirname + '/Table.html');
}

function addClass(semester, className, section, startTime, endTime, day, color) {
    var newData = {
        "className": className,
        "section": section,
        "startTime": startTime,
        "endTime": endTime,
        "day": day,
        "color": color,
        "note": []
    };

    //读取文档找到正确位置插入
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var hasSameClass = false;

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(semester) == 0) {
                var numClass = Object.size(obj[sem]);
                for (var j = 1; j < numClass; j++) {
                    var checkClass = "class" + j;
                    if ((obj[sem][checkClass].className.localeCompare(className) == 0) &&
                        (obj[sem][checkClass].section.localeCompare(section) == 0)) {
                        hasSameClass = true;
                        return -1;
                    }
                }
                if (!hasSameClass) {
                    var newClass = "class" + numClass;
                    //obj[sem][newClass] = JSON.parse(newData);
                    obj[sem][newClass] = newData;
                }
            }
        }

        fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasSameClass) return -1;
        else return 0;
    });
}

function deleteClass(semester, className, section) {
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var deleted = false;

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(semester) == 0) {
                var numClass = Object.size(obj[sem]);
                //console.log(numClass);
                for (var j = 1; j < numClass; j++) {
                    var newClass = "class" + j;

                    if ((obj[sem][newClass].className.localeCompare(className) == 0) &&
                        (obj[sem][newClass].section.localeCompare(section) == 0)) {
                        delete obj[sem][newClass];
                        deleted = true;
                        console.log("find equal");
                    }
                    if (deleted && j != (numClass - 1)) {
                        var succ = j + 1;
                        var temp = "class" + succ;
                        obj[sem][newClass] = obj[sem][temp];
                        //console.log("shift " + newClass);
                    }
                    if (j = (length - 1)) {
                        var lastClass = "class" + j;
                        delete obj[sem][lastClass];
                        //console.log("delelte last element " + newClass + " " + j + " " + lastClass);
                    }

                }
            }
        }


        fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (deleted) return 0;
        else return -1;
    });


}
//dsfdsad
function addSemester(id) {
    var flag = true;
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
            // return;
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var newSem = "semester" + length;
        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(id) == 0) {
                console.log("check");
                //return -1;
                flag = false;
            }
            //console.log(obj[sem].id.localeCompare(id));
        }
        if (flag) {
            obj[newSem] = {
                "id": id
            };
            //console.log(obj);
            fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
                if (err) {
                    return console.error(err);
                    // return;
                }
            });
            //return 0;
        }
    });
    return flag;
}

//删除学期，id是“Fall 2016”这样的形式
function deleteSemester(id) {
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var hasElement = false;

        //找名字和id一样的学期 然后删掉
        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(id) == 0) {
                delete obj[sem];
                hasElement = true;
            }
            if (hasElement && i != length) {
                var succ = i + 1;
                var temp = "semester" + succ;
                obj[sem] = obj[temp];
            }
            if (i == length) {
                delete obj[sem];
            }
        }


        fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasElement) return 0;
        else return -1;
    });
}

function listsemester(pointer) {
    var semesters = [];
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            semesters.push(obj[sem].id);
        }
        return pointer(semesters);
    });
    fs.close;
}

function addClassSync(classes) {
    // var newData = {
    //     "className": className,
    //     "section": section,
    //     "startTime": startTime,
    //     "endTime": endTime,
    //     "day": day,
    //     "color": color,
    //     "note": []
    // };

    //读取文档找到正确位置插入
    //var data = fs.readFileSync('../class.json');
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var hasSameClass = false;
        var hasSemester = false

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(classes.class1.semester) == 0) {
                var numClass = Object.size(obj[sem]);

                var size = Object.size(classes);
                //var size = classes.length
                for (var k = 0; k < size; k++) {
                    var newClass = "class" + (numClass + k);
                    var temp = "class" + (k + 1);
                    console.log("class " + temp);
                    var newData = {
                        "className": classes[temp].className,
                        "section": classes[temp].section,
                        "startTime": classes[temp].startTime,
                        "endTime": classes[temp].endTime,
                        "day": classes[temp].day,
                        "color": classes[temp].color,
                        "note": []
                    };
                    obj[sem][newClass] = newData;
                    console.log(newData);
                }
            }
        }

        fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasSameClass) return -1;
        else return 0;
        fs.close;
    });
}

var mkdirp = require('mkdirp');

function newNote(semester, className, noteName, data) {
    var path = "../source/Notes/" + semester + "/" + className;

    mkdirp(path, function (err) {

        // path exists unless there was an error
        path += "/" + noteName;

        fs.writeFile(path, data, function (err) {
            if (err) {
                return console.error(err);
            }
        });

    });


    fs.close;
}


var fs = require("fs");

Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};