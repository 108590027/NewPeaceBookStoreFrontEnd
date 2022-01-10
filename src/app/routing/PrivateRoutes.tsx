import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../system/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'

export function PrivateRoutes() {
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const UserPage = lazy(() => import('../modules/users/UserPage'))
  const OrderDetail = lazy(() => import('../modules/accounts/components/OrderDetail'))
  const MerchantOrderDetail = lazy(
    () => import('../modules/accounts/components/MerchantOrderDetail')
  )
  const MerchantOrders = lazy(() => import('../modules/accounts/components/MerchantOrders'))
  const ChatPage = lazy(() => import('../modules/chat/ChatPage'))
  const CategoryPage = lazy(() => import('../modules/category/components/CategoryPage'))
  const AdminTagsPage = lazy(() => import('../modules/admin/components/AdminTagsPage'))
  const AdminReportsPage = lazy(() => import('../modules/admin/components/AdminReportsPage'))
  const AdminCategoriesPage = lazy(() => import('../modules/admin/components/AdminCategoriesPage'))
  const AdminUsersPage = lazy(() => import('../modules/admin/components/AdminUsersPage'))
  const AdminUserPage = lazy(() => import('../modules/admin/components/AdminUserPage'))
  const NewArrivalPage = lazy(() => import('../modules/item/NewArrivalPage'))
  const SearchPage = lazy(() => import('../modules/item/components/SearchPage'))
  const ItemPage = lazy(() => import('../modules/item/components/ItemPage'))
  const ItemUpdatePage = lazy(() => import('../modules/item/components/ItemUpdatePage'))
  const TagPage = lazy(() => import('../modules/tag/components/TagPage'))
  const ShoppingCartPage = lazy(() => import('../modules/item/components/ShoppingCartPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/admin/tags' component={AdminTagsPage} />
        <Route path='/admin/categories' component={AdminCategoriesPage} />
        <Route path='/admin/reports' component={AdminReportsPage} />
        <Route path='/admin/users' component={AdminUsersPage} />
        <Route path='/admin/user/:id' component={AdminUserPage} />

        <Route path='/category/:id' component={CategoryPage} />

        <Route path='/account/order/:id' component={OrderDetail} />
        <Route path='/account/MerchantOrder/:id' component={MerchantOrderDetail} />
        <Route path='/account/MerchantOrders' component={MerchantOrders} />
        <Route path='/account' component={AccountPage} />
        <Route path='/user/:id' component={UserPage} />

        <Route path='/item/shoppingcart' component={ShoppingCartPage} />
        <Route path='/item/newarrival' component={NewArrivalPage} />
        <Route path='/item/search' component={SearchPage} />
        <Route path='/item/:id/update' component={ItemUpdatePage} />
        <Route path='/item/:id' component={ItemPage} />

        <Route path='/tag/:id' component={TagPage} />
        <Route path='/chat' component={ChatPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
