'use strict';

Vue.options.delimiters = ['<%', '%>'];

var searchInit = {
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
    },
    page: 1
};

var search = new Vue({
    el: '#search',
    data: {
        brands: [],
        shifts: [],
        years: [],
        regions: [],
        selected: searchInit
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
        sendNewSearch: function sendNewSearch() {
            pageButton.currentPage = 1;
            this.changePage();
        },
        changePage: function changePage() {
            this.selected.page = pageButton.currentPage;
            this.sendSearch();
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

var pageButton = new Vue({
    el: '#pageButton',
    data: {
        currentPage: 1
    },
    methods: {
        firstPage: function firstPage() {
            this.currentPage = 1;
            search.changePage();
        },
        nextPage: function nextPage() {
            if (app.cars.length == 0) {
                alert('已無資料!');
            } else {
                this.currentPage += 1;
                search.changePage();
            }
        },
        previousPage: function previousPage() {
            this.currentPage -= 1;
            if (this.currentPage < 1) {
                this.currentPage = 1;
            }
            search.changePage();
        }
    }
});