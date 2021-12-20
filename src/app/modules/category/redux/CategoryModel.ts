import {ItemModel} from '../../item/redux/ItemModel'

export type CategoryModel = {
  id: number
  name: string
  is_department: boolean
  _items: ItemModel[]
}
