export default class DB {
  private readonly dbName: string // 数据库名字
  private db: any // 数据库对象
  constructor (dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  public openStore (stores: any) {
    const request = window.indexedDB.open(this.dbName, 2)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        this.db = event.target.result
        resolve(true)
      }
      request.onerror = (event) => {
        reject(event)
      }
      request.onupgradeneeded = (event) => {
        const { result }: any = event.target
        for (const storeName in stores) {
          const { keyPath, indexs } = stores[storeName]
          if (!result.objectStoreNames.contains(storeName)) { // 没有表则新建表
            // keyPath：主键，主键（key）是默认建立索引的属性； autoIncrement：是否自增；createObjectStore会返回一个对象仓库objectStore(即新建一个表)
            const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
            if (indexs && indexs.length) {
              indexs.map((v: string) =>
                // createIndex可以新建索引，unique字段是否唯一
                store.createIndex(v, v, { unique: false })
              )
            }
            store.transaction.oncomplete = (e: any) => {
              console.log('创建对象仓库成功')
            }
          }
        }
      }
    })
  }

  // 新增/修改数据库数据
  updateItem (storeName: string, data: any) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.put({
        ...data,
        updateTime: Date.now()
      })
      request.onsuccess = (event: any) => {
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  // 新增/修改数据库数据
  deleteItem (storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], 'readonly').objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.delete(key)
      request.onsuccess = (event: any) => {
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  // 查询所有数据
  getList (storeName: string) {
    const store = this.db.transaction([storeName], 'readonly').objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = (event: any) => {
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  // 查询某一条数据
  getItem (storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], 'readonly').objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.get(key)
      request.onsuccess = (event: any) => {
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }
}
