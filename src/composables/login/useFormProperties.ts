import { IRuleForm } from '@/composables/login/useFormOperates'
import { getUserInfo, login, register } from '@/api/login'
import { IResultOr } from '@/api/interface'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
import { useStore } from '@/store'

const useFormProperties = function () {
  const { proxy }: any = getCurrentInstance()
  const router = useRouter()
  const route = useRoute()
  const store = useStore()

  // 注册接口
  function useSign (params: IRuleForm): Promise<boolean> {
    return register(params).then((res: IResultOr) => {
      const {
        success,
        message
      } = res
      if (success) {
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
      return success
    })
  }

  // 登录接口
  function useLogin (params: IRuleForm) {
    login(params).then((res) => {
      const {
        success,
        message,
        result
      } = res
      if (success) {
        const { token } = result
        localStorage.setItem('token', token)
        store.commit('setUserStatus', 1)
        const { redirect } = route.query
        router.push({ path: redirect as string || '/' })
        getUserInfo().then(res => {
          // todo 用户信息
          localStorage.setItem('userInfo', JSON.stringify(res.result))
          store.commit('setUserInfo', res.result)
        })
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  return {
    useSign,
    useLogin
  }
}

export default useFormProperties
