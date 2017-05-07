Vue.options.delimiters = ['<%', '%>'];

const searchInit = {
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
    beforeMount: function () {
        this.distinct('brands');
        this.distinct('shifts');
        this.distinct('years');
        this.distinct('regions');
    },
    beforeUpdate: function () {
        
    },
    methods: {
        distinct: function (target) {
            let temp = this;
            axios.post('api/distinct', {
                targetColumn: target
            })
            .then(function (response) {
                temp[target] = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        sendSearch: function () {
            axios.post('api/select', this.selected)
                .then(function (response) {
                    app.cars = response.data;
                    if (app.cars.length != 0) {
                        app.isEmpty = false;
                    }
                    else {
                        app.isEmpty = true;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        sendNewSearch: function () {
            pageButton.currentPage = 1;
            this.changePage();
        },
        changePage: function () {
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
    },
    beforeMount: function () {
        this.initTable();
    },
    methods:{
        initTable: function () {
            let temp = this;
            axios.post('api/select', {})
                .then(function (response) {
                    temp.cars = response.data;
                })
                .catch(function (error) {
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
        firstPage: function () {
            this.currentPage = 1;
            search.changePage();
        },
        nextPage: function () {
            if (app.cars.length == 0) {
                alert('已無資料!');
            }
            else {
                this.currentPage += 1;
                search.changePage();
            }
        },
        previousPage: function () {
            this.currentPage -= 1;
            if (this.currentPage < 1) {
                this.currentPage = 1;
            }
            search.changePage();
        }
    }
});