(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 * Caper Module
 * @version Alpha 0.2.7
 * Ajax Module
 * @varsion Beta 1.0.12
 * @CHANGELOG
 */
var Cp$ = {
    /**
     * @Todo add part of DOM work
     * 
     * @param {target of DOM} target 
     * @param {data of Caper} data 
     */
    Caper: function (target, data) {
        //default setting of caperjs
        var capersettings = {
            mode: 'select',
            elem: 'DOM',
            start: 0,
            end: 233,
            decimal: 0,
            countdowntimer: 1,
            duration: 500,
            startstring: '',
            endstring: '',
            type: [],
            pause: 0.5,
            animate: '',
            effect: '',
            endfunction: function () {},
            midfunction: function () {},
            startfunction: function () {}
        };
        for (var i in data) {
            capersettings[i] = data[i];
        }
        var elem;
        //default method of elem settings
        switch (capersettings.elem) {
            case 'DOM':
                elem = document.getElementById(target);
                break;
                //in Devlopment
            case 'Angular':
            case 'Vue':
                elem = target;
                break;
            case 'React':
                elem = target;
                break;
            case 'PART of DOM':
                break;
            case 'ENTIREDOM':
                elem = document.getElementById(target);
                elem = elem.innerHTML;
                break;
            default:
                elem = document.getElementById(target);
        }
        var re = Cp$.caperjs.verify.mode(elem, capersettings);
    },
    caperjs: {
        //:( forgot!
        analysisdata: function (data) {

        },
        //uneffect function will delete after few paths
        caper: {
            /**
             * 
             * 
             * @param {elem} elem 
             * @param {content} message 
             */
            report: function (elem, content) {
                console.log(elem + ' : ' + content);
            },
            /**
             * 
             * 
             * @param {elem} elem 
             * @param {data} data 
             */
            countup: function (elem, data) {
                var startVal = data.start;
                var endVal = data.end;
                var decimal = data.decimal;
                var duration = data.duration;
                var value;

                function startCount(time) {
                    //after one run, requestAnimationFrame will applay timestamp to s
                    value = startVal + (endVal - startVal) * (time / duration);
                    value = Math.min(endVal, value);
                    elem.innerHTML = value.toFixed(decimal);
                    if (time < duration) {
                        requestAnimationFrame(startCount);
                    }
                    // console.log(time);
                }
                requestAnimationFrame(startCount)
            },
            //count down
            /**
             * 
             * 
             * @param {target} elem 
             * @param {data} data 
             * @param {mode} mode 
             */
            countdown: function (elem, data, mode) {
                var startVal = data.start;
                var endVal = data.end;
                var decimal = data.decimal;
                var duration = data.duration;
                var value = startVal;
                //normal count
                function startCount(time) {
                    //after one run, requestAnimationFrame will applay timestamp to s
                    value = startVal - (startVal - endVal) * (time / duration);
                    value = Math.max(endVal, value);
                    elem.innerHTML = value.toFixed(decimal);
                    if (time < duration) {
                        requestAnimationFrame(startCount);
                    }
                }
                //sec count
                function secCount() {
                    //Count as timer
                    value = value - 1;
                    if (value < endVal) {
                        data.endfunction();
                        return;
                    } else {
                        elem.innerHTML = value.toFixed(decimal);
                        setTimeout(secCount, 1000);
                    }
                }
                //switch of modes
                switch (mode) {
                    case 'normal':
                        requestAnimationFrame(startCount);
                        break;
                    case 'sec':
                        setTimeout(secCount, 100);
                        break;
                    default:
                        requestAnimationFrame(startCount);
                }
            },
            //new way to count down by sec
            countdownorder: function (elem, data) {
                var startVal = data.start;
                var endVal = data.end;
                var decimal = data.decimal;
                var value = startVal;
                var timer = countdowntimer * 1000;
                if (data.elem == 'Vue') {
                    var target = elem;
                } else {
                    var target = elem.innerHTML;
                }
                target = startVal.toFixed(decimal);

                function countdowns() {
                    data.startfunction();
                    countdown();
                }

                function countdown() {
                    value--;
                    if (value < endVal) {
                        //call endfunction
                        data.endfunction();
                        return;
                    } else {
                        target = value.toFixed(decimal);
                        data.midfunction();
                        setTimeout(secCount, timer);
                    }
                }
                setInterval(countdowns, timer);

            },
            curvecountup: function (target, data) {

            },
            curvecountdown: function (target, data) {

            },
            //old method of iter
            iter: function (elem, data) {
                var startstring = data.startstring;
                var endstring = data.endstring;
                var duration = data.duration;
                var frame = 6;
                console.log(frame);
                requestAnimationFrame(startCount);

                function startCount(time) {
                    //after one run, requestAnimationFrame will applay timestamp to s
                    if (frame < 6) {
                        frame++;
                        requestAnimationFrame(startCount);
                        console.log(frame);
                    } else {
                        value = Cp$.caperjs.random.string(15);
                        elem.innerHTML = value;
                        if (time < duration) {
                            requestAnimationFrame(startCount);
                        }
                        frame = 0;

                        console.log(frame);
                    }
                }

            },
            //new way to iter
            iternew: function (elem, data) {
                console.log(elem);
                var tar = data.endstring;
                var value = data.startstring;
                if (tar.length != value.length) {
                    value = Cp$.caperjs.random.string(tar.length);
                }
                var count = 0;
                var dur = Math.min(data.duration, 58);
                setTimeout(itrr, dur);

                function itrr() {
                    value = howmuchsame(tar, value);
                    elem.innerHTML = value;
                    if (tar != value) {
                        count++;
                        setTimeout(itrr, dur);
                    } else {
                        console.log('DONE -> Times: ' + count);
                    }
                }

                function howmuchsame(tar, val) {
                    for (var i = 0; i < tar.length; i++) {
                        if (val.charAt(i) != tar.charAt(i)) {
                            var ran = Cp$.caperjs.random.string(1);
                            val = val.substring(0, i) + ran + val.substring(i + 1, val.length);
                        }
                    }
                    return val;
                }
            },
            //faster version of iter
            iterfaster: function (elem, data) {
                var tar = data.endstring;
                var value = data.startstring;
                if (tar.length != value.length) {
                    value = Cp$.caperjs.random.string(tar.length);
                }
                // var value = Cp$.caperjs.random.string(tar.length);
                var count = 0;
                var dur = Math.min(data.duration, 58);
                setTimeout(itrr, dur);
                if (data.elem == 'Vue') {
                    var target = elem;
                } else {
                    var target = elem.innerHTML;
                }

                function itrr() {
                    value = howmuchsame(tar, value);
                    target = value;
                    if (tar != value) {
                        count++;
                        setTimeout(itrr, dur);
                    } else {
                        console.log('DONE -> Time: ' + count);
                    }
                }

                function howmuchsame(tar, val) {
                    var diff = tar.length;
                    for (var i = 0; i < tar.length; i++) {
                        if (val.charAt(i) != tar.charAt(i)) {
                            var ran = Cp$.caperjs.random.instring(diff, tar.charAt(i))
                            val = val.substring(0, i) + ran + val.substring(i + 1, val.length);
                        } else {
                            diff--;
                        }
                    }
                    return val;
                }
            },
            //update elem calling method
            engtype: function (elem, data) {
                var sec = data.pause * 100;
                console.log(data);
                if (data.type.length < 1) {
                    return 0;
                }
                var value = data.startstring;
                console.log(value);
                elem.innerHTML = value;
                setTimeout(typeletter, sec);

                function typeletter() {
                    if (data.type.length < 1) {
                        return 1;
                    }
                    var thiscycle = sec;
                    switch (data.type[0]) {
                        case '$back':
                            break;
                        case '$skip':
                            break;
                        case '$stop':
                            break;
                        case '$mention':
                            thiscycle + 600;
                            break;
                        default:
                            value += data.type.splice(0, 1);
                            elem.innerHTML = value;
                    }
                    setTimeout(typeletter, thiscycle);
                }

            }
        },
        verify: {
            mode: function (elem, data) {
                if (data.hasOwnProperty('mode')) {
                    switch (data.mode) {
                        case 'select':
                            Cp$.caperjs.caper.report(elem, 'MODE');
                            Cp$.caperjs.caper.countup(elem, data);
                            break;
                        case 'up':
                        case 'countup':
                            Cp$.caperjs.caper.countup(elem, data);
                            break;
                        case 'down':
                        case 'countdownnormal':
                        case 'countdown':
                            Cp$.caperjs.caper.countdown(elem, data, 'normal');
                            break;
                        case 'curvecountup':
                        case 'ccountup':
                            Cp$.caperjs.caper.curvecountup(elem, data);
                            break;
                        case 'curvecountdown':
                        case 'ccountdownnormal':
                        case 'ccountdown':
                            Cp$.caperjs.caper.curvecountdown(elem, data);
                            break;
                        case 'newcountdown':
                            Cp$.caperjs.caper.countdownorder(elem, data);
                            break;
                        case 'countdownsec':
                        case 'sec':
                            Cp$.caperjs.caper.countdown(elem, data, 'sec');
                            break;
                        case 'type':
                        case 'english-type':
                        case 'english-typing':
                            Cp$.caperjs.caper.engtype(elem, data);
                            break;
                        case 'gen':
                            Cp$.caperjs.caper.iternew(elem, data);
                            break;
                        case 'iter':
                            Cp$.caperjs.caper.iterfaster(elem, data);
                            break;
                        default:
                            Cp$.caperjs.caper.countup(elem, data);
                    }
                } else {
                    Cp$.caperjs.caper.countup(elem, data);
                }
                return data;
            },
            string: function (data) {
                if (data.hasOwnProperty('start')) {
                    return data.start;
                }
                return Cp$.caperjs.random.string(10);
            },
            stringend: function (data) {
                if (data.hasOwnProperty('end')) {
                    return data.end;
                }
                return Cp$.caperjs.random.string(10);
            }
        },
        random: {
            //random a length length string
            string: function (length) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ,.!@#$%^&*()";
                length = Math.max(0, length);
                for (var i = 0; i < length; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            },
            //random a int
            //need to imporve feature
            int: function (length) {
                return Math.random(length);
            },
            //random with little
            instring: function (length, little) {
                length = Math.max(0, length);
                var thisposs = little + Cp$.caperjs.random.string(length);
                return thisposs.charAt(Math.floor(Math.random() * thisposs.length));
            }
        }
    },
    //ajax module, not updating
    ajax: {
        /**
         * 
         * 
         * @param {data of index} inin 
         * @returns code of function run
         */
        caperajax: function (inin) {
            //default
            var ajaxsettings = {
                //default GET
                method: 'GET',
                //default link
                target: 'default',
                url: './main.php',
                //default No data sended
                data: '',
                //default async
                async: true,
                //default cache
                cache: true,
                //default 40s timeout
                //not really support yet
                timeout: 40000,
                //default call back json
                callback: 'json',
                //default IE 6
                IEborwser: 'Microsoft.XMLHTTP',
                //default form
                contentType: 'application/x-www-form-urlencoded',
                //default consolelog
                success: function (data) {
                    console.log(data);
                },
                //default consolelog
                //updated to alert
                error: function (error) {
                    console.log(error);
                    alert(error);
                }
            };
            //inin method
            for (var i in inin) {
                ajaxsettings[i] = inin[i];
            }
            //create object
            if (typeof ajaxsettings.data === 'object') {
                var str = '';
                var value = '';
                for (var key in ajaxsettings.data) {
                    value = ajaxsettings.data[key];
                    //replace & in url
                    if (ajaxsettings.data[key].indexOf('&') !== -1) {
                        value = ajaxsettings.data[key].replace(/&/g, escape('&'));
                    }
                    //replace & in key
                    if (key.indexOf('&') !== -1) {
                        key = key.replace(/&/g, escape('&'));
                    }
                    str += key + '=' + value + '&';
                }
                ajaxsettings.data = str.substring(0, str.length - 1);
            }
            //cache
            var cache = null;
            if (ajaxsettings.cache) {
                cache = '';
            } else {
                cache = '&' + new Date().getTime();
            }
            //method
            ajaxsettings.method = ajaxsettings.method.toUpperCase();
            //chche url
            if (ajaxsettings.method === 'GET' && (ajaxsettings.data || cache)) {
                ajaxsettings.url += '?' + ajaxsettings.data + cache;
            }
            //for old browser
            var ajaxobject = null;
            if (window.XMLHttpRequest) {
                //for Human Browser
                ajaxobject = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                //for non-human Browser
                ajaxobject = new ActiveXObject(ajaxsettings.IEborwser);
            } else {
                //for Borwser not support ajax
                console.log('Not supported, im done');
            }
            //shake with server
            ajaxobject.open(ajaxsettings.method, ajaxsettings.url, ajaxsettings.async);
            //send request
            if (ajaxsettings.method === 'GET') {
                ajaxobject.send(null);
            } else if (ajaxsettings.method === 'POST') {
                ajaxobject.setRequestHeader("Content-type", ajaxsettings.contentType);
                ajaxobject.send(ajaxsettings.data);
            } else if (ajaxsettings.method === 'SWING') {
                ajaxobject.setRequestHeader("Content-type", ajaxsettings.contentType);
                ajaxobject.send(ajaxsettings.data);
            } else {
                console.log('METHOD is not supported by Caperjs, looking for RELEASE Version');
                return false;
            }
            //waiting for response
            ajaxobject.onreadystatechange = function () {
                if (ajaxobject.readyState === 4) {
                    if (ajaxobject.status === 200)
                        ajaxsettings.success.call(ajaxobject, ajaxobject.responseText);
                    else {
                        ajaxsettings.error();
                    }
                }
            };
        }
    }
}
var Ca$ = {
    duplicate: function () {

    }
}
module.export = Cp$;