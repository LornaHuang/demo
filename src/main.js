import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import demoMock from "@/views/util/demoMock";
import { ElNotification, ElMessage } from 'element-plus'

import 'element-plus/dist/index.css'
// 导入路由模块
import router from "@/router/router";

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.config.globalProperties.$demoMock = demoMock
app.config.globalProperties.$notify = ElNotification
app.config.globalProperties.$message = ElMessage
app.mount("#app")