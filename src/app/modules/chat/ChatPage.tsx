import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../system/layout/core'
import {Chat} from './components/Chat'
const chatBreadCrumbs: Array<PageLink> = []

const ChatPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/chat'>
        <PageTitle breadcrumbs={chatBreadCrumbs}>聊天室</PageTitle>
        <Chat />
      </Route>
      <Redirect to='/chat' />
    </Switch>
  )
}

export default ChatPage
