<template>
  <div style="text-align:left;">
    <ArticalList></ArticalList>
    <Pingation></Pingation>
  </div>

</template>

<script>
import ArticalList from './articalList/index'
import Pingation from './Pingation/index'

export default {
  name: 'index',
  components: {ArticalList, Pingation },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
