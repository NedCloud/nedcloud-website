'use client'

import { useState } from 'react'
import { Key, User, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function SettingsManager({ initialUser }: { initialUser: { name: string | null; email: string } }) {
  const [user, setUser] = useState(initialUser)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleUpdateName = async () => {
    if (!user.name) return
    
    setIsSaving(true)
    setMessage(null)
    
    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user.name }),
      })
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Name updated successfully!' })
      } else {
        setMessage({ type: 'error', text: 'Failed to update name' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to update name' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }
    
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' })
      return
    }
    
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/user/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to change password' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to change password' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-neon-green/10 text-neon-green' : 'bg-red-500/10 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User size={20} />
          Profile
        </h2>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 bg-dark-700/30 border border-dark-600 rounded-lg text-gray-400 cursor-not-allowed"
            />
            <p className="text-gray-500 text-sm mt-1">Email cannot be changed</p>
          </div>
          
          <Input
            label="Name"
            value={user.name || ''}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Your name"
          />
          
          <Button variant="primary" onClick={handleUpdateName} isLoading={isSaving}>
            <Save size={16} className="mr-2" />
            Save Name
          </Button>
        </div>
      </div>

      <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Key size={20} />
          Change Password
        </h2>
        
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            required
          />
          
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
          
          <Button type="submit" variant="primary" isLoading={isSaving}>
            <Key size={16} className="mr-2" />
            Change Password
          </Button>
        </form>
      </div>
    </div>
  )
}