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
  updateCategory: 'updateCategory',
}

const initialCategoryState: CategoryState = {
  categories: [],
  lastUpdate: 0,
}

export interface CategoryState {
  categories: CategoryModel[]
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-Category', whitelist: ['categories']}, // Category存到localStorage持久化保存
  (state: CategoryState = initialCategoryState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setCategories: {
        const categories: CategoryModel[] = action.payload?.categories
        const lastUpdate = Date.now()
        return {categories, lastUpdate}
      }

      case actionTypes.createCategory: {
        const Categorie: CategoryModel = action.payload?.Category
        state.categories.push(Categorie)
        return {...state}
      }

      case actionTypes.updateCategory: {
        const category: CategoryModel = action.payload?.Category
        const oriCategory = state.categories.find((c) => c.id === category.id)
        if (oriCategory) {
          const index = state.categories.indexOf(oriCategory)
          state.categories[index] = {...category}
        } else {
          state.categories.push(category)
        }
        return {...state}
      }

      case actionTypes.deleteCategory: {
        const id: number = action.payload?.id
        const category = state.categories.find((c) => c.id === id)
        if (category) {
          state.categories.splice(state.categories.indexOf(category), 1)
        }
        return {...state}
      }

      case actionTypes.setCategoryItems: {
        const id: number = action.payload.id
        const items: ItemModel[] = action.payload.items
        const category = state.categories.find((c) => c.id === id)
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
  setCategories: (categories: CategoryModel[]) => ({
    type: actionTypes.setCategories,
    payload: {categories},
  }),
  createCategory: (Category: CategoryModel) => ({
    type: actionTypes.createCategory,
    payload: {Category},
  }),
  updateCategory: (Category: CategoryModel) => ({
    type: actionTypes.updateCategory,
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
