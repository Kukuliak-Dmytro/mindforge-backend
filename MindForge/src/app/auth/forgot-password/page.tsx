'use client'

import { useState } from 'react'
import Link from 'next/link'
import { resetPassword } from '../actions'
import { PrimaryButton } from '@/components/ui/button'
import { InputText } from '@/components/ui/input-text'

export default function ResetPasswordPage() {
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await resetPassword(formData)
    
    if (result?.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ 
        type: 'success', 
        text: 'Перевірте вашу електронну пошту для отримання посилання на скидання паролю' 
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-white-bg)]">
      <div className="max-w-md w-full space-y-8 p-8 bg-[var(--color-white-fg)] rounded-[var(--radius-medium)] shadow-[var(--shadow-medium)]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-rich-black)]">
            Скидання паролю
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--color-dark-gray)]">
            Введіть вашу електронну пошту, і ми надішлемо вам посилання для скидання паролю
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {message && (
            <div className={`px-4 py-3 rounded-[var(--radius-small)] ${
              message.type === 'error' 
                ? 'bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-[var(--color-danger)]' 
                : 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)]'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <InputText
              id="email"
              name="email"
              title="Електронна пошта"
              placeholder="Введіть вашу електронну пошту"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <PrimaryButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Завантаження...' : 'Надіслати посилання'}
            </PrimaryButton>

            <div className="text-center text-sm">
              <Link 
                href="/auth/login" 
                className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)]/80"
              >
                Повернутися до входу
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 