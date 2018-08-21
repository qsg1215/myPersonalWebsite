<template>
  <div id="app" :style="{minHeight: height +  'px'}">
    <router-view/>
  </div>
</template>

<script>
import { getRSAApi} from '@/api/common'
export default {
  name: 'App',
  data () {
    return {
      height: window.innerHeight
    }
  },
  created () {
    // 获取 RSA 公共秘钥
    this.getRSA()
  },
  methods: {
    getRSA () {
      getRSAApi().then(res => {
        globalData.RSApublicKey = res.data
      })
    }
  }
}
</script>

<style>
  *{ margin:0;padding: 0}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 5%;
  background-color: rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

</style>
