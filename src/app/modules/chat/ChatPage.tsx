import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../system/layout/core'
import {Private} from './components/Private'
import {Group} from './components/Group'
import {Drawer} from './components/Drawer'

const chatBreadCrumbs: Array<PageLink> = [
  {
    title: 'Chat',
    path: '/chat/private-chat',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ChatPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/chat/private-chat'>
        <PageTitle breadcrumbs={chatBreadCrumbs}>Private chat</PageTitle>
        <Private />
      </Route>
      <Route path='/chat/group-chat'>
        <PageTitle breadcrumbs={chatBreadCrumbs}>Group chat</PageTitle>
        <Group />
      </Route>
      <Route path='/chat/drawer-chat'>
        <PageTitle breadcrumbs={chatBreadCrumbs}>Drawer chat</PageTitle>
        <Drawer />
      </Route>
      <Redirect from='/chat' exact={true} to='/chat/private-chat' />
      <Redirect to='/chat/private-chat' />
    </Switch>
  )
}

export default ChatPage
