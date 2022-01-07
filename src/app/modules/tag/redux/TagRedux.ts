import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {TagModel} from './TagModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  setTags: 'setTags',
  deleteTag: 'deleteTag',
  updateTags: 'updateTags',
}

const initialTagstate: TagState = {
  tags: [],
  lastUpdate: 0,
}

export interface TagState {
  tags: TagModel[]
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-Tag', whitelist: ['tags']}, // Tag存到localStorage持久化保存
  (state: TagState = initialTagstate, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setTags: {
        const tags: TagModel[] = action.payload?.tags
        const lastUpdate = Date.now()
        return {tags, lastUpdate}
      }

      case actionTypes.deleteTag: {
        const id: number = action.payload?.id
        const tag = state.tags.find((i) => i.id === id)
        if (tag) {
          state.tags.splice(state.tags.indexOf(tag), 1)
        }
        return {...state}
      }

      case actionTypes.updateTags: {
        const tags: TagModel[] = action.payload.tags
        tags.forEach((o) => {
          const tag = state.tags.find((i) => i.id === o.id)
          if (tag) {
            state.tags[state.tags.indexOf(tag)] = {...o}
          } else {
            state.tags.push(o)
          }
        })
        return {...state}
      }

      default:
        return state
    }
  }
)

export const actions = {
  setTags: (tags: TagModel[]) => ({
    type: actionTypes.setTags,
    payload: {tags},
  }),
  deleteTag: (id: number) => ({
    type: actionTypes.deleteTag,
    payload: {id},
  }),
  updateTags: (tags: TagModel[]) => ({
    type: actionTypes.updateTags,
    payload: {tags},
  }),
}

export function* saga() {}
