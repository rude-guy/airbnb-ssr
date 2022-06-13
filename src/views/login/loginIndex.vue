<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import useFormOperates from '@/composables/login/useFormOperates'
import useFormProperties from '@/composables/login/useFormProperties'

const { t } = useI18n()

const { loginText, ruleFormRef, activeName, rules, ruleForm } = useFormOperates(t)

const { useSign, useLogin } = useFormProperties()

function handleClick (e: any) {
  const { name } = e.props
  if (name === 'login') {
    loginText.value = t('login.loginBtn')
  } else if (name === 'sign') {
    loginText.value = t('login.signBtn')
  }
}

function submitForm () {
  ruleFormRef.value?.validate((valid: any) => {
    if (valid) {
      if (activeName.value === 'sign') {
        useSign(ruleForm)
      } else if (activeName.value === 'login') {
        useLogin(ruleForm)
      }
    } else {
      return false
    }
  })
}
</script>

<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="email">
            <el-input :placeholder="t('login.placeMobile')" v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                type="password"
                :placeholder="t('login.placePass')"
                v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm">{{ loginText }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
@import "src/assets/scss/login/index.scss";
</style>
