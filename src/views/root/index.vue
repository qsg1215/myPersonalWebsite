<template>
  <div>
    <router-view/>
  </div>

</template>

<script>
import { loginApi } from '@/api/root';
export default {
  name: 'root',
  data () {
    return {}
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
