'use client'

import { useState } from 'react'
import { updatePassword } from '../actions'

export default function UpdatePasswordPage() {
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await updatePassword(formData)
    
    if (result?.error) {
      setMessage({ type: 'error', text: result.error })
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Update Password</h1>
        <p className="text-sm text-gray-600">
          Enter your new password below.
        </p>
      </div>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-6 text-foreground"
        action={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="password">
            New Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded-md ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          className="bg-blue-700 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-blue-800"
          type="submit"
        >
          Update Password
        </button>
      </form>
    </div>
  )
} 