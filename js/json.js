var fs = require("fs");

function addClass(className, section, time, day, color) {

}

function deleteClass(className, section) {

}

function addSemester(id) {
    fs.readFile('../class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        //console.log("Asynchronous read: " + obj.semester1.class1.className);
        var length = Object.size(obj) + 1;
        console.log(length);
        var newSem = "semester" + length;
        console.log(newSem);
        obj.newSem = {
            "id": id
        };
        console.log(obj);
        console.log("Asynchronous read: " + obj.semester3.id);
    });
}


function deleteClass(year, semester) {

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

addSemester("Spring 2000");