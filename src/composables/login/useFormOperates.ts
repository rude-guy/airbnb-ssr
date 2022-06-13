import { reactive, ref } from 'vue'
// @ts-ignore
import { FormInstance, FormRules } from 'element-plus'

export interface IRuleForm {
  email: string,
  password: string
}
const useFormOperates = function (t: any) {
  const activeName = ref('login')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm: IRuleForm = reactive({
    email: '2064825357@qq.com',
    password: '123456'
  })
  const rules = reactive<FormRules>({
    email: [
      {
        required: true,
        message: t('login.placeMobile'),
        trigger: 'blur'
      }, { pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: t('login.placeMobile'), trigger: 'blur' }
    ],
    password: [
      {
        required: true,
        message: t('login.placePass'),
        trigger: 'blur'
      }
    ]
  })

  const loginText = ref(t('login.loginBtn'))

  return {
    activeName,
    ruleFormRef,
    ruleForm,
    rules,
    loginText
  }
}

export default useFormOperates
