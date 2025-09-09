import { onGetBlogPosts } from '@/actions/landing'
import NavBar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { pricingCards } from '@/constants/landing-page'
import { getMonthName } from '@/lib/utils'
import clsx from 'clsx'
import parse from 'html-react-parser'
import { ArrowRightCircleIcon, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const posts:
    | {
        id: string
        title: string
        image: string
        content: string
        createdAt: Date
      }[]
    | undefined = await onGetBlogPosts()
  console.log(posts)
  return (
    <main>
      <NavBar />
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="flex items-center justify-center flex-col text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-800 shadow-soft">
              <span className="mr-2">✨</span>
              An AI powered sales assistant chatbot
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
                Your AI powered sales assistant! Embed Corinna AI into any website
                with just a snippet of code!
              </h1>
            </div>

            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-medium hover:shadow-large transition-all duration-200 hover:scale-105">
                Start For Free
                <ArrowRightCircleIcon className="ml-2 h-5 w-5" />
              </Button>
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
      <section className="py-16 lg:py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose what fits you right
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our straightforward pricing plans are tailored to meet your needs. If
              {" you're"} not ready to commit you can get started for free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingCards.map((card) => (
              <Card
                key={card.title}
                className={clsx(
                  'relative flex flex-col justify-between h-full transition-all duration-300 hover:scale-105 hover:shadow-large group',
                  {
                    'border-2 border-orange-500 shadow-glow-soft': card.title === 'Unlimited',
                    'shadow-medium hover:shadow-large': card.title !== 'Unlimited',
                  }
                )}
              >
                {card.title === 'Unlimited' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-orange-600 mb-2">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {pricingCards.find((c) => c.title === card.title)?.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-8">
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">{card.price}</span>
                    <span className="text-lg text-gray-500 ml-2">/ month</span>
                  </div>

                  <div className="space-y-4">
                    {card.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-left"
                      >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <p className="text-gray-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-6">
                  <Link
                    href={`/dashboard?plan=${card.title}`}
                    className={clsx(
                      'w-full text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium',
                      card.title === 'Unlimited'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200'
                    )}
                  >
                    Get Started
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">News Room</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our insights on AI, technology, and optimizing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts &&
              posts.map((post) => (
                <Link
                  href={`/blogs/${post.id}`}
                  key={post.id}
                  className="group"
                >
                  <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-large group-hover:border-orange-200">
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={`${process.env.CLOUDWAYS_UPLOADS_URL}${post.image}`}
                        alt="Blog post featured image"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col flex-grow p-6">
                      <CardDescription className="text-orange-600 font-medium mb-3">
                        {getMonthName(post.createdAt.getMonth())}{' '}
                        {post.createdAt.getDate()} {post.createdAt.getFullYear()}
                      </CardDescription>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <div className="text-gray-600 text-sm leading-relaxed">
                        {parse(post.content.slice(4, 120))}...
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
