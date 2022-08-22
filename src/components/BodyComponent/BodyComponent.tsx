import QuestGallery from "src/components/Quests/QuestGallery";
import Logo from "src/components/Logo/Logo";
import useLocalStorage from "src/hooks/useLocalStorage";

// pannel
import SignInPannel from "src/components/Pannel/SignInPannel";
import Intro from "src/components/Layout/Intro";
import WellcomeBack from "src/components/Pannel/WellcomeBack";

export default function BodyComponent({ collections }: any) {
  const { con } = useLocalStorage("user");
  const { status, data } = con;
  return (
    <section>
      <Intro>
        <Logo />
        {status !== 1 && <SignInPannel />}
        {status === 1 && <WellcomeBack user={data} />}
      </Intro>

      <p>New Collections: </p>
      <QuestGallery collections={collections} />
    </section>
  );
}
