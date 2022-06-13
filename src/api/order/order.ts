import { IResultOr } from '@/api/interface'
import { http } from '@/utils/http' // 引入数据库和对象仓库

// Mock接口：立即预定
export async function saveOrderApi (id: string, params: any): Promise<IResultOr> {
  return http.httpPatch(`http://localhost:3001/record/orderRoom/${id}`, params)
}

// Mock接口：订单列表
export async function fetchOrderApi (): Promise<IResultOr> {
  return http.httpGet('/users/orderList')
}
