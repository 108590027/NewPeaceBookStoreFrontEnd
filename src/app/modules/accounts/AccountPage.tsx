import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Settings} from './components/settings/Settings'
import {AccountHeader} from './AccountHeader'
import {Comments} from './components/settings/Comments'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: '帳戶',
    path: '/crafted/account/overview',
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
        <Route path='/crafted/account/overview'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>個人總覽</PageTitle>
          <Overview />
        </Route>
        <Route path='/crafted/account/settings'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>修改個人資訊</PageTitle>
          <Settings />
        </Route>
        <Route path='/crafted/account/comments'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>評論</PageTitle>
          <Comments />
        </Route>

        <Redirect from='/crafted/account' exact={true} to='/crafted/account/overview' />
        <Redirect to='/crafted/account/overview' />
      </Switch>
    </>
  )
}

export default AccountPage
