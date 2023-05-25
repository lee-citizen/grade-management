<script setup lang="ts">
import { Lock, Search } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus/lib/components/form/index.js'
import { isPassword } from '~/utils/validate'
import { useStore } from '~/store'

interface Form {
  username: string
  password: string
}

// form组件ref
const ruleFormRef = ref<FormInstance>()

const form: Ref<Form> = ref({
  username: '',
  password: '',
})
// 验证用户名
function validateusername(rule: any, value: any, callback: any) {
  if (value === '')
    callback(new Error('用户名不能为空'))
  else
    callback()
}
// 验证密码
function validatePassword(rule: any, value: any, callback: any) {
  if (!isPassword(value))
    callback(new Error('密码不能少于6位'))
  else
    callback()
}
const passwordType: Ref<String> = ref('password')
const loading: Ref<Boolean> = ref(false)
const rules = reactive<FormRules>({
  username: [
    { required: true, trigger: 'blur', validator: validateusername },
  ],
  password: [
    { required: true, trigger: 'blur', validator: validatePassword },
  ],
})
// 切换显示密码
function handlePassword(): void {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
const store = useStore()
const router = useRouter()
// 登录处理
function handleLogin(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      ElMessage({
        message: 'success submit!',
        type: 'success',
      })
      // 登录操作
      store.dispatch('login', form.value).then(() => {
        router.push('/')
      }).catch(() => {
        loading.value = false
      })
    }
    else {
      ElMessage({
        message: 'error submit!',
        type: 'error',
      })
      loading.value = false
      return false
    }
  })
}
</script>

<template>
  <div class="login-container h-100vh flex items-center justify-center bg-#324057 bg-cover">
    <div>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" class="login-form overflow-hidden" label-position="left">
        <div class="title text-white">
          hello !
        </div>
        <div class="title-tips text-20px text-white sm:text-26px">
          欢迎来到学生答题情况监控系统！
        </div>
        <el-form-item style="margin-top: 40px" prop="username">
          <el-input
            v-model.trim="form.username" v-focus :prefix-icon="Search" placeholder="请输入用户名" tabindex="1"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :key="passwordType" v-model.trim="form.password" :prefix-icon="Lock" :type="passwordType" tabindex="2"
            placeholder="请输入密码" @keyup.enter="handleLogin(ruleFormRef)"
          >
            <template #suffix>
              <div v-if="passwordType === 'password'" i-carbon:view-off @click="handlePassword" />
              <div v-else i-carbon:view @click="handlePassword" />
            </template>
          </el-input>
        </el-form-item>
        <el-button :loading="loading" class="login-btn" type="primary" @click="handleLogin(ruleFormRef)">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {

  .title {
    font-size: 54px;
    font-weight: 500;
  }

  .title-tips {
    margin-top: 29px;

    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-btn {
    display: inherit;
    width: 220px;
    height: 48px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .login-form {
    max-width: 100%;
    overflow: hidden;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      text-align: center;
    }
  }

  .svg-container-block {
    position: absolute;
    top: 14px;
    left: 15px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    top: 14px;
    right: 25px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  :deep(.el-form-item) {
    padding-right: 0;
    margin: 20px 0;
    color: #454545;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 2px;

  }

  :deep(.el-form-item__error) {
    position: absolute;
    top: 100%;
    left: 18px;
    line-height: 18px;
  }

  :deep(.el-input) {
    box-sizing: border-box;

    input {
      height: 48px;
      line-height: 48px;
      border: 0;
    }

  }

}
</style>
