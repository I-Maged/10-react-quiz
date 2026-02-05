import { useQuiz } from '../contexts/useQuiz'
import Options from './Options'

const Question = () => {
  const { question } = useQuiz()
  // const question = questions[index]

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  )
}

export default Question
