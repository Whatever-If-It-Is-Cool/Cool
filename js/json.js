var fs = require("fs");
//var flag = true;
function log() {
    console.log('dsad');
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
    fs.readFile('../source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var hasSameClass = false;
        var hasSemester = false

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(semester) == 0) {
                var numClass = Object.size(obj[sem]);
                hasSemester = true;
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

        fs.writeFile('../source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasSameClass) return -1;
        else return 0;
    });
    fs.close;
}

function deleteClass(semester, className, section) {
    fs.readFile('../source/class.json', function (err, data) {
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


        fs.writeFile('../source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (deleted) return 0;
        else return -1;
    });


}

function addSemester(id) {
    var flag = true;
    fs.readFile('../source/class.json', function (err, data) {
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
            fs.writeFile('../source/class.json', JSON.stringify(obj), function (err) {
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
    fs.readFile('../source/class.json', function (err, data) {
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


        fs.writeFile('../source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasElement) return 0;
        else return -1;
    });
}

function findNote(semester, className, section) {
    var path = "../resource/" + semester + "/" + className + "/" + section;

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

// var temp = addSemester("Fall 2018");
// console.log(temp);

//deleteSemester("Spring 2016");

//semester, className, section
//deleteClass("Fall 2016", "COMS 309", "1");

//semester, className, section, starTime, endTime, day, color
//addClass("Fall 2016", "COMS 331", "1", "4:10", "5:10", ["Mon", "Wed", "Fri"], "none");

//addSemester("test4");

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
    fs.readFile('../source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var hasSameClass = false;
        var hasSemester = false

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(classes.class2.semester) == 0) {
                var numClass = Object.size(obj[sem]);
                // hasSemester = true;
                // for (var j = 1; j < numClass; j++) {
                //     var checkClass = "class" + j;
                //     if ((obj[sem][checkClass].className.localeCompare(className) == 0) &&
                //         (obj[sem][checkClass].section.localeCompare(section) == 0)) {
                //         hasSameClass = true;
                //         return -1;
                //     }
                // }
                // if (!hasSameClass) {
                //     var newClass = "class" + numClass;
                //     obj[sem][newClass] = newData;
                // }


                var size = Object.size(classes);
                //var size = classes.length
                for (var k = 0; k < size; k++) {
                    var newClass = "class" + (numClass + k);
                    var temp = "class" + (k + 1);
                    console.log(temp);
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

        fs.writeFile('../source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasSameClass) return -1;
        else return 0;
        fs.close;
    });
}

// classes = {
//     "class1": {
//         "semester": "test",
//         "className": "COMS 362",
//         "section": "1",
//         "startTime": "4:10",
//         "endTime": "5:10",
//         "day": ["Mon", "Wed", "Fri"],
//         "color": "none",
//         "note": []
//     },
//     "class2": {
//         "semester": "test",
//         "className": "COMS 372",
//         "section": "1",
//         "startTime": "4:10",
//         "endTime": "5:10",
//         "day": ["Mon", "Wed", "Fri"],
//         "color": "none",
//         "note": []
//     }
// };
// addClassSync(classes);
// addClass("test1231231", "COMS 371", "1", "4:10", "5:10", ["Mon", "Wed", "Fri"], "none");
// addClass("test1231231", "COMS 372", "1", "4:10", "5:10", ["Mon", "Wed", "Fri"], "none");