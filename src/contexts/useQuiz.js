import { useContext } from 'react'
import { QuizContext } from './QuizContext'

export const useQuiz = () => {
  const context = useContext(QuizContext)

  if (context === undefined) {
    throw new Error('QuizContext was used outside QuizProvider')
  }

  return context
}
