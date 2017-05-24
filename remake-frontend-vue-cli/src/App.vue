<template lang="pug">
  #app
    search
    result-table
</template>

<script>
import Search from './components/Search'
import ResultTable from './components/ResultTable'

export default {
  name: 'app',
  components: {
    Search,
    ResultTable
  }
}
</script>

<style>
</style>
