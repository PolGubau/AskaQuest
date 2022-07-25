// user
import { PATH } from '@s/consts'
import AppLayout from '@c/AppLayout'
import Head from 'next/head'
import Collections from '@c/Collections/Collections'
import Nav from '@c/Nav'
import usePascalCase from '@h/usePascalCase'

export default function userPage({ user, collectionsMatched }) {
  let { userName, since, avatar } = user

  // using usePascalCase to make the userName pascalCase
  userName = usePascalCase(userName)

  return (
    <>
      <Head>
        <title>{userName}&apos;s Profile / AskaQuest </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav
        actualName={`${userName}'s profile`}
        path={[]}
        actualLink={'profile/' + userName}
      />

      <AppLayout>
        <main>
          <header>
            <div>
              <h1>{userName}</h1>
              <p>Here since {since}</p>
            </div>
            <div>
              <img
                className="avatar"
                alt={`${userName}&apos;s avatar`}
                src={avatar}
              />
            </div>
          </header>
          <section>
            <Collections allCollections={collectionsMatched} />
          </section>
        </main>
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-content: center;
          flex-wrap: wrap;
          flex-direction: row;
          align-items: center;
        }
        .avatar {
          border-radius: 50%;
          width: 100px;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query

  const userRes = await fetch(`${PATH}/api/singleUser/${id}`)
  const user = await userRes.json()
  const collectionIdsByUser = user.collections

  const collectionsRes = await fetch(`${PATH}/api/collections`)
  const collectionsFromDB = await collectionsRes.json()

  // we need to find which collectionsFromDB.id matches with the collectionIdsByUser

  const collectionsMatched = collectionsFromDB.filter((collection) => {
    return collectionIdsByUser.includes(collection.id)
  })

  return { props: { user, collectionsMatched } }
}
