<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '~/store'

const store = useStore()
const router = useRouter()
const islogin = store.getters.islogin
const outRouterName = store.getters.outRouterName
const routerName = computed(() => router.currentRoute.value.name || '/')
const loading = ref(true)
// 监听屏幕变化
function update() {
  const clientInfo = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
  store.commit('setClientInfo', clientInfo)
}
const { width } = useWindowSize()
watchDebounced(
  width,
  () => {
    update()
  },
  { debounce: 100, maxWait: 1000 },
)
onMounted(() => {
  if (!islogin && !outRouterName.includes(router.currentRoute.value.name)) {
    router.replace('/login')
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
  else if (islogin && router.currentRoute.value.name === 'Login') {
    router.push('/')
    loading.value = false
  }
  else {
    store.dispatch('getUserInfo').then(() => {
      loading.value = false
    }).catch(() => {
      ElMessage({
        message: '请先登录',
        type: 'error',
      })
      loading.value = false
      router.push('/login')
    })
  }
  update()
})
</script>

<template>
  <main class="h-full overflow-hidden bg-#f0f0f0">
    <TheHeader v-show="!outRouterName.includes(routerName as string)" />
    <Loading v-if="loading" />
    <RouterView />
    <TheFooter />
  </main>
</template>
