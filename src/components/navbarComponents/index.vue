<template>
  <div >
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="index">首页</el-menu-item>
      <el-menu-item index="tecArtical">技术博客</el-menu-item>
      <el-menu-item index="essayArtical" >杂文随笔</el-menu-item>
      <el-menu-item index="media">文娱</el-menu-item>
      <el-menu-item index="end"  @click="goToEnd">管理后台</el-menu-item>
    </el-menu>
    <div style="clear:both;"></div>
   <!-- 登录弹窗 -->
    <el-dialog
      class="dialog"
      style="text-align: center"
      title="登录"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-form :model="userObj" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userObj.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userObj.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmLogIn">登 录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { loginAPi } from '@/api/common'
export default {
  name: 'navbarContent',
  data () {
    return {
      activeIndex: 'index',
      dialogVisible: false,
      userObj: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSelect (key) {
      if (key !== 'end') {
        this.$router.push({name: key})
      }
    },
    goToEnd () {
      this.dialogVisible = true
      // 重置
      this.ruleForm = {
        userName: '',
        password: ''
      }
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields()
      })
    },
    confirmLogIn () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          loginAPi(this.userObj).then(() => {
            debugger
            this.$router.replace({name: 'end'})
          })
        } else {
          console.log('error submit!!');
          return false
        }
      })
    }
  }
}
</script>
