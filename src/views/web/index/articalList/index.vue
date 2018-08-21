<template>
  <div>
    <div :key="item.ID" v-for="item in articalList" class="articalItem">
      <h2 class="articalTitle"  @click="checkArticalDetail(item.ID)">{{item.title}}</h2>
      <h4 style="margin: 20px;" >
        {{item.classifyName}}
      </h4>
      <div class="keyWordsContainer">
        文章关键字
        <span class="keyWordsItem" :key="index" v-for="(tag, index) in item.keyWords.split('|')"> {{tag}}</span>
      </div>
      <div v-html="item.abstract"></div>
      <div  class="articalFooter">
        <div class="tagContainer" >
          <a class="tagItem readBtn" @click="checkArticalDetail(item.ID)">继续阅读全文>></a>
          <span class="tagItem">浏览 {{item.readCount}} 次</span>
          <span class="tagItem">评论 {{item.commentCount}} 条</span>
          <span class="tagItem">发表于 {{ $util.formatTimeStamp(item.addAt) }}</span>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { getArticalListApi } from '@/api/index'
export default {
  name: 'articalContent',
  data () {
    return {
      articalList: []
    }
  },
  mounted () {
    this.getAllArtical()
  },
  methods: {
    // 获取所有的文章数据
    getAllArtical () {
      getArticalListApi().then(res => {
        this.articalList = res.data;
        console.log(res.data)
        this.$nextTick(this.$util.highLightCode)
      })
    },

    // 查看详情
    checkArticalDetail (ID) {
      this.$router.push({name: 'articalDeatil', query: { ID: ID }})
    }
  }
}
</script>
<style scoped>
  .articalItem {
    padding: 30px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 40px;
  }
  .articalTitle{
    margin-bottom: 10px;
    cursor: pointer;
  }
  .articalTitle:hover{
    color: rgb(255, 27, 157);
  }
  .keyWordsContainer {
    margin-bottom: 10px;
  }
  .keyWordsItem {
    margin: 0 5px;
    background-color: rgb(84, 92, 100);
    color: white;
    padding: 4px;
    display: inline-block;border-radius: 4px;
    font-size: 12px;
  }
  .articalFooter {
    margin-top: 20px;
  }
  .tagContainer {
    float: right;
  }
  .tagItem {
    margin: 0 5px;
  }
  .readBtn{
    cursor: pointer;
  }
  .readBtn:hover{
    color: rgb(255, 27, 157);
  }
</style>
