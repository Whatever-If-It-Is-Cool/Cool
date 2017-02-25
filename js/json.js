var fs = require("fs");

function addClass(className, section, time, day, color) {

}

function deleteClass(className, section) {

}

function addSemester(id) {
    fs.readFile('../source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var newSem = "semester" + length;
        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(id) == 0) {
                console.log("check");
                return -1;
            }
            console.log(obj[sem].id.localeCompare(id));
        }
        obj[newSem] = {
            "id": id
        };
        //console.log(obj);
        fs.writeFile('../source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        return 0;
        //callback = 0;
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

var temp = addSemester("Spring 2016");

console.log(temp);