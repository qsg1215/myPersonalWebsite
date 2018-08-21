<template>
  <div class="flexBox" :style="{height: height +  'px' }">
    <div class="sideBar"  :style="{width: sideBarStatus ? '4%': '12%'}">
      <SideBar @sideBarStatusChange="sideBarStatusChangeHandle"></SideBar>
    </div>
    <div :style="{width: sideBarStatus ?'96%': '88%'}">
      <TopBar></TopBar>
      <router-view/>
    </div>
  </div>

</template>

<script>
import SideBar from './sideBar'
import TopBar from './topBar'
export default {
  name: 'end',
  components: { SideBar, TopBar },
  data () {
    return {
      sideBarStatus: false,
      height: window.innerHeight
    }
  },
  methods: {
    sideBarStatusChangeHandle (data) {
      console.log('子组件传递过来的数据', data)
      this.sideBarStatus = data
    }
  }
}
</script>
<style scoped>
  .sideBar{
    background-color: #545c64;height:auto;
  }
  .flexBox{
    display: flex;
  }
</style>
