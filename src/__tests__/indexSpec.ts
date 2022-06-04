import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Test basic endpoint server', () => {
  it('should return Hello World', async () => {
    const response = await request.get('/')
  })
})
