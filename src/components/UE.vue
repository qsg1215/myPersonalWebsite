<template>
  <div>
   <!-- <script id="editor" type="text/plain"></script>-->
    <script id="test"  ref="editor" type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: 'UE',
  data () {
    return {
      id: 'ueditorId' + Math.random().toString(16).substring(2),
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.editor.id = this.id;
      this.editor = UE.getEditor(this.id, this.config)// 初始化UE;
      this.editor.addListener('ready', () => { this.editor.setContent(this.defaultMsg) // 确保UE加载完成后，放入内容。
        this.$emit('loaded', true)
      })
    })
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent()
    }

  },
  destroyed () {
    this.editor.destroy()
  }

}
</script>
