import { reactive, ref } from 'vue'
// @ts-ignore
import { FormInstance, FormRules } from 'element-plus'

export interface IRuleForm {
  mobile: string,
  password: string
}
const useFormOperates = function (t: any) {
  const activeName = ref('login')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm: IRuleForm = reactive({
    mobile: '13541689124',
    password: '123456'
  })
  const rules = reactive<FormRules>({
    mobile: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t('login.placeMobile'),
        trigger: 'blur'
      }
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
