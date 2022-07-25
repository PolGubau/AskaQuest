import Question from '@c/Question'
import { PATH } from '@s/consts'
import { useRouter } from 'next/router'
import AppLayout from '@c/AppLayout'
export default function singleQuestionPage({ quests }) {
  const router = useRouter()
  const { id } = router.query

  // find the question with the id in the url
  const quest = quests.find((quest) => quest.id === id)
  return (
    <>
      <AppLayout>
        <Question
          key={quest.id}
          id={quest.id}
          title={quest.title}
          answers={quest.answers}
          solution={quest.solution}
          creator={quest.creator}
          createdAt={quest.createdAt}
          likes={quest.likes}
          incorrect={quest.incorrect}
        />
      </AppLayout>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${PATH}/api/quests`)
  const quests = await res.json()
  console.log(quests)
  return { props: { quests } }
}
