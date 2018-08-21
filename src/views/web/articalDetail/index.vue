<template>
  <div>
   <div class="artical">
     <h1>{{articalObj.title}}</h1>
     <div class="abstract" v-html="articalObj.abstract">
     </div>
     <div  class="keyWords" >
       <span class="keyWordsItem" :key="index" v-for="(item, index) in articalObj.keyWords.split('|')">{{item}}</span>
     </div>

     <div class="content" v-html="articalObj.content" ></div>
     <div style="display: flex; justify-content: space-between;margin: 30px 0;">
       <div style="height: 12px;;width: 48%;border-bottom: 1px dashed #ccc;"></div>
       <div style="text-align: center">
         完
       </div>
       <div style="height: 12px;;width: 48%;border-bottom: 1px dashed #ccc;"></div>
     </div>

     <div class="comment">
       <div v-if="commentList.length > 0">
         共留言({{commentList.length}})条
       </div>
       <div v-else>
         还没有人评论哟!
       </div>
       <ul>
         <li class="commentItem" :key="index" v-for="(item, index) in commentList">
           <div>
             <a target="_blank" :href="item.personalWebsite"  class="commenter">  {{item.nickName}}</a>  说:
           </div>
           <div style="display: flex;justify-content: space-between;">
             <div class="commentContent" v-html="item.content">
             </div>
             <div>
               {{$util.formatTimeStamp(item.addAt / 1000)}}
             </div>
           </div>
         </li>
       </ul>
     </div>
     <div class="comment" style="margin-top: 30px;">
       <div >
         我要留言
       </div>
      <div>
        <el-form :model="newComment"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item class="formItem" label="昵称" >
            <el-input v-model="newComment.nickName"></el-input>
          </el-form-item>

          <el-form-item class="formItem" label="邮箱" >
            <el-input v-model="newComment.email"></el-input>
          </el-form-item>

          <el-form-item class="formItem" label="个人网站" >
            <el-input v-model="newComment.personalWebsite"></el-input>
          </el-form-item>
          <el-form-item  label="个人网站" >
            <vue-editor v-model="newComment.content"></vue-editor>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="status" @click="addComment('ruleForm')">发表评论</el-button>
          </el-form-item>
        </el-form>
      </div>
     </div>
   </div>

  </div>

</template>

<script>
import { VueEditor } from 'vue2-editor';
import { getArticalItemDetailApi, getArticalItemCommentApi, addArticalCommentApi } from '@/api/index'
export default {
  name: 'articalDetail',
  components: { VueEditor },
  data () {
    return {
      articalObj: {
        keyWords: ''
      },
      commentList: [],
      newComment: {
        nickName: '',
        email: '',
        personalWebsite: '',
        content: '',
        articalID: this.$route.query.ID,
        replyID: '0'
      },
      status: false
    }
  },
  created () {
  },
  mounted () {
    this.getArticalDetail()
    this.getArticalComment()
  },
  methods: {
    // 获取文章详情
    getArticalDetail () {
      var ID = this.$route.query.ID;
      getArticalItemDetailApi(ID).then(res => {
        this.articalObj = res.data;
        this.$nextTick(() => {
          hljs.highlightCode()
        })
      })
    },

    // 获取所有评论
    getArticalComment () {
      var ID = this.$route.query.ID;
      getArticalItemCommentApi({articalID: ID}).then(res => {
        this.commentList = res.data;
        console.log(this.commentList)
      })
    },

    // 添加评论
    addComment () {
      var params = this.newComment;
      console.log(params, '参数');
      this.status = true;
      addArticalCommentApi(this.newComment).then(res => {
        this.$message({
          message: '评级成功!,请等待审核',
          type: 'success'
        });
        this.status = false;
        this.getArticalComment()
        // 重置
        this.newComment = Object.assign(this.newComment,  {nickName: '', email: '', personalWebsite: '', content: ''})
      })
    }
  }
}
</script>
<style scoped>
.artical{ margin: 30px; }
.abstract{
  margin: 20px 0;
  padding: 5px;
  border-radius: 4px;
  background-color: #ccc;
  font-size: 12px;
}
.keyWords{

  }
.keyWordsItem {
  color: #000;
  font-size: 14px;
  font-weight: 800;
  padding: 0 10px;
}
.content{
  margin: 10px 0;
}
  .comment ul {
     font-size: 14px;
   }
.comment li {
  padding: 10px;
}
  .commentItem{
    border-bottom: 1px solid #ccc;
  }
  .commentContent{
    padding: 10px;
  }
  .commenter{
    font-weight: 600;
  }
  .formItem{
    width: 30%;
  }
</style>
