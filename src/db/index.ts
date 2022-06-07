import DB from '@/utils/indexedDB'
import languageObjectStore from '@/db/ObjectStores/language'
import userObjectStore from '@/db/ObjectStores/user'
import orderObjectStore from '@/db/ObjectStores/order'

export const airbnbDB = new DB('airbnb')

export default {
  airbnbDB,
  languageObjectStore,
  userObjectStore,
  orderObjectStore
}
