'use strict';

Vue.options.delimiters = ['<%', '%>'];

var searchInit = {
    conditions: {
        brand: null,
        shift: null,
        yearMin: null,
        yearMax: null,
        region: null,
        priceMin: null,
        priceMax: null,
        displacementMin: null,
        displacementMax: null
    },
    page: 1,
    orderBy: {
        price: null,
        years: null
    },
    limit: {
        start: 0,
        each: 10
    }
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
        isEmpty: false,
        priceOrder: null,
        yearsOrder: null
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
        },
        changePriceOrder: function changePriceOrder() {
            if (search.selected.orderBy.price == 'ASCE') {
                this.priceOrder = '▼';
                search.selected.orderBy.price = 'DESC';
            } else {
                this.priceOrder = '▲';
                search.selected.orderBy.price = 'ASCE';
            }
            search.sendNewSearch();
        },
        changeYearsOrder: function changeYearsOrder() {
            if (search.selected.orderBy.price == 'ASCE') {
                this.yearsOrder = '▼';
                search.selected.orderBy.price = 'DESC';
            } else {
                this.yearsOrder = '▲';
                search.selected.orderBy.price = 'ASCE';
            }
            search.sendNewSearch();
        },
        addNewObject: function addNewObject() {
            console.log('INSERT');
        },
        deleteObject: function deleteObject(car) {
            console.log(car);
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