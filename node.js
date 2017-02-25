    var fs = require("fs");
    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    // Asynchronous read
    fs.readFile('../class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        //console.log("Asynchronous read: " + data.toString());
        var obj = JSON.parse(data);
        //var obj2 = JSON.parse(obj.semester1);
        console.log("Asynchronous read: " + obj.semester1.class1.className);
        var length = Object.size(obj);
        console.log(length);
    });

    // Synchronous read
    // var data = fs.readFileSync('../class.json');
    // console.log("Synchronous read: " + data.toString());

    // console.log("Program Ended");