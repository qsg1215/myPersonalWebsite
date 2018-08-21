<template>
  <div class="topbarContainer">
    <div class="btnContainer">
      <el-button type="primary" v-waves round size="mini" @click="returnToWeb" icon="iconfont joe-fanhui">返回</el-button>
    </div>
  </div>

</template>

<script>
import { loginApi } from '@/api/root';
export default {
  name: 'topBar',
  data () {
    return {}
  },
  methods: {
    returnToWeb () {
      this.$router.push({ name: 'web'})
    }
  }
}
</script>
<style scoped>
  .topbarContainer {
    height: 60px;background-color: #fbeed5;display: block;text-align: right;line-height: 60px;
  }
  .btnContainer {
    margin-right: 20px;
  }
</style>
