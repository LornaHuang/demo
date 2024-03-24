<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-top">
        <div class="header-title">
          <div style="font-size: 20px">油品计量信息管理平台</div>
          <div style="font-size: 12px">日期: {{currentData}}  欢迎您！admin</div>
        </div>
        <div class="header-right">
          <div class="right-item">切换用户</div>
          <div class="right-item">消息</div>
          <div class="right-item">系统设置</div>
          <div class="right-item" @click="logOut">退出登录</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside-menu">
          <el-menu
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
          >
            <el-sub-menu v-for="(menu) in menuList" :key="menu.path" :index="menu.path">
              <template #title>
                <span>{{menu.title}}</span>
              </template>
              <el-menu-item v-for="(menuItem) in menu.children" :key="menuItem.path" :index="menuItem.path" @click="handleRoute" >{{menuItem.title}}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getNowDate} from "@/views/util/demoMock";

export default {
  name: "homePage",
  data() {
    return {
      currentData: getNowDate(),
      menuList: [
        {
          title: '计量方式',
          path: '/',
          children: [
            {title: '岸罐计量', path: 'homeIndex'},
            {title: '船舶计量', path: 'boat'},
          ]
        },
        {
          title: '计量信息',
          path: 'measurementInfo',
          children: [
              {title: '基础信息', path: 'basicinfo'},
              {title: '历史查询', path: 'historyCheck'},
              {title: '统计分析', path: 'analysis'},
          ]
        },
        {
          title: '计量常识',
          path: 'measurementSense',
          children: [
            {title: '计量术语', path: 'shuYu'},
            {title: '计量注意事项', path: 'attention'},
          ]
        },
        {
          title: '计量仪器',
          path: 'measurementInstrument',
          children: [
            {title: '计量仪器综合管理', path: 'management'},
            {title: '计量仪器导入', path: 'import'},
            {title: '计量仪器导出', path: 'export'},
            {title: '计量仪器鉴定', path: 'appraise'},
          ]
        },
      ]
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    logOut() {
      this.$router.push('/');
    },
    handleRoute(data) {
      if(data.index === 'homeIndex') {
        this.$router.push(data.index);
      }
    },
  }
}
</script>

<style scoped>
.common-layout {
  height: 100%;
  padding: 0;
  margin: 0;
}
.header-top {
  background-color: #0083C8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.header-title {
  color: #ffffff;
}
.header-right {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.right-item {
  width: 100px;
  margin: 0 5px;
  color: #ffffff;
  border-radius: 10px;
  text-align: center;
  font-size: 14px;
}
.aside-menu {
  height: calc(100vh - 60px);
  background-color: #2B4258;
}
.el-menu-vertical-demo {
  --el-menu-bg-color: #2B4258;
  --el-menu-text-color: #ffffff;
  --el-menu-hover-text-color: #ffffff;
  --el-menu-hover-bg-color:#0072A7;
}
</style>