import { useAnswers } from '@/hooks/email-marketing/use-marketing'
import React from 'react'
import { Loader } from '../loader'
import { Card, CardDescription } from '../ui/card'

type Props = {
  id?: string
}

const Answers = ({ id }: Props) => {
  if (!id) {
    return (
      <Card className="p-5 text-center">
        <CardDescription>No customer selected</CardDescription>
      </Card>
    )
  }

  const { answers, loading, error } = useAnswers(id)

  if (error) {
    return (
      <Card className="p-5 text-center text-red-500">
        <CardDescription>{error}</CardDescription>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-5 mt-10">
      <Loader loading={loading}>
        {answers.length === 0 ? (
          <Card className="p-5 text-center">
            <CardDescription>No answers found</CardDescription>
          </Card>
        ) : (
          answers.map((answer) =>
            answer.customer.map(
              (customer) =>
                customer.questions.length > 0 &&
                customer.questions.map((question, key) => (
                  <Card key={key} className="p-5">
                    <p className="font-semibold mb-2">{question.question}</p>
                    <CardDescription>
                      {question.answered || 'No answer provided'}
                    </CardDescription>
                  </Card>
                ))
            )
          )
        )}
      </Loader>
    </div>
  )
}

export default Answers
