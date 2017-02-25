var buttons = new Vue({
    el: '#buttonlist',
    data: {
        buttons: ["fall", 2]
    },
    methods: {
        clickaclass: function (aclass) {
            console.log(aclass);
            this.switchtotable(aclass);
        },
        switchtotable: function (aclass) {
            ipcRenderer.send('switchtotable', aclass);
        }
    }
})