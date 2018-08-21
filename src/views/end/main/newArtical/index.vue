<template>
  <div class="container" :style="{height: ( height - 60 ) +  'px'}" >
    <el-form :model="artical" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" >
        <el-input v-model="artical.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="classification" style="text-align: left;">
        <Classify @classifyData="classifyDataHandle"></Classify>
      </el-form-item>
      <el-form-item label="文章关键字" style="text-align: left;"  v-if="KeyWordsTags.length">
        <el-tag
          style="margin: 0 10px;"
          v-for="(tag,index) in KeyWordsTags"
          :key="tag.name"
          @close="closeKeyWordsTag(index)"
          closable
          :type="tag.type">
          {{tag.name}}
        </el-tag>
      </el-form-item>
      <el-form-item :label=" KeyWordsTags.length ? '': '文章关键字' " style="text-align: left;" >
          <el-input style="width: 50%;padding-right: 10px;"   v-model="newKeyWords"></el-input>
          <el-button type="primary" @click.enter="newKeyWordsTag" v-waves>新增</el-button>
      </el-form-item>
      <el-form-item label="文章摘要" >
        <UE @loaded="loaded1"  :defaultMsg=$util.UEeditorConfig().defaultMsg  :config=$util.UEeditorConfig().config ref="ue1"></UE>
      </el-form-item>
      <el-form-item label="文章详情">
        <UE @loaded="loaded2"  :defaultMsg=$util.UEeditorConfig().defaultMsg  :config=$util.UEeditorConfig().config ref="ue2"></UE>
      </el-form-item>
      <el-form-item>
        <el-button >重置</el-button>
        <el-button type="primary" @click="newArtical" >发布</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import Classify from './classify'
import {addArticalItemApi} from '@/api/index'
export default {
  name: 'newArtical',
  components: { Classify },
  data () {
    return {
      artical: {
        title: ''
      },
      keyWordsTagType: ['', 'success', 'info', 'warning', 'danger'],
      KeyWordsTags: [],
      newKeyWords: '',
      UEloadingStatus: false,
      height: window.innerHeight,
      classifyData: {}
    }
  },
  methods: {
    // 富文本加载完毕
    loaded1 () {
      this.UEloadingStatus = true
      var content = ''
      this.$refs.ue1.editor.setContent(content, false)
    },
    loaded2 () {
      this.UEloadingStatus = true
      var content = ''
      this.$refs.ue2.editor.setContent(content, false)
    },

    // 新增关键字
    newKeyWordsTag () {
      let newKeyWords = this.newKeyWords;
      let RadomIndex = Math.floor(Math.random() * 4);
      this.KeyWordsTags.push({
        name: newKeyWords,
        type: this.keyWordsTagType[RadomIndex]
      })
      this.newKeyWords = ''
    },

    // 关闭关键字
    closeKeyWordsTag (index) {
      console.log(index)
      this.KeyWordsTags.splice(index, 1)
    },
     // 新建文章
    newArtical () {
      var params = {
        title: this.artical.title,
        keyWords: this.KeyWordsTags.map(item => { return item.name }).join('|'),
        abstract: this.$refs.ue1.editor.getContent(),
        content: this.$refs.ue2.editor.getContent(),
        classifyID: this.dealClassify()
      };
      addArticalItemApi(params)
      console.log(params)
    },

    dealClassify() {
     if (this.classifyData.third) {
       return this.classifyData.third
     };
      if (this.classifyData.second) {
        return this.classifyData.second
      };
      if (this.classifyData.first) {
        return this.classifyData.first
      }
    },
    classifyDataHandle(data) {
      this.classifyData = data
    }
  }
}
</script>
<style scoped>
  .container {
    padding-top: 20px;background-color: #e5e5e5;overflow-y: scroll;box-sizing: border-box;
    margin: 30px;
  }
</style>
