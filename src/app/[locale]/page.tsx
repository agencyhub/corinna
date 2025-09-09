import Image from 'next/image'
import Link from 'next/link'

interface HomeProps {
  params: { locale: string }
}

export default function Home({ params }: HomeProps) {
  const { locale } = params

  // Conteúdo em português
  const ptContent = {
    badge: "Assistente de vendas com IA",
    title: "Transforme seu atendimento com IA! Incorpore a Corinna AI em qualquer site com apenas um snippet de código!",
    button: "Começar Agora"
  }

  // Conteúdo em inglês
  const enContent = {
    badge: "An AI powered sales assistant chatbot",
    title: "Your AI powered sales assistant! Embed Corinna AI into any website with just a snippet of code!",
    button: "Start For Free"
  }

  // Seleciona o conteúdo baseado no locale
  const content = locale === 'en' ? enContent : ptContent

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="flex items-center justify-center flex-col text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-800 shadow-soft">
              <span className="mr-2">✨</span>
              {content.badge}
            </div>

            <div className="space-y-6">
              <Image
                src="/images/corinna-ai-logo.png"
                width={500}
                height={100}
                alt="Corinna AI Logo"
                className="max-w-xl object-contain mx-auto"
                priority
              />

              <h1 className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {content.title}
              </h1>
            </div>

            <Link href="/dashboard" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-medium hover:shadow-large transition-all duration-200 hover:scale-105 inline-flex items-center">
              {content.button}
            </Link>

            <div className="pt-8">
              <Image
                src="/images/iphonecorinna.png"
                width={400}
                height={300}
                alt="Corinna AI Mobile Preview"
                className="max-w-sm md:max-w-md object-contain mx-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
