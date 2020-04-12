import * as request from "supertest"
import app from '../../app'

describe("auth", () => {
  test('access', async () => {
    const res = await request(app).get('/auth/access')
    expect(res.status).toEqual(200)
  })

  test("refresh", async () => {
    const resAuth = await request(app).get('/auth/access')
    const token = resAuth.body
    const res = await request(app)
      .get('/auth/refresh')
      .set('Authorization', token)
    expect(res.status).toBe(200)
  });
});
