import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contact/route'
import { prisma } from '@/lib/prisma'
import { logAPIRequest } from '@/lib/security-logger'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    contactSubmission: {
      create: jest.fn(),
    },
  },
}))

jest.mock('@/lib/security-logger', () => ({
  logAPIRequest: jest.fn(),
  logFormSubmission: jest.fn(),
}))

describe('Contact API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates contact submission with valid data', async () => {
    const contactData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message',
    }

    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    })

    const response = await POST(req)
    expect(response.status).toBe(201)
  })

  it('returns 400 for missing required fields', async () => {
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
      }),
    })

    const response = await POST(req)
    expect(response.status).toBe(400)
  })

  it('returns 400 for invalid email', async () => {
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test',
        message: 'Message',
      }),
    })

    const response = await POST(req)
    expect(response.status).toBe(400)
  })

  it('trims whitespace from inputs', async () => {
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '  John Doe  ',
        email: 'john@example.com',
        subject: '  Test  ',
        message: '  Message  ',
      }),
    })

    const response = await POST(req)
    expect(response.status).toBe(201)
  })
})
