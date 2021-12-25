import React from 'react'
import {PhoneVerify} from './cards/PhoneVerify'
import {ProfileDetails} from './cards/ProfileDetails'
import {SignInMethod} from './cards/SignInMethod'
// import {ConnectedAccounts} from './cards/ConnectedAccounts'
// import {EmailPreferences} from './cards/EmailPreferences'
// import {Notifications} from './cards/Notifications'
// import {DeactivateAccount} from './cards/DeactivateAccount'

export function Settings() {
  return (
    <>
      <ProfileDetails />
      <SignInMethod />
      <PhoneVerify />
      {/*<ConnectedAccounts />
      <EmailPreferences />
      <Notifications />
      <DeactivateAccount />*/}
    </>
  )
}
