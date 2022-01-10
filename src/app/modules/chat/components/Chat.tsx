/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, Fragment, useState} from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {EZSVG} from '../../../../system/helpers'
import {ChatInner} from './ChatInner'
import getUserAPI from '../../auth/API/GetUserAPI'
import {UserModel} from '../../auth/redux/AuthModel'
import {IAuthState} from '../../auth/redux/AuthRedux'
import HistoryPath from '../../websocket/Path/HistoryPath'
import {ChatState} from '../redux/ChatRedux'

const Chat: FC = () => {
  const location = useLocation()
  const userState: IAuthState = useSelector((state: RootState) => state.auth)
  const chatState: ChatState = useSelector((state: RootState) => state.chat)
  const currentChatId: number = parseInt(location.hash.replace('#', ''))
  const [searchName, setSearchName] = useState('')
  const chatData = chatState.chats.find((c) => c.userId === currentChatId)

  if (chatData?.messages.length === 0) {
    new HistoryPath(currentChatId).send()
  }

  const getUser = (userId: number) => {
    const user = userState.users.find((u) => u.id === userId)
    if (!user) {
      getUserAPI(userId)
    }
    return user
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
        <div className='card card-flush'>
          <div className='card-header pt-7' id='kt_chat_contacts_header'>
            <form className='w-100 position-relative' autoComplete='off'>
              <EZSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y'
              />

              <input
                type='text'
                className='form-control form-control-solid px-15'
                name='search'
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder='搜尋使用者名稱'
              />
            </form>
          </div>

          <div className='card-body pt-5' id='kt_chat_contacts_body'>
            <div
              className='scroll-y me-n5 pe-5 h-200px h-lg-auto'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
            >
              {chatState.chats.map((chat, i) => {
                const user = getUser(chat.userId)
                if (user && (searchName === '' || user.name.includes(searchName))) {
                  return (
                    <Fragment key={`Fragment-${chat.userId}`}>
                      <div className='d-flex flex-stack py-4' key={`chat-${chat.userId}`}>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px symbol-circle'>
                            <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                              {user.name[0]}
                            </span>
                          </div>

                          <div className='ms-5'>
                            <a
                              href={`#${user.id}`}
                              className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'
                            >
                              {user.name}
                            </a>
                            <div className='fw-bold text-gray-400'>{user.email}</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className='separator separator-dashed d-none'
                        key={`separator-${chat.userId}`}
                      ></div>
                    </Fragment>
                  )
                }
                return <Fragment key={`Fragment-${i}`}></Fragment>
              })}
            </div>
          </div>
        </div>
      </div>

      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card' id='kt_chat_messenger'>
          {!isNaN(currentChatId) && getUser(currentChatId) && chatData !== undefined ? (
            <ChatInner
              messages={chatData.messages}
              auth={userState.auth?.user as UserModel}
              user={getUser(currentChatId) as UserModel}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export {Chat}
