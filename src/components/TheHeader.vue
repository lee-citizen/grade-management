<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '~/store'

const store = useStore()
const visible = ref(false)
const activeIndex: Ref<string> = ref('0')
const router = useRouter()
// const routerList = computed(() => store.state.routerList)
function handleSelect(key: string, keyPath: string[]) {

}
const userInfo = computed(() => {
  return store.state.userInfo
})
function logout() {
  store.dispatch('logout')
  router.replace('/login')
  visible.value = false
}
const circleUrl: Ref<string> = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
</script>

<template>
  <el-menu
    :default-active="activeIndex" class="el-menu-demo bg-#324057" mode="horizontal" :ellipsis="false"
    @select="handleSelect"
  >
    <div class="hidden cursor-pointer items-center px-4 text-xl font-bold text-white sm:flex-inline" @click="router.push('/')">
      学生答题情况监控系统
    </div>
    <div class="flex-grow" />
    <!-- <el-menu-item v-for="(item, index) in routerList" :key="index" :index="item.index">
      {{ item.title }}
    </el-menu-item> -->
    <el-popover :visible="visible" placement="top" :width="160">
      <p>退出登录?</p>
      <div mt1 flex>
        <el-button size="small" @click="visible = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="logout">
          确认
        </el-button>
      </div>
      <template #reference>
        <div flex items-center px4 py3 space-x-3 @click="visible = true">
          <el-avatar :size="40" :src="circleUrl" />
          <p text-white>
            {{ userInfo.auth }}
          </p>
        </div>
      </template>
    </el-popover>
  </el-menu>
</template>

<style scoped>
.el-menu--horizontal>.el-menu-item {
  color: #bfcbd9;
}

.el-menu--horizontal>.el-menu-item:hover {
  background-color: #48576a;
}

.el-menu--horizontal>.el-menu-item {
  background-color: #324057;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background: #324057;
}
</style>
