import { ElLoading } from 'element-plus'
import airbnb from '@/db'
import { IResultOr } from '@/api/interface' // 引入数据库和对象仓库

const storeName = Object.keys(airbnb.orderObjectStore)[0]

// Mock接口：立即预定
export async function saveOrderApi (params: any) {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 是否存在相同订单Id
  const hasOrderId = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.forEach((item: any) => {
        if (item.orderId === params.orderId && item.userId === userId) { // 存在相同订单Id
          resolve(true)
        }
      })
      resolve(false)
    })
  })
  let result: IResultOr
  if (hasOrderId) {
    result = await new Promise((resolve, reject) => {
      resolve({ code: '000001', success: false, message: '数据已存在', result: null })
    })
  } else {
    Object.assign(params, { userId })
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: '操作成功', result: null })
      })
    })
  }
  return result
}
