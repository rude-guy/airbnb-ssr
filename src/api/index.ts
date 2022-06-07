// https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3
import IndexedDB from '@/utils/indexedDB'

const airbnbDB = new IndexedDB('airbnb')

export async function fetchElephant () {
  // @ts-ignore
  await airbnbDB.openStore('elephant', 'id', ['nose', 'ear'])
  return airbnbDB.getList('elephant').then(res => {
    return {
      code: '000000',
      message: '操作成功',
      result: res,
      success: true
    }
  })
}
