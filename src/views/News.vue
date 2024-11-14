<template>
  <div>
    <!--卡片试图区域-->
    <el-card class="box-card">
      <!--文章列表区域-->
      <el-table :data="newsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="标题" prop="primaryTitle"> </el-table-column>
        <el-table-column label="一级分类" prop="firstClass">
          <template slot-scope="scope">
            <span v-if="scope.row.firstClass == 1">Java</span>
            <span v-else-if="scope.row.firstClass == 2">C++</span>
            <span v-else-if="scope.row.firstClass == 3">Go</span>
            <span v-else>其他</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="publishTime"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-view"
              size="mini"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-delete"
              size="mini"
              @click="deleteNewsById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div><el-button type="primary" @click="backHome">返回主页</el-button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: []
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      const params = {
        pageNum: 1,
        pageSize: 10
      }
      // 发起查询文章列表网络请求
      const { data: res } = await this.$http.post('list', params)
      console.log(res)
      if (res.code === 200) {
        this.newsList = res.data.list
        return
      }
      this.$message.error('查询文章列表失败.')
    },
    // 删除文章
    async deleteNewsById(id) {
      const params = {
        id: id
      }
      // 发起删除文章列表网络请求
      const { data: res } = await this.$http.post('delete', params)
      if (res.code !== 200) {
        this.$message.error('删除文章失败.')
      }
      this.$message.success('删除文章成功.')
      this.getNewsList()
    },
    // 返回主页
    backHome() {
      // 跳转回主页
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  height: 100%;
  background-color: aqua;
}
</style>
