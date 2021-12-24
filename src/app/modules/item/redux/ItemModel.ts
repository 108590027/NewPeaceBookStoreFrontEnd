import {UserModel} from '../../auth/redux/AuthModel'
import {CategoryModel} from '../../category/redux/CategoryModel'

export type ItemModel = {
  id: number
  owner: UserModel
  category: CategoryModel
  name: string
  ISBN: string
  price: number
  quantity: number
  created_at: string
  updated_at: string

  tags: ItemTagModel[]
  images: ItemPreviewModel[]
}

export type ItemTagModel = {
  id: number
  tag_id: number
  item_id: number
  created_at: string
  updated_at: string
  tag: {
    id: number
    name: string
    created_at: string
    updated_at: string
  }
}

export type ItemPreviewModel = {
  id: number
  item_id: number
  photo: string
  created_at: string
  updated_at: string
}
