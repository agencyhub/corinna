import ResetPasswordForm from '@/components/forms/sign-in/reset-password-form'
import ResetPasswordProvider from '@/components/forms/sign-in/reset-password-provider'
import Link from 'next/link'

const ResetPasswordPage = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <ResetPasswordProvider>
          <div className="flex flex-col gap-3">
            <ResetPasswordForm />
            <div className="w-full flex flex-col gap-3 items-center">
              <p>
                Remember your password?{' '}
                <Link
                  href="/auth/sign-in"
                  className="font-bold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </ResetPasswordProvider>
      </div>
    </div>
  )
}

export default ResetPasswordPage

