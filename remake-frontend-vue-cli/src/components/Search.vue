<template lang="pug">
.card#search
    .card-header 條件搜尋
    .card-block
        .row
            .col.form-group
                label(for='select-brand') 廠牌
                select#select-brand.form-control(v-model="selected.conditions.brand")
                    option
                    option(v-for='brand in brands') <% brand %>
            .col.form-group
                label(for='select-shift') 排檔方式
                select#select-shift.form-control(v-model="selected.conditions.shift")
                    option
                    option(v-for='shift in shifts') <% shift %>
        .row
            .col.form-group
                label(for='year') 年份(西元)
                br
                input#min-price(type='number', name='min-price', min='1995', v-model='selected.conditions.yearMin')
                | 年 ~
                input#max-price(type='number', name='max-price', min='1995', v-model='selected.conditions.yearMax')
                | 年
            .col.form-group
                label(for='select-region') 地區
                select#select-region.form-control(v-model="selected.conditions.region")
                    option
                    option(v-for='region in regions') <% region %>
        .row
            .col.form-group
                label 價格
                br
                input#min-price(type='number', name='min-price', min='0', v-model='selected.conditions.priceMin')
                | 萬 ~
                input#max-price(type='number', name='max-price', min='0', v-model='selected.conditions.priceMax')
                | 萬
            .col.form-group
                label 排氣量
                br
                input#min-displacement(type='number', name='min-displacement', min='0', v-model='selected.conditions.displacementMin')
                | c.c. ~
                input#max-displacement(type='number', name='max-displacement', min='0', v-model='selected.conditions.displacementMax')
                | c.c.

    button.btn.btn-primary(type='submit', @click="sendNewSearch") 搜尋
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
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
        }
      },
      brands: [],
      shifts: [],
      regions: []
    }
  },
  methods: {
    sendNewSearch: () => {
      alert('sendNewSearch')
    }
  }
}

</script>

<style>

</style>
