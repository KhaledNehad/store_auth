import db from '../database'
import User from '../types/user.type'

class UserModel {
  //! create a new user
  async createUser(u: User): Promise<User> {
    try {
      // open connection with the database
      const connection = await db.connect()
      const sql =
        'INSERT INTO users (email, username, firstName, lastName, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, firstName, lastName'
      // run the query
      const result = await connection.query(sql, [
        u.email,
        u.username,
        u.firstName,
        u.lastName,
        u.password,
      ])
      // release the connection
      connection.release()
      // return the result
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Unable to create user (${u.username}) : ${error as Error}.message`
      )
    }
  }
  //! get all users
  async getUsers(): Promise<User[]> {
    try {
      // open connection with the database
      const connection = await db.connect()
      const sql = 'SELECT * FROM users'
      // run the query
      const result = await connection.query(sql)
      // release the connection
      connection.release()
      console.log('getAll')
      // return the result
      return result.rows
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`)
    }
  }
  //! get a specific user
  async getUser(id: string): Promise<User> {
    try {
      // open connection with the database
      const connection = await db.connect()
      const sql =
        'SELECT id, email, username, firstName, lastName FROM users WHERE id = ($1)'
      // run the query
      const result = await connection.query(sql, [id])
      // release the connection
      connection.release()
      // return the result
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to find user : ${error as Error}.message`)
    }
  }
  //! update a user
  async updateUser(u: User): Promise<User> {
    try {
      // open connection with the database
      const connection = await db.connect()
      const sql =
        'UPDATE users SET email = $1, username = $2, firstName = $3, lastName = $4, password = $5 WHERE id = $6 RETURNING id, email, username, firstName, lastName'
      // run the query
      const result = await connection.query(sql, [
        u.email,
        u.username,
        u.firstName,
        u.lastName,
        u.password,
        u.id,
      ])
      // release the connection
      connection.release()
      // return the result
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update user : ${error as Error}.message`)
    }
  }
  //! delete a user
  async deleteUser(id: string): Promise<User> {
    try {
      // open connection with the database
      const connection = await db.connect()
      const sql =
        'DELETE FROM users WHERE id = $1 RETURNING id, email, username, firstName, lastName'
      // run the query
      const result = await connection.query(sql, [id])
      // release the connection
      connection.release()
      // return the result
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete user : ${error as Error}.message`)
    }
  }
  //! authenticate a user
}

export default UserModel
