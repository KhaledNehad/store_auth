import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Test basic endpoint server', () => {
  it('should return Hello World', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Hello World 👋 🌍')
  })
})
