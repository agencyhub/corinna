import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

const Layout = async ({ children, params }: Props) => {
  const { locale } = params
  const user = await currentUser()

  if (user) redirect(`/${locale}`)

  // Conteúdo em português
  const ptContent = {
    welcomeMessage: "Olá, eu sou a Corinna, sua assistente de vendas com IA!",
    description: "A Corinna é capaz de capturar informações de leads sem formulário. Isso nunca foi feito antes 😉"
  }

  // Conteúdo em inglês
  const enContent = {
    welcomeMessage: "Hello, I'm Corinna, your AI-powered sales assistant!",
    description: "Corinna can capture lead information without forms. This has never been done before 😉"
  }

  // Seleciona o conteúdo baseado no locale
  const t = locale === 'en' ? enContent : ptContent

  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
        <Image
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '20%',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream  flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          {t.welcomeMessage}
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          {t.description}
        </p>
        <Image
          src="/images/app-ui.png"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="absolute shrink-0 !w-[1600px] top-48"
          width={0}
          height={0}
        />
      </div>
    </div>
  )
}

export default Layout
