import { NextRequest } from 'next/server'
import { GET } from '@/app/api/2fa/status/route'
import { POST as setupHandler } from '@/app/api/2fa/setup/route'
import { POST as verifyHandler } from '@/app/api/2fa/verify/route'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/auth')
jest.mock('@/lib/prisma')
jest.mock('@/lib/rateLimit', () => ({
  rateLimit: () => async () => null,
}))

describe('2FA API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/2fa/status', () => {
    it('returns 401 when not authenticated', async () => {
      (auth as jest.Mock).mockResolvedValue(null)

      const req = new NextRequest('http://localhost:3000/api/2fa/status')
      const response = await GET(req)
      expect(response.status).toBe(401)
    })

    it('returns 2FA status for authenticated user', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'user-123' } })
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
        twoFactorEnabled: true,
        twoFactorVerifiedAt: new Date('2024-01-01'),
      })

      const req = new NextRequest('http://localhost:3000/api/2fa/status')
      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.enabled).toBe(true)
    })
  })

  describe('POST /api/2fa/setup', () => {
    it('returns 401 when not authenticated', async () => {
      (auth as jest.Mock).mockResolvedValue(null)

      const req = new NextRequest('http://localhost:3000/api/2fa/setup', {
        method: 'POST',
      })
      const response = await setupHandler(req)
      expect(response.status).toBe(401)
    })

    it('returns 400 if 2FA already enabled', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'user-123', email: 'test@example.com' } })
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
        twoFactorEnabled: true,
      })

      const req = new NextRequest('http://localhost:3000/api/2fa/setup', {
        method: 'POST',
      })
      const response = await setupHandler(req)
      expect(response.status).toBe(400)
    })
  })
})
