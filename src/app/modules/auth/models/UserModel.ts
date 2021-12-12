import {AuthModel} from './AuthModel'
import {UserAddressModel} from './UserAddressModel'
import {UserCommunicationModel} from './UserCommunicationModel'
import {UserEmailSettingsModel} from './UserEmailSettingsModel'
import {UserSocialNetworksModel} from './UserSocialNetworksModel'

export interface UserModel {
  id: number
  name: string
  password: string | undefined
  email: string
  phone?: string
  roles?: Array<number>
  pic?: string
  auth?: AuthModel
  address?: UserAddressModel
}
