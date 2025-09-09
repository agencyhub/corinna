import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';

const locales = ['en', 'pt']

export const metadata: Metadata = {
  title: 'Corinna AI - Transform your customer service with AI',
  description: 'Corinna AI is the complete solution to automate conversations, schedule appointments and boost sales with artificial intelligence.',
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl={`/${locale}/auth/sign-in`}
      signUpUrl={`/${locale}/auth/sign-up`}
    >
      <div>
        {children}
      </div>
    </ClerkProvider>
  )
}
