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
    orderBy: {
        brand: null,
        model: null,
        shift: null,
        price: null,
        year: null,
        displacement: null,
        region: null
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
        regions: [],
        selected: {
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
            orderBy: {
                brand: null,
                carModel: null,
                shift: null,
                price: null,
                year: null,
                displacement: null,
                region: null
            },
            limit: {
                start: 0,
                each: 10
            }
        }
    },
    beforeMount: function beforeMount() {
        this.distinct('brand');
        this.distinct('shift');
        this.distinct('region');
    },
    methods: {
        distinct: function distinct(target) {
            var _this = this;
            axios.post('api/distinct', {
                targetColumn: target
            }).then(function (response) {
                _this[target + 's'] = response.data;
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
            app.getTotalPages();
        },
        sendNewSearch: function sendNewSearch() {
            app.currentPage = 1;
            this.changePage();
        },
        changePage: function changePage() {
            this.selected.limit.start = this.selected.limit.each * (app.currentPage - 1);
            this.sendSearch();
        },
        clearSearch: function clearSearch() {
            this.selected.conditions = {
                brand: null,
                shift: null,
                yearMin: null,
                yearMax: null,
                region: null,
                priceMin: null,
                priceMax: null,
                displacementMin: null,
                displacementMax: null
            };
        }
    }
});

Vue.component('new-object', {
    data: {
        imgLink: null,
        brand: null,
        carModel: null,
        shift: null,
        price: null,
        year: null,
        displacement: null,
        region: null
    },
    template: '\n    <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#newObject">\u65B0\u589E\u7269\u4EF6</button>\n              <div class="modal fade" id="newObject" tabindex="-1" role="dialog" aria-labelledby="newObjectModalLabel" aria-hidden="true">\n                <div class="modal-dialog" role="document">\n                  <div class="modal-content">\n                    <div class="modal-header">\n                      <h5 class="modal-title" id="newObjectModalLabel">\u65B0\u589E\u7269\u4EF6</h5>\n                      <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                    </div>\n                    <div class="modal-body">\n                      <form id="new" action="api/insert" method="post">\n                        <div class="form-group">\n                          <label>\u5716\u7247\u7DB2\u5740</label>\n                          <input class="form-control" type="text" placeholder="\u8ACB\u8F38\u5165\u5716\u7247\u7DB2\u5740" name="imgLink" v-model="imgLink">\n                        </div>\n                        <div class="form-group">\n                          <label>\u5EE0\u724C</label>\n                          <input class="form-control" type="text" placeholder="\u8ACB\u8F38\u5165\u5EE0\u724C" name="brand" v-model="brand">\n                        </div>\n                        <div class="form-group">\n                          <label>\u8ECA\u578B</label>\n                          <input class="form-control" type="text" placeholder="\u8ACB\u8F38\u5165\u8ECA\u578B" name="carModel" v-model="carModel">\n                        </div>\n                        <div class="form-group">\n                          <label>\u6392\u6A94\u65B9\u5F0F</label>\n                          <input class="form-control" type="text" placeholder="\u8ACB\u8F38\u5165\u6392\u6A94\u65B9\u5F0F" name="shift" v-model="shift">\n                        </div>\n                        <div class="form-group">\n                          <label>\u50F9\u683C</label>\n                          <input class="form-control" type="text" placeholder="\u8ACB\u8F38\u5165\u50F9\u683C" name="price" v-model="price">\n                        </div>\n                        <div class="form-group">\n                          <label>\u5E74\u4EFD</label>\n                          <input class="form-control" type="text" placeholder="\u8ACB\u8F38\u5165\u5E74\u4EFD" name="year" v-model="year">\n                        </div>\n                        <div class="form-group">\n                          <label>\u6392\u6C23\u91CF</label>\n                          <input class="form-control" type="text" placeholder="\u8ACB\u8F38\u5165\u6392\u6C23\u91CF" name="displacement" v-model="displacement">\n                        </div>\n                        <div class="form-group">\n                          <label>\u5730\u5340</label>\n                          <input class="form-control" type="text" placeholder="\u8ACB\u8F38\u5165\u5730\u5340" name="region" v-model="region">\n                        </div>\n                      </form>\n                    </div>\n                    <div class="modal-footer">\n                      <button class="btn btn-secondary" type="button" data-dismiss="modal">\u53D6\u6D88</button>\n                      <button class="btn btn-primary" type="submit" data-dismiss="modal" @click="createNewObject">\u78BA\u5B9A</button>\n                    </div>\n                  </div>\n                </div>\n              </div>\n    ',
    methods: {
        createNewObject: function createNewObject() {
            var _this = this;
            axios.post('api/insert', _this.data).catch(function (error) {
                console.log(error);
            });
            this.initData();
        },
        initData: function initData() {
            var _this = this;
            _this.data = {
                imgLink: null,
                brand: null,
                carModel: null,
                shift: null,
                price: null,
                year: null,
                displacement: null,
                region: null
            };
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        cars: [],
        isEmpty: false,
        orderSign: {
            brand: null,
            carModel: null,
            shift: null,
            price: null,
            year: null,
            displacement: null,
            region: null
        },
        dataAmountPerPage: 10,
        currentPage: 1,
        totalPages: null
    },
    beforeMount: function beforeMount() {
        this.initTable();
    },
    watch: {
        dataAmountPerPage: function dataAmountPerPage(newValue) {
            search.selected.limit.start = 0;
            search.selected.limit.each = newValue;
            search.sendNewSearch();
        }
    },
    methods: {
        initTable: function initTable() {
            var _this = this;
            axios.post('api/select', searchInit).then(function (response) {
                _this.cars = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        changeOrder: function changeOrder(col) {
            if (search.selected.orderBy[col] == 'ASC') {
                this.orderSign[col] = '▼';
                search.selected.orderBy[col] = 'DESC';
            } else if (search.selected.orderBy[col] == 'DESC') {
                this.orderSign[col] = null;
                search.selected.orderBy[col] = null;
            } else if (search.selected.orderBy[col] == null) {
                this.orderSign[col] = '▲';
                search.selected.orderBy[col] = 'ASC';
            }
            search.sendNewSearch();
        },
        deleteObject: function deleteObject(car) {
            console.log(car);
            // axios.post('api/delete', car.id)
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        },
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
        },
        getTotalPages: function getTotalPages() {
            var _this = this;
            axios.post('api/countPage', search.selected).then(function (response) {
                _this.totalPages = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
});