import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Authentication Module', () => {
  describe('Test methods exists', () => {
    it('should have an Authenticate User method', () => {
      expect(userModel.authenticateUser).toBeDefined()
    })
  })

  describe('Test Authentication Logic', () => {
    const user = {
      email: 'test@test.com',
      username: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      password: 'test123',
    } as User

    beforeAll(async () => {
      const createdUser = await userModel.createUser(user)
      user.id = createdUser.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM users;'
      await connection.query(sql)
      connection.release()
    })

    it('Authenticate method should return the authenticated user', async () => {
      const authenticatedUser = await userModel.authenticateUser(
        user.email,
        user.password as string
      )
      expect(authenticatedUser).toBeDefined()
    })

    it('Authenticate method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticateUser(
        'mohammed@elzanaty.com',
        'fake-password'
      )
      expect(authenticatedUser).toBe(null)
    })
  })
})
