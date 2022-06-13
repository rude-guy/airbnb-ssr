import { IResultOr } from '@/api/interface'
import { http } from '@/utils/http'

// 保存浏览记录
export async function saveRecordApi (params: any): Promise<IResultOr> {
  return http.httpPost('/record/create', params)
}

// 浏览记录列表
export async function fetchRecordApi (): Promise<IResultOr> {
  return http.httpGet('/users/recordHistory')
}
