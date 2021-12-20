import store from '../../../../setup/redux/Store'

export class ItemModel {
  id: number = 0
  owner: number = 0
  category: number = 0
  name: string = ''
  ISBN: string = ''
  price: number = 0
  quantity: number = 0
  created_at: string = ''
  updated_at: string = ''

  public getCategory() {
    return store.getState().category.Categories.find((c) => c.id === this.category)
  }
}
