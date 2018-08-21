<template>
  <div class="sideBar">
    <div>
       <img :class="[isCollapse ? 'miniLogo' : 'logo']" src="../../../assets/icon/monkey.png" alt="">
    </div>
    <div>
      <el-menu  style="width: 100%;text-align: left;"
               default-active="1"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               background-color="#545c64"
               :collapse="isCollapse">
        <el-menu-item index="1" @click="ruterChange('newArtical')" >
          <i class="iconfont joe-write"></i>
          <span slot="title">新建文章</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="iconfont joe-label_icon"></i>
          <span slot="title">文章标签</span>
        </el-menu-item>
        <el-menu-item index="3" @click="ruterChange('articalClassify')">
          <i class="iconfont joe-fenlei"></i>
          <span slot="title">文章分类</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="iconfont joe-plus-listview"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="iconfont joe-liuyan"></i>
          <span slot="title">留言管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="iconfont joe-yonghu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="iconfont joe-guanggao"></i>
          <span slot="title">广告管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="openSideBarBtn" @click="openSideBar">
      <span v-waves>
        {{isCollapse ? '>>': '<< 收起侧边栏'}}
      </span>
    </div>
  </div>

</template>

<script>
import { loginApi } from '@/api/root';
export default {
  name: 'sideBar',
  data () {
    return {
      isCollapse: false,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openSideBar () {
      this.isCollapse = !this.isCollapse;
      this.$emit('sideBarStatusChange', this.isCollapse)
    },
    ruterChange (routerName) {
      this.$router.push({name: routerName})
    }
  }
}
</script>
<style >
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;;
  }
  .logo {
    height: 60px;
    width: 60px;
  }
  .miniLogo {
    height: 30px;
    width: 30px;
    margin-top: 20px;
  }
  .sideBar .el-submenu .el-menu-item {
    min-width: 10%;
  }
  .sideBar .el-submenu .el-submenu__title {
    padidng-left: 0
  }
  .openSideBarBtn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color:#F0F0EE;
    padding: 10px 0;
    background-color: #2D64B3;
    cursor:pointer;
  }

</style>

<style scoped>
.sideBar {
  position: relative;
  height: 100%;
}
</style>
