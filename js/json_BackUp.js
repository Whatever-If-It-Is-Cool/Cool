var fs = require("fs");
var mkdirp = require('mkdirp');




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
                    }
                    if (j = (length - 1)) {
                        var lastClass = "class" + j;
                        delete obj[sem][lastClass];
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
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var newSem = "semester" + length;
        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(id) == 0) {
                console.log("check");
                flag = false;
            }
        }
        if (flag) {
            obj[newSem] = {
                "id": id
            };
            fs.writeFile('../source/class.json', JSON.stringify(obj), function (err) {
                if (err) {
                    return console.error(err);
                    // ;
                }
            });
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

function listsemester(pointer) {
    var semesters = [];
    fs.readFile('../source/class.json', function (err, data) {
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

var fs = require("fs");
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function addClassSync(classes) {
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
// listsemester(function (response) {
//     console.log(response);
// });

function ListNotes(semester, className, callback) {
    var path = "../source/Notes/" + semester + "/" + className;
    var files = [];
    fs.readdir(path, function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function (file) {
            files.push(file);
            console.log(file);
        });
        return callback(files);
    });

}

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

function getNote(semester, className, noteName, callback) {
    var path = "../source/Notes/" + semester + "/" + className + "/" + noteName;
    var buf = new Buffer(1024);
    console.log("Going to open an existing file");
    fs.open(path, 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("File opened successfully!");
        console.log("Going to read the file");

        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }

            // Print only read bytes to avoid junk.
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
            }

            // Close the opened file.
            fs.close(fd, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("File closed successfully.");
            });
            return callback(buf);
        });
    });
}
// newNote("Spring", "COMS228", "Lecture1", "HelloWorld");
// ListNotes("Spring", "COMS228");
//getNote("Spring", "COMS228", "Lecture1", function () {});