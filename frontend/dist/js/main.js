Vue.config.delimiters = ['<%', '%>']

var app = new Vue({
    delimiters: ['<%', '%>'],
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