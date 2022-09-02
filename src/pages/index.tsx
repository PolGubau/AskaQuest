import BodyComponent from 'src/components/BodyComponent/BodyComponent'
import AppLayout from 'src/components/Layout/AppLayout'
import Nav from 'src/components/Nav'
import { CollectionInterface } from 'src/interfaces/Collection'
import PATH from 'src/utils/path'

export default function HomePage ({
  collections
}: {
  collections: CollectionInterface[]
}): JSX.Element {
  return (
    <>
      <Nav navigatable={false}/>
      <AppLayout>
        <main className="main">
          <BodyComponent collections={collections} />
        </main>
      </AppLayout>
    </>
  )
}

export async function getStaticProps (): Promise<{
  props: {
    collections: CollectionInterface[]
  }
}> {
  const collections = await fetch(PATH.API.ALL_COLLECTIONS).then(
    async (res) => await res.json()
  )
  return { props: { collections } }
}
