Vue.options.delimiters = ['<%', '%>'];

const searchInit = {
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
    beforeMount: function () {
        this.distinct('brand');
        this.distinct('shift');
        this.distinct('region');
    },
    methods: {
        distinct: function (target) {
            let _this = this;
            axios.post('api/distinct', {
                targetColumn: target
            })
            .then(function (response) {
                _this[target + 's'] = response.data;
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
            app.getTotalPages();
        },
        sendNewSearch: function () {
            app.currentPage = 1;
            this.changePage();
        },
        changePage: function () {
            this.selected.limit.start = this.selected.limit.each * (app.currentPage - 1);
            this.sendSearch();
        },
        clearSearch: function () {
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
    template: `
    <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#newObject">新增物件</button>
              <div class="modal fade" id="newObject" tabindex="-1" role="dialog" aria-labelledby="newObjectModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="newObjectModalLabel">新增物件</h5>
                      <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                      <form id="new" action="api/insert" method="post">
                        <div class="form-group">
                          <label>圖片網址</label>
                          <input class="form-control" type="text" placeholder="請輸入圖片網址" name="imgLink" v-model="imgLink">
                        </div>
                        <div class="form-group">
                          <label>廠牌</label>
                          <input class="form-control" type="text" placeholder="請輸入廠牌" name="brand" v-model="brand">
                        </div>
                        <div class="form-group">
                          <label>車型</label>
                          <input class="form-control" type="text" placeholder="請輸入車型" name="carModel" v-model="carModel">
                        </div>
                        <div class="form-group">
                          <label>排檔方式</label>
                          <input class="form-control" type="text" placeholder="請輸入排檔方式" name="shift" v-model="shift">
                        </div>
                        <div class="form-group">
                          <label>價格</label>
                          <input class="form-control" type="text" placeholder="請輸入價格" name="price" v-model="price">
                        </div>
                        <div class="form-group">
                          <label>年份</label>
                          <input class="form-control" type="text" placeholder="請輸入年份" name="year" v-model="year">
                        </div>
                        <div class="form-group">
                          <label>排氣量</label>
                          <input class="form-control" type="text" placeholder="請輸入排氣量" name="displacement" v-model="displacement">
                        </div>
                        <div class="form-group">
                          <label>地區</label>
                          <input class="form-control" type="text" placeholder="請輸入地區" name="region" v-model="region">
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-secondary" type="button" data-dismiss="modal">取消</button>
                      <button class="btn btn-primary" type="submit" data-dismiss="modal" @click="createNewObject">確定</button>
                    </div>
                  </div>
                </div>
              </div>
    `,
    methods: {
        createNewObject: function () {
            let _this = this;
            axios.post('api/insert', _this.data)
                .catch(function (error) {
                    console.log(error);
                });
            this.initData();
        },
        initData: function () {
            let _this = this;
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
    beforeMount: function () {
        this.initTable();
    },
    watch: {
        dataAmountPerPage: function (newValue) {
            search.selected.limit.start = 0;
            search.selected.limit.each = newValue;
            search.sendNewSearch();
        }
    },
    methods:{
        initTable: function () {
            let _this = this;
            axios.post('api/select', searchInit)
                .then(function (response) {
                    _this.cars = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        changeOrder: function (col) {
            if (search.selected.orderBy[col] == 'ASC') {
                this.orderSign[col] = '▼';
                search.selected.orderBy[col] = 'DESC';
            }
            else if (search.selected.orderBy[col] == 'DESC') {
                this.orderSign[col] = null;
                search.selected.orderBy[col] = null;
            }
            else if (search.selected.orderBy[col] == null) {
                this.orderSign[col] = '▲';
                search.selected.orderBy[col] = 'ASC';
            }
            search.sendNewSearch();
        },
        deleteObject: function (car) {
            console.log(car);
            // axios.post('api/delete', car.id)
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        },
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
        },
        getTotalPages: function () {
            let _this = this;
            axios.post('api/countPage', search.selected)
                .then(function (response) {
                    _this.totalPages = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});