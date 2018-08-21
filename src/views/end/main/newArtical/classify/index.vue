<template>
  <div>
    <!-- 一级分类-->
    <el-select v-model="first" @change="getSecondClass" >
      <el-option :label="item.name" :key="item.ID" v-for="item in classifyObj" :value="item.ID"></el-option>
    </el-select>
    <!-- 耳机分类-->
    <el-select v-model="second" v-if="secondClassify.length > 0"  @change="getThirdClass" >
      <el-option :label="item.name" :key="item.ID" v-for="item in secondClassify" :value="item.ID"></el-option>
    </el-select>
    <!-- 三级分类 -->
    <el-select v-model="third" v-if="thirdClassify.length > 0" @change="thirdClassChange" >
      <el-option :label="item.name" :key="item.ID" v-for="item in thirdClassify" :value="item.ID"></el-option>
    </el-select>
  </div>

</template>

<script>
/*
*  目前限制为三级路径
* */
import { getClassifylistApi} from '@/api/index'
export default {
  name: 'classify',
  data () {
    return {
      first: '',
      second: '',
      third: '',
      classifyObj: [],
      secondClassify: [],
      thirdClassify: []
    }
  },
  mounted () {
    this.getClassify().then(res => {
      if (res[0].children.length > 0) {
        this.getSecondClass(res[0].ID)
        this.$emit('classifyData',{
          first: this.first,
          second: this.second,
          third: this.third,
        })
      } else {
        this.secondClassify = [];
        this.second = '';
        this.third = '';
        this.thirdClassify = []
      };
      this.$emit('classifyData',{
        first: this.first,
        second: this.second,
        third: this.third,
      })
    })
  },
  methods: {
    getClassify () {
      return getClassifylistApi({pid: 0}).then(res => {
        this.classifyObj = res.data;;
        return res.data
      })
    },

    // 获二级子分类
    getSecondClass (firsClassifyID) {
      this.secondClassify = this.classifyObj.filter(item => {
        return item.ID === firsClassifyID
      }) [0].children;
      if (this.secondClassify.length > 0) {
        this.getThirdClass(this.secondClassify[0].ID)
      } else {
        this.third = '';
        this.second = '';
        this.thirdClassify = [];
        this.$emit('classifyData',{
          first: this.first,
          second: this.second,
          third: this.third
        })
      }
    },

    // 获取三级子分类
    getThirdClass (secondClassifyID) {
      this.thirdClassify = this.secondClassify.filter(item => {
        return item.ID === secondClassifyID
      }) [0].children;
      if (this.thirdClassify.length === 0){
        this.third = ''
      }
      this.$emit('classifyData',{
        first: this.first,
        second: this.second,
        third: this.third
      })
    },

    thirdClassChange () {
      this.$emit('classifyData',{
        first: this.first,
        second: this.second,
        third: this.third
      })
    }
  }
}
</script>
