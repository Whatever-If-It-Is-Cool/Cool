// var Vue = require('vue');
// jQuery(document).ready(function () {
//     $.backstretch("https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjKheftu6rSAhXJ5IMKHflhBx8QjRwIBQ&url=http%3A%2F%2Fwww.tooopen.com%2Fimg%2F87_311.aspx&psig=AFQjCNEwKp2TnT3krjVHX5iVtGxu4CI_tQ&ust=1488085297790779");
// });
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
                    break;
            }
        },
        skipit: function () {
            switch (this.step) {
                case 1:
                    this.gotostep(2);
                    break;
                case 2:
                    this.courses.push('');
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
                    this.secondbutton = 'Add next course';
                    this.placeholer = 'Course id'
                    this.step = 2;
                    this.lable = false;
                    this.tiger = true;
                    this.icon = 'hand-o-up';
                    break;
                case 3:
                    break;
            }
        }
    }
})