import QuestGallery from 'src/components/QuestGallery/QuestGallery'
import Logo from 'src/components/Logo/Logo'
import useLocalStorage from 'src/hooks/getUserFromLocalStorage'

// pannel
import SignInPannel from 'src/components/Layout/Pannel/SignInPannel'
import Intro from 'src/components/Layout/Intro'
import WellcomeBack from 'src/components/Layout/Pannel/WellcomeBack'

export default function BodyComponent ({ collections }: any) {
  const { con } = useLocalStorage()
  const { status, user } = con
  return (
    <section>
      <Intro>
        <Logo />
        {status !== 1 && <SignInPannel />}
        {status === 1 && <WellcomeBack user={user} />}
      </Intro>

      <p>New Collections: </p>
      <QuestGallery collections={collections} />
    </section>
  )
}
