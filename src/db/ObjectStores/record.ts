import TypeObjectStore from '@/db/type'

const webRecord: TypeObjectStore =
  {
    keyPath: 'recordId',
    indexs: ['title', 'personNumber', 'pictureUrl', 'price']
  }

const recordObjectStore =
  {
    web_record: webRecord
  }

export default recordObjectStore
