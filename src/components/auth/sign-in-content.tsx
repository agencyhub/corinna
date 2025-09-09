'use client'

import SignInFormProvider from '@/components/forms/sign-in/form-provider';
import LoginForm from '@/components/forms/sign-in/login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SignInContent() {
  // Conteúdo em português
  const t = {
    signIn: "Entrar",
    dontHaveAccount: "Não tem uma conta?",
    createAccount: "Criar conta",
    forgotPassword: "Esqueci minha senha"
  }

  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignInFormProvider>
          <div className="flex flex-col gap-3">
            <LoginForm />
            <div className="w-full flex flex-col gap-3 items-center">
              <Button
                type="submit"
                className="w-full"
              >
                {t.signIn}
              </Button>
              <p>
                {t.dontHaveAccount}{' '}
                <Link
                  href="/auth/sign-up"
                  className="font-bold"
                >
                  {t.createAccount}
                </Link>
              </p>
              <p>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {t.forgotPassword}
                </Link>
              </p>
            </div>
          </div>
        </SignInFormProvider>
      </div>
    </div>
  )
}
