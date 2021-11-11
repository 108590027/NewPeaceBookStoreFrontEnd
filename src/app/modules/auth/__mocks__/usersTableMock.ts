import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {UserModel} from '../models/UserModel'

export class UsersTableMock {
  public static table: Array<UserModel> = [
    {
      id: 1,
      name: 'admin',
      password: 'demo',
      email: 'admin@demo.com',
      auth: {
        accessToken: 'access-token-8f3ae836da744329a6f93bf20594b5cc',
        refreshToken: 'access-token-f8c137a2c98743f48b643e71161d90aa',
      },
      roles: [1], // Administrator
      pic: toAbsoluteUrl('/media/avatars/150-2.jpg'),
      phone: '456669067890',
      address: {
        addressLine: 'L-12-20 Vertex, Cybersquare',
        city: 'San Francisco',
        state: 'California',
        postCode: '45000',
      },
    },
  ]
}
