// user
import PATH from 'src/utils/path'
import AppLayout from 'src/components/Layout/AppLayout'
import QuestGallery from 'src/components/QuestGallery/QuestGallery'
import Nav from 'src/components/Nav'
import Image from 'next/image'
import styles from 'src/styles/stylesPages/profile.module.css'
import UserInterface from 'src/interfaces/User'
import { CollectionInterface } from 'src/interfaces/Collection'
import { GetServerSidePropsContext } from 'next'
import TimeAgo from 'timeago-react'
import Link from 'next/link'
import AddNewButton from 'src/components/Buttons/AddNew/AddNewButton'
import { handleFollow } from 'src/services/handleFollow'
import { useState } from 'react'
import ButtonWithIcon from 'src/components/Buttons/ButtonWithIcon/ButtonWithIcon'
import getUserFromLocalStorage from 'src/hooks/getUserFromLocalStorage'
import ProfileSignInPannel from 'src/components/Layout/ProfilePageFragments/SignInPannel/ProfileSignInPannel'
import ProfileFollowers from 'src/components/Layout/ProfilePageFragments/ProfileFollowers/ProfileFollowers'
import ProfileEditProfile from 'src/components/Layout/ProfilePageFragments/ProfileEditProfile/ProfileEditProfile'

export default function userPage ({
  user,
  collectionsByUser
}: {
  userName: string
  user: UserInterface
  collectionsByUser: CollectionInterface[]
}) {
  let { ID, userName, image, followers, date_creation: dateCreation } = user
  followers = JSON.parse(followers)

  if (typeof followers === 'number') {
    followers = [followers]
  }

  const [isFollowed, setIsFollowed] = useState(false)

  const { con } = getUserFromLocalStorage()

  console.log(con)

  let userLoged: UserInterface | undefined
  if (con.status === 1) {
    userLoged = con.user
  }

  // check if you are this user
  if (userLoged != null) {
    // if there is only 1 follower its transformed to a number, lets pass it to an array
    let followingArray: any[] = JSON.parse(userLoged.following)
    if (typeof followingArray === 'number') {
      followingArray = [followingArray]
    }
    if (userLoged.ID !== ID) {
      const isBeenFollowed: boolean = followingArray.find(
        (following: { ID: number }) => following.ID === Number(user.ID)
      )
      if (isBeenFollowed) {
        setIsFollowed(true)
      }
    }
  }

  const handleFollowCall = async () => {
    if (userLoged != null) {
      handleFollow(user, userLoged, isFollowed, setIsFollowed).catch((err) => {
        console.log(err)
      })
    }
  }

  const dateToAgo = dateCreation ? new Date(dateCreation) : new Date()

  return (
    <>
      <Nav
        actualName={`${userName}'s profile`}
        actualLink={'profile/' + userName}
      />

      <AppLayout>
        <main>
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.heading1}>{userName}</h1>
              {/* Date part */}
              {dateCreation !== 'undefined' && (
              <>
              <p className={styles.timeago}>
                  {'Here since '}
                  <TimeAgo datetime={dateToAgo} locale="es.ts" />
                  {'.'}
                </p>
                </>
              )}
              {/* Pannel for signin */}

              {(userLoged == null) && <ProfileSignInPannel userName={userName} />}

              {/* userLoged is not You */}
              {(userLoged != null) && userLoged?.ID !== ID && (
                <div className={styles.followersContainer}>
                  <div
                    onClick={handleFollowCall}
                    className={styles.followButton}
                  >
                    {isFollowed
                      ? (
                      <ButtonWithIcon icon={'user'} text={'Following'} />
                        )
                      : (
                      <ButtonWithIcon icon={'user'} text={'Follow'} />
                        )}
                  </div>
                </div>
              )}
              {/* If are you, edit button */}
              {userLoged?.ID === ID && (
                <ProfileEditProfile userLoged={userLoged} />
              )}
            </div>
            <div>
              <div className={styles.rightHeader}>
                <ProfileFollowers
                  userName={userName}
                  followers={followers}
                  you={userLoged?.ID === ID}
                />
                <Image
                  className={styles.avatar}
                  alt={`${userName}&apos;s avatar`}
                  src={image ?? `https://api.multiavatar.com/${userName}.svg`}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </header>
          <section>
            {collectionsByUser.length === 0
              ? (
              <p>This user has not created anything 😥</p>
                )
              : (
              <QuestGallery collections={collectionsByUser} />
                )}
            {userLoged?.ID === ID && (
              <Link href={PATH.CREATE_QUEST}>
                <a>
                  <AddNewButton />
                </a>
              </Link>
            )}
          </section>
        </main>
      </AppLayout>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id: userName } = context.query

  const userRes = await fetch(`${PATH.API.USER_BY_USERNAME}/${userName}`)
  const user = await userRes.json()

  const collectionsRes = await fetch(
    `${PATH.API.COLLECTION_BY_USERNAME}/${userName}`
  )
  const collectionsByUser = await collectionsRes.json()

  return { props: { user, collectionsByUser } }
}
