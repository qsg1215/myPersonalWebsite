<template>
  <div class="sideTreeContainer">
    <div style="text-align: left;margin: 20px;">
      <el-button @click="newClass" size="mini" v-waves type="primary" >创建一级分类</el-button>
    </div>
    <el-tree
      :data="data"
      node-key="id"
      :highlight-current="true"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
    <!-- 登录弹窗 -->
    <el-dialog
      class="dialog"
      style="text-align: center"
      :title=" !currentDeepth && currentDeepth != 0 ?  '新建1级分类' : `新建${currentDeepth + 2}级分类`"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="classObj" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="classObj.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmClassName">登 录</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
let id = 1000;
export default {
  name: 'sideTree',
  data () {
    return {
      data: [],
      dialogVisible: false,
      classObj: {
        name: ''
      },
      currentDeepth: undefined,
      currentData: {},
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    append (data) {
      this.newClass()
      this.currentDeepth = data.deepth;
      this.currentData = data;
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      let currentChild = children[index];
      console.log(currentChild, '当前的子对象')
      if (currentChild.children.length > 0) {
        this.$message({
          message: '当前分类下面还有子级目录,不能删除!',
          type: 'error'
        })
        return false
      } else {
        children.splice(index, 1);
      }
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
        <span>{node.label}</span>
      <span>
      <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
      <el-button size="mini" type="text" on-click={ () => this.append(data) }>编辑</el-button>
      <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
      </span>
      </span>);
    },
    newClass () {
      this.dialogVisible = true;
      this.$refs['ruleForm'].resetFields();
    },
    confirmClassName () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let currentData = this.currentData;
          if (this.currentData.label) {
            const newChild = { id: id++, label: this.classObj.name, children: [],deepth: currentData.deepth + 1 };
            if (!currentData.children) {
              this.$set(currentData, 'children', []);
            }
            currentData.children.push(newChild);
            this.currentData = {}
            this.currentDeepth = undefined
          } else {
            this.data.push({
              id: id++,
              label: this.classObj.name,
              deepth: 0
            })
          }
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
          return false
        }
      })

    }
  }
}
</script>
<style scoped>
</style>
<style>
  .sideTreeContainer .el-tree {
    background-color: #e5e5e5;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
