// store.ts
import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { useStore as baseUseStore, createStore } from 'vuex'

// 为 store state 声明类型
export interface State {
  count: number
  RouterList: {
    index: string
    title: string
    path: string
  }[]
  userInfo: {
    name: string
    age: number
    auth: string
  }
  islogin: boolean
  outRouterName: string[]
  clientInfo: {
    width: number
    height: number
  }

}

// 路由信息
const routerList: RouterList = [
  {
    index: '0',
    title: '首页',
    path: '/',
  },
  {
    index: '1',
    title: '答题监控',
    path: '/',
  },
  {
    index: '2',
    title: '统计分析',
    path: '/',
  },
]
// 用户信息
const userInfo: userInfo = {
  name: '张三',
  age: 18,
  auth: '管理员',
}
export const key: InjectionKey<Store<State>> = Symbol('symbol-description')
export const store = createStore<State>({
  state: {
    count: 0,
    routerList,
    userInfo: {},
    islogin: window.localStorage.getItem('islogin') === 'true',
    outRouterName: ['Login'],
    clientInfo: {
      width: 0,
      height: 0,
    },
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setClientInfo(state, client) {
      state.clientInfo = client
    },
    setUserInfo(state) {
      state.userInfo = userInfo
    },
    setLogin(state, islogin) {
      state.islogin = islogin
      window.localStorage.setItem('islogin', islogin) // 保存登录状态
    },
  },
  actions: {
    login({ commit }) {
      // 一般登录都是异步操作
      return new Promise((resolve) => {
        commit('setUserInfo')
        commit('setLogin', true)
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    },
    logout({ commit }) {
      commit('setLogin', false)
    },
    getUserInfo({ commit }) {
      return new Promise((resolve) => {
        commit('setUserInfo')
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    },
  },
  getters: {
    islogin: state => state.islogin,
    outRouterName: state => state.outRouterName,
  },

})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
