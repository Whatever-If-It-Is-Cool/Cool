var app = new Vue({
        el: '#test',
        data: {
            tests: []
        },
        methods: {
            add: function (question, correct, a, b, c, d, e) {
                var showc = 'hidden';
                var showd = 'hidden';
                var showe = 'hidden';
                if (c.length > 0) {
                    showc = 'hiddens';
                }
                if (d.length > 0) {
                    showd = 'hiddens';
                }
                if (e.length > 0) {
                    showe = 'hiddens';
                }
                var thatquestion = {
                    question: question,
                    a: a,
                    b: b,
                    c: c,
                    showc: showc,
                    d: d,
                    showd: showd,
                    e: e,
                    showe: showe,
                    sol: [false, false, false, false, false],
                    correct: correct - 1,
                    correctorwrong: '-'
                }
                this.tests.push(thatquestion);
            },
            grade: function () {
                for (var i = 0; i < this.tests.length; i++) {
                    if (this.tests[i].sol[this.tests[i].correct] == true) {
                        this.tests[i].correctorwrong = 'Correct';
                    } else {
                        this.tests[i].correctorwrong = 'Wrong';
                    }
                }
            },
            gradethis: function (i) {
                if (i.sol[i.correct] == true) {
                    i.correctorwrong = 'Correct';
                } else {
                    i.correctorwrong = 'Wrong';
                }
            }
        }
    });
