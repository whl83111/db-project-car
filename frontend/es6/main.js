Vue.options.delimiters = ['<%', '%>'];

var app = new Vue({
    el: '#app',
    data: {
        cars: [
            {
                id: 3,
                brand: 'toyota',
                name: 'Supra',
                shift: 'manual'
            },
            {
                id: 4,
                brand: 'toyota',
                name: 'AE86',
                shift: 'manual'
            }
        ]
    },

});