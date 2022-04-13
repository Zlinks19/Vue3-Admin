<template>
  <div class="containerWrap">
    <aside class="leftNav">
      <h1 class="systemTitle">Kino Admin</h1>
      <el-menu :default-active="menuActive" class="el-menu-vertical-demo" @select="handleMenuSelect">
        <template v-for="(item,index) in menuList" :key="index">
          <el-menu-item :index="item.children[0].path" v-if="item.children.length == 1">
            <el-icon>
              <Tickets />
            </el-icon>
            <span>{{item.name}} </span>
          </el-menu-item>

          <el-sub-menu :index="String(index)" v-else>
            <template #title>
              <el-icon>
                <Tickets />
              </el-icon>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="item1 in item.children" :key="item1" :index="item1.path">{{item1.meta.name}}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </aside>
    <main class="content">
      <header class="headerBox">
        <el-breadcrumb class="flex flex_items_c ml20" separator="/">
          <el-breadcrumb-item @click="handleBread" :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="route.path != '/home' && route.path != '/'">{{route.meta.name}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link flex flex_items_c">
            <span>{{userInfo.name}}</span>
            <el-avatar class="ml20" :src="avatarUrl" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </header>
      <div>
        <!-- <transition name="el-fade-in-linear">
          <router-view></router-view>
        </transition> -->
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>

      </div>
    </main>

  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { Tickets } from "@element-plus/icons-vue";
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const routerList = useRouter().getRoutes()
    const menuList = routerList.filter(item => item.children.length > 0)
    const avatarUrl = ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
    const userInfo = reactive(JSON.parse(sessionStorage.getItem('user')))
    const menuActive = ref(route.path)
    const handleMenuSelect = (i) => {
      menuActive.value = i
      router.push({ path: i })
    }
    const add = () =>{
      menuActive.value = '/home'
    }
    const handleCommand = (i) => {
      if (i == 'logout') {
        ElMessageBox.confirm('Are you sure to sign out current user?')
          .then(() => {
            axios.get('/mock/login/logout.json').then(res=>{
              router.push('/login')
              console.log(res);
            })
          })
          .catch(() => {
            // catch error
          })
      }
      
    }
    const handleBread = () => {
      menuActive.value = '/home'
    }

    return {
      menuList,
      avatarUrl,
      route,
      userInfo,
      menuActive,
      handleMenuSelect,
      handleCommand,
      handleBread
    }
  },
  components: {
    Tickets,
  }
};
</script>

<style lang="scss" scoped>
.containerWrap {
  display: flex;
  min-height: 100vh;
}
.leftNav {
  width: 200px;
  .systemTitle {
    height: 80px;
    line-height: 80px;
    background: #fff;
    text-align: center;
    border-right: 1px solid #dcdfe6;
  }
}
.el-menu {
  height: calc(100% - 80px);
}
.content {
  flex: 1;
  min-height: 100%;
}
.headerBox {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
  background: #fff;
  box-shadow: 30px 0px 0px 0px rgba(0, 0, 0, 0.04),
    0px 8px 20px rgba(0, 0, 0, 0.08);
}
</style>
<style lang="scss">
.el-tooltip__trigger {
  display: flex;
  align-items: center;
}
</style>