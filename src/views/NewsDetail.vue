<template>
  <div class="blog-detail">
    <h1 class="blog-title">{{ newsDetail.primaryTitle }}</h1>
    <div class="blog-content" v-html="newsDetail.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文章详情
      newsDetail: {
        primaryTitle: '',
        subtitle: '',
        keywords: '',
        publicScope: '',
        publishSource: '',
        publishTime: '',
        firstClass: '',
        secondClass: '',
        content: ''
      }
    }
  },

  created() {
    const newsId = this.$route.query.id
    this.getNewsDetail(newsId)
  },

  methods: {
    async getNewsDetail(newsId) {
      const params = { id: newsId }
      // 发起查询文章详情网络请求
      const { data: res } = await this.$http.post('queryById', params)
      if (res.code === 200) {
        this.newsDetail = res.data
      } else {
        this.$message.error('查询文章详情失败.')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.blog-title {
  text-align: center;
}
</style>
