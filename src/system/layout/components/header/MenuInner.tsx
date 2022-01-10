import React, {FC, useState} from 'react'
import {useHistory} from 'react-router-dom'
import SearchInput from '../../../helpers/SearchInput'
import getItemByKeyword from '../../../../app/modules/item/API/GetItemsByKeywordAPI'
import ChatPath from '../../../../app/modules/websocket/Path/ChatPath'
import LoginPath from '../../../../app/modules/websocket/Path/LoginPath'
import WebSocketHandler from '../../../../app/modules/websocket/WebSocketHandler'

export const MenuInner: FC = () => {
  const history = useHistory()
  const [load, setLoad] = useState(false)
  const [keywordPredicts, setKeywordPredicts] = useState([''] as string[])
  if (!load) {
    setLoad(true)
    WebSocketHandler.connect(false, () => {
      new ChatPath(0, '')
      new LoginPath().send()
    })
  }

  const searchKeyword = async (keyword: string): Promise<string[]> => {
    if (keyword === '') {
      return []
    }
    const items = await getItemByKeyword(keyword)
    const itemNames: string[] = []
    if ('message' in items) {
      return itemNames
    } else {
      items.forEach((item) => {
        itemNames.push(item.name)
      })
      return itemNames
    }
  }
  const setKeywords = (i: number, name: string) => {
    keywordPredicts[i] = name
    setKeywordPredicts([...keywordPredicts])
  }
  const search = (keyword: string) => {
    history.push(`/item/search#${keyword}`)
  }

  return (
    <>
      <div style={{width: '100%'}}>
        {keywordPredicts.map((keyword, i) => (
          <div className='align-middle mt-3' key={i}>
            <SearchInput
              placeholder='請輸入關鍵字'
              state={keyword}
              event={(msg: string) => search(msg)}
              setState={(msg: string) => setKeywords(i, msg)}
              apiFunc={(msg: string) => searchKeyword(msg)}
            />
          </div>
        ))}
      </div>
    </>
  )
}
