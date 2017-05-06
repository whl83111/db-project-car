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
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        clickTest: function () {
            console.log('Clicked.')
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        cars: []
    },
    beforeMount: function () {
        let temp = this;
        axios.post('api/select', {})
            .then(function (response) {
                console.log(response.data);
                temp.cars = response.data;
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    methods:{
        
    }

});
