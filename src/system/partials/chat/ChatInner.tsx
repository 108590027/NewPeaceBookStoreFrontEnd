/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import clsx from 'clsx'
import {UserModel} from '../../../app/modules/auth/redux/AuthModel'
import ChatPath from '../../../app/modules/websocket/Path/ChatPath'
import {getTimeElapsedString} from '../../../app/utils/DateUtil'
import {Link} from 'react-router-dom'

type Props = {
  auth: UserModel
  user: UserModel
  messages: {
    fromId: number
    message: string
    time: number
  }[]
}

const ChatInner: FC<Props> = ({auth, user, messages}) => {
  const [tmp, setTmp] = useState(0)
  const [message, setMessage] = useState<string>('')

  setInterval(() => {
    setTmp(tmp + 1)
  }, 60 * 1000)

  const sendMessage = () => {
    new ChatPath(user.id, message).send()
    setMessage('')
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className='card-body' id={'kt_chat_messenger_body'}>
      <div
        style={{maxHeight: `${window.innerHeight - 370}px`}}
        className={clsx('scroll-y me-n5 pe-5 h-300px h-lg-auto')}
        data-kt-element='messages'
        data-kt-scroll='true'
        data-kt-scroll-activate='{default: false, lg: true}'
        data-kt-scroll-dependencies={
          '#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
        }
        data-kt-scroll-wrappers={'#kt_chat_messenger_body'}
        data-kt-scroll-offset={'5px'}
      >
        {messages.map((message, index) => {
          const state = message.fromId === user.id ? 'info' : 'primary'
          const templateAttr = {}
          const contentClass = `d-flex justify-content-${
            message.fromId === user.id ? 'start' : 'end'
          } mb-10`
          return (
            <div
              key={`message${index}`}
              className={clsx('d-flex', contentClass, 'mb-10')}
              {...templateAttr}
            >
              <div
                className={clsx(
                  'd-flex flex-column align-items',
                  `align-items-${message.fromId === user.id ? 'start' : 'end'}`
                )}
              >
                <div className='d-flex align-items-center mb-2'>
                  {message.fromId === user.id ? (
                    <>
                      <div className='symbol  symbol-35px symbol-circle '>
                        <span className='symbol-label symbol-circle bg-light-danger text-danger fs-3 fw-bolder'>
                          {user.name[0]}
                        </span>
                      </div>
                      <div className='ms-3'>
                        <Link
                          to={`/user/${user.id}`}
                          className='fs-5 fw-bolder text-gray-900 text-hover-primary me-1'
                        >
                          {user.name}
                        </Link>
                        <span className='text-muted fs-7 mb-1'>
                          {getTimeElapsedString(message.time)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='me-3'>
                        <span className='text-muted fs-7 mb-1'>
                          {getTimeElapsedString(message.time)}
                        </span>
                        <span className='fs-5 fw-bolder text-gray-900 text-hover-primary ms-1'>
                          你
                        </span>
                      </div>
                      <div className='symbol  symbol-35px symbol-circle '>
                        <span className='symbol-label symbol-circle bg-light-danger text-danger fs-3 fw-bolder'>
                          {auth.name[0]}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div
                  className={clsx(
                    'p-5 rounded',
                    `bg-light-${state}`,
                    'text-dark fw-bold mw-lg-400px',
                    `text-${message.fromId === user.id ? 'start' : 'end'}`
                  )}
                  data-kt-element='message-text'
                  dangerouslySetInnerHTML={{__html: message.message}}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className='card-footer pt-4' id={'kt_chat_messenger_footer'}>
        <textarea
          className='form-control form-control-flush mb-3'
          rows={1}
          data-kt-element='input'
          placeholder='請輸入訊息...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        ></textarea>

        <div className='d-flex flex-stack'>
          <div className='d-flex align-items-center me-2'></div>
          <button
            className='btn btn-primary'
            type='button'
            data-kt-element='send'
            onClick={sendMessage}
          >
            發送
          </button>
        </div>
      </div>
    </div>
  )
}

export {ChatInner}
