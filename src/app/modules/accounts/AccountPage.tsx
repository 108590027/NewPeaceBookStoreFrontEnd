import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../system/layout/core'
import {Overview} from './components/Overview'
import {Settings} from './components/settings/Settings'
import {AccountHeader} from './AccountHeader'
import {Comments} from './components/settings/Comments'
import {Items} from './components/settings/Items'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: '帳戶',
    path: '/account/overview',
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

const AccountPage: React.FC = () => {
  return (
    <>
      <AccountHeader />
      <Switch>
        <Route path='/account/overview'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>個人總覽</PageTitle>
          <Overview />
        </Route>
        <Route path='/account/settings'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>修改個人資訊</PageTitle>
          <Settings />
        </Route>
        <Route path='/account/comments'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>評論</PageTitle>
          <Comments />
        </Route>
        <Route path='/account/items'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>商品</PageTitle>
          <Items />
        </Route>

        <Redirect from='/account' exact={true} to='/account/overview' />
        <Redirect to='/account/overview' />
      </Switch>
    </>
  )
}

export default AccountPage
