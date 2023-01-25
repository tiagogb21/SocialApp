import { IUser } from "../../@types/interfaces/IUser"

let userMock1: IUser = {
  name: 'John Doe',
  username: 'john.doe',
  email: 'john.doe@example.com',
  confirm: {
    password: '123456',
    passwordConfirmation: '123456',
  },
  photo: '',
  isActive: false,
  token: '',
  hash: '',
}

let userMock2: IUser = {
  name: 'Jane Doe',
  username: 'jane.doe',
  email: 'jane.doe@example.com',
  confirm: {
    password: 'abcdef',
    passwordConfirmation: 'abcdef',
  },
  photo: '',
  isActive: false,
  token: '',
  hash: '',
}

const userMockWithId: IUser & {_id: string} = {
  _id: "4edd40c86762e0fb12000003",
  ...userMock1,
}

const usersMockArray: IUser[] = [
  {...userMock1},
  {...userMock2},
]

export { userMock1, userMockWithId, usersMockArray};
