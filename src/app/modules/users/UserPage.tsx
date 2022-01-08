import React, {useState} from 'react'
import {match, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../system/layout/core'
import {UserHeader} from './UserHeader'
import {Comments} from './components/settings/Comments'
import {Items} from './components/settings/Items'
import {IAuthState} from '../auth/redux/AuthRedux'
import {useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {UserModel} from '../auth/redux/AuthModel'
import getUserAPI from '../auth/API/GetUserAPI'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: '會員資訊',
    path: '#',
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

interface Props {
  match: match<{id: string}>
}
const UserPage: React.FC<Props> = ({match}) => {
  const [user, setUser] = useState<UserModel>()
  if (user?.id !== parseInt(match.params.id)) {
    ;(async () => {
      const data = await getUserAPI(parseInt(match.params.id))
      if ('id' in data) {
        setUser(data)
      }
    })()
  }

  return (
    <>
      <UserHeader user={user} />
      <Switch>
        <Route path='/user/:id/'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>商品</PageTitle>
          <Items user={user} />
        </Route>
        <Route path='/user/:id/comments'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>評論</PageTitle>
          <Comments user={user} />
        </Route>
      </Switch>
    </>
  )
}

export default UserPage
