<template>
  <div>
    <el-form ref="addNewsForm" :model="addNewsForm" class="qk-form">
      <el-row>
        <el-col :span="8">
          <el-form-item label="一级标题:" prop="primaryTitle">
            <el-input
              :disabled="isDisabled"
              class="qk-input"
              v-model="addNewsForm.primaryTitle"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="二级标题:" prop="subtitle">
            <el-input
              :disabled="isDisabled"
              class="qk-input"
              v-model="addNewsForm.subtitle"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关键词:" prop="keywords">
            <el-input
              :disabled="isDisabled"
              class="qk-input"
              v-model="addNewsForm.keywords"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="文章分类:">
            <el-select
              v-model="addNewsForm.firstClass"
              prop="firstClass"
              placeholder="请选择分类"
            >
              <el-option label="Java" value="1"></el-option>
              <el-option label="C++" value="2"></el-option>
              <el-option label="Go" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布时间:" prop="publishTime">
            <el-input
              :disabled="isDisabled"
              class="qk-input"
              v-model="addNewsForm.publishTime"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
    </div>
    <div></div>
    <div class="saveNewsButton">
      <!-- <el-button type="primary" @click="newsAdd"> 确认保存 </el-button> -->
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="newsAdd">保存</el-button>
          <el-button type="info" @click="backToLlist">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      html: '',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      // 添加文章的表单数据
      addNewsForm: {
        primaryTitle: '',
        subtitle: '',
        keywords: '',
        publicScope: '',
        publishSource: '',
        publishTime: '',
        firstClass: '',
        secondClass: ''
      },
      isDisabled: false
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
      if (res.code === 200) {
        this.$message.success('添加文章成功.')
        // 跳转回列表
        this.$router.push({ path: '/news' })
      } else {
        this.$message.error('添加文章失败.')
      }
    },
    backToLlist() {
      // 跳转回列表 或者 this.$router.push({ name: 'news' })
      this.$router.push({ path: '/news' })
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = ''
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
<style lang="less" scoped>
.saveNewsButton {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 20px;
  margin-right: 50px;
}
span[data-slate-node='text'] {
  display: inline-block;
  width: 100%;
}

.qk-input {
  width: 30%;
}
</style>
