import { IRuleForm } from '@/composables/login/useFormOperates'
import { userLoginApi, userSignApi } from '@/api/login'
import { IResultOr } from '@/api/interface'
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
import { useStore } from '@/store'

const useFormProperties = function () {
  const { proxy }: any = getCurrentInstance()
  const router = useRouter()
  const store = useStore()
  // 注册接口
  function useSign (params: IRuleForm) {
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res
      if (success) {
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  // 登录接口
  function useLogin (params: IRuleForm) {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, message, result: { status } } = res
      if (success) {
        // localStorage.setItem('userStatus', status)
        store.commit('setUserStatus', status)
        router.push({ name: 'home' })
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  return { useSign, useLogin }
}

export default useFormProperties
