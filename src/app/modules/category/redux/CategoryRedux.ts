import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {ItemModel} from '../../item/redux/ItemModel'
import {CategoryModel} from './CategoryModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  setCategories: 'setCategories',
  createCategory: 'createCategory',
  deleteCategory: 'deleteCategory',
  setCategoryItems: 'setCategoryItems',
}

const initialCategoryState: CategoryState = {
  Categories: [],
  lastUpdate: 0,
}

export interface CategoryState {
  Categories: CategoryModel[]
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-Category', whitelist: ['Categories']}, // Category存到localStorage持久化保存
  (state: CategoryState = initialCategoryState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setCategories: {
        const Categories: CategoryModel[] = action.payload?.Categories
        const lastUpdate = Date.now()
        return {Categories, lastUpdate}
      }

      case actionTypes.createCategory: {
        const Categorie: CategoryModel = action.payload?.Category
        state.Categories.push(Categorie)
        return {...state}
      }

      case actionTypes.deleteCategory: {
        const id: number = action.payload?.id
        const category = state.Categories.find((c) => c.id === id)
        if (category) {
          state.Categories.splice(state.Categories.indexOf(category), 1)
        }
        return {...state}
      }

      case actionTypes.setCategoryItems: {
        const id: number = action.payload.id
        const items: ItemModel[] = action.payload.items
        const category = state.Categories.find((c) => c.id === id)
        if (category) {
          category._items = items
        }
        return {...state}
      }

      default:
        return state
    }
  }
)

export const actions = {
  setCategories: (Categories: CategoryModel[]) => ({
    type: actionTypes.setCategories,
    payload: {Categories},
  }),
  createCategory: (Category: CategoryModel) => ({
    type: actionTypes.createCategory,
    payload: {Category},
  }),
  deleteCategory: (id: number) => ({
    type: actionTypes.deleteCategory,
    payload: {id},
  }),
  setCategoryItems: (id: number, items: ItemModel[]) => ({
    type: actionTypes.setCategoryItems,
    payload: {id, items},
  }),
}

export function* saga() {}
