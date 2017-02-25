const {
    ipcRenderer
} = require('electron');
var main = new Vue({
    el: '#app',
    data: {
        step: 0,
        skip: false,
        lable: false,
        tiger: false,
        title: 'Welcome',
        content: 'We are guiding you to create a class table for new semester',
        input: '',
        placeholer: '',
        icon: 'book',
        secondbutton: 'Skip',
        courses: []
    },
    computed: {
        icons: function () {
            return 'fa-' + this.icon;
        }
    },
    methods: {
        next: function () {
            switch (this.step) {
                case 0:
                    this.gotostep(1);
                    break;
                case 1:
                    this.gotostep(2);
                    ipcRenderer.send('createsemester', this.input);
                    break;
                case 2:
                    ipcRenderer.send('createcourse', [this.courses, this.input]);
                    break;
            }
        },
        skipit: function () {
            switch (this.step) {
                case 1:
                    this.gotostep(2);
                    break;
                case 2:
                    this.courses.push({
                        courseid: '',
                        section: '',
                        starttime: '',
                        endtime: '',
                        mon: false,
                        tue: false,
                        wed: false,
                        thu: false,
                        fri: false,
                        color: ''
                    });
                    break;
            }
        },
        gotostep(step) {
            switch (step) {
                case 1:
                    this.title = 'Semeter';
                    this.content = 'Type the nick name of semester or click skip for default';
                    this.placeholer = 'Semeter Name';
                    this.skip = true;
                    this.lable = true;
                    this.step = 1;
                    this.icon = 'paragraph';
                    break;
                case 2:
                    this.title = 'Course';
                    this.content = 'Click add next course to add a new course, or next to process next step';
                    this.secondbutton = 'Add another course';
                    this.placeholer = 'Course id'
                    this.step = 2;
                    this.lable = false;
                    this.tiger = true;
                    this.icon = 'hand-o-up';
                    this.courses.push({
                        courseid: '',
                        section: '',
                        starttime: '',
                        endtime: '',
                        mon: false,
                        tue: false,
                        wed: false,
                        thu: false,
                        fri: false,
                        color: ''
                    });
                    break;
                case 3:

                    break;
            }
        },
        closethis: function () {
            ipcRenderer.send('close-start-window');

        }
    }
})