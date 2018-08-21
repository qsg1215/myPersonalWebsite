<template>
  <div>
    <NavbarCon></NavbarCon>
    <router-view/>
  </div>

</template>

<script>
import NavbarCon from '@/components/navbarComponents'

export default {
  name: 'root',
  components: { NavbarCon },
  data () {
    return {}
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
