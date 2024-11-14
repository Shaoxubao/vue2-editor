<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="img-container">
        <img src="../assets/R.png" alt="" />
        <span>博客管理系统</span>
      </div>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
      <span style="font-size: smaller; color: #000">欢迎回来~~~</span>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          active-text-color="#ffd04b"
          :router="true"
          background-color="#000080"
          text-color="#fff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu :index="1 + ''">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <span>文章管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + 'newsAdd'">
              <template slot="title">
                <span>新增文章</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/' + 'news'">
              <template slot="title">
                <span>文章列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容主题-->
      <el-main>
        <!-- 路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      addNewsDialogVisible: false,
      // 菜单是否折叠
      isCollapse: false
    }
  },
  methods: {
    // 菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 退出
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #7ac5cd;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.img-container img {
  width: 5%;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
}

.el-aside {
  background-color: #8eb3b7;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #f0fff0;
}
.toggle-button {
  background-color: #6495ed;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
