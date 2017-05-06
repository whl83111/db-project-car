'use strict';

Vue.options.delimiters = ['<%', '%>'];

var search = new Vue({
    el: '#search',
    data: {
        brands: [],
        shifts: [],
        years: [],
        regions: [],
        selected: {
            brand: null,
            shift: null,
            year: null,
            region: null,
            price: {
                min: null,
                max: null
            },
            displacement: {
                min: null,
                max: null
            }
        }
    },
    beforeMount: function beforeMount() {
        this.distinct('brands');
        this.distinct('shifts');
        this.distinct('years');
        this.distinct('regions');
    },
    beforeUpdate: function beforeUpdate() {},
    methods: {
        distinct: function distinct(target) {
            var temp = this;
            axios.post('api/distinct', {
                targetColumn: target
            }).then(function (response) {
                temp[target] = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        sendSearch: function sendSearch() {
            axios.post('api/select', this.selected).then(function (response) {
                app.cars = response.data;
                if (app.cars.length != 0) {
                    app.isEmpty = false;
                } else {
                    app.isEmpty = true;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        clickTest: function clickTest() {
            console.log('Clicked.');
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        cars: [],
        isEmpty: false
    },
    beforeMount: function beforeMount() {
        this.initTable();
    },
    methods: {
        initTable: function initTable() {
            var temp = this;
            axios.post('api/select', {}).then(function (response) {
                temp.cars = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
});