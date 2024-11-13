<template>
  <el-container>
    <el-container>
      <el-aside>
        <el-menu active-text-color="#ffd04b" :router="true">
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
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      addNewsDialogVisible: false
    }
  }
}
</script>
