<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />

    <el-button type="primary" @click="newsAdd"> 保存 </el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null, // 实例对象
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      // 添加文章的表单数据
      addNewsForm: {
        primaryTitle: '1',
        subtitle: '1',
        keywords: '1',
        publicScope: '1',
        publishSource: '1',
        publishTime: '2024-11-13',
        firstClass: '',
        secondClass: ''
      }
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    // 新增文章
    async newsAdd() {
      const params = {
        ...this.addNewsForm,
        content: this.html
      }
      // 发起添加文章网络请求
      const { data: res } = await this.$http.post('add', params)
      console.log(res)
      //   if (res.meta.status !== 201) {
      //     return this.$message.error('添加用户失败.')
      //   }
      //   this.$message.success('添加用户成功.')
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
