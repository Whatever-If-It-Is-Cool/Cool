// var Vue = require('vue');
// jQuery(document).ready(function () {
//     $.backstretch("https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjKheftu6rSAhXJ5IMKHflhBx8QjRwIBQ&url=http%3A%2F%2Fwww.tooopen.com%2Fimg%2F87_311.aspx&psig=AFQjCNEwKp2TnT3krjVHX5iVtGxu4CI_tQ&ust=1488085297790779");
// });
var main = new Vue({
    el: '#app',
    data: {
        step: 0,
        skip: false,
        title: 'Welcome',
        content: 'We are guiding you to create a class table for new semester'
    },
    methods: {
        next: function () {
            switch (this.step) {
                case 0:
                    this.title = 'Semeter';
                    this.content = 'Type the nick name of semester or click skip for default';
                    this.skip = true;
                    break;
            }
        },
        skipit: function () {
            console.log('skipped');
        }
    }
})