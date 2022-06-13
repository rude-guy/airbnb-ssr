// code: '000000'表示'操作成功'；code: '000001'表示'数据已存在'；code: '000002'表示'密码不正确'；
// code: '000003'表示'手机号不正确'；code: '000004'表示'其他异常'；code: '000005'表示'登录过期'；
import { IResultOr } from '@/api/interface'
import { http } from '@/utils/http'

// 用户登录
export async function login (params: any): Promise<IResultOr> {
  return http.httpPost('/users/login', params)
}
// 用户注册
export async function register (params: any): Promise<IResultOr> {
  return http.httpPost('/users/register', params)
}

// 获取用户信息
export async function getUserInfo (): Promise<IResultOr> {
  return http.httpGet('/users/info')
}
