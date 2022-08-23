import styles from './EachQuest.module.css'
import TimeAgo from 'timeago-react'
import UserHeader from 'src/components/UserHeader/UserHeader'
import returnUserById from 'src/services/returnUserById'
import StartButton from 'src/components/Buttons/StartButton/StartButton'
import { useRouter } from 'next/router'
import UserHeaderLoading from 'src/components/UserHeader/UserHeaderLoading'
import { AiOutlineCalendar } from 'react-icons/ai'

//
export default function EachQuest ({ collection }) {
  const router = useRouter()

  const {
    ID,
    title,
    creator_id: creatorId,
    date_creation: dateCreation,
    likes,
    tags
  } = collection
  // const tagsArray = JSON.parse(tags)
  const user = returnUserById(creatorId)
  return (
    <>
      <section className={styles.section}>
        {user
          ? (
          <UserHeader
            name={user.userName}
            image={`https://api.multiavatar.com/${user.userName}.svg`}
            likes={likes}
          />
            )
          : (
          <UserHeaderLoading />
            )}

        <div>
          <h3 className={styles.title}>{title}</h3>

          <p>
            <span>
              <AiOutlineCalendar />
              {'Created '}
              <TimeAgo datetime={dateCreation} locale="es.ts" />
            </span>
          </p>
          <div className={styles.tags}>
            {/* {tags &&
              tagsArray.map((tag, index) => (
                <span
                  className={styles.tag}
                  key={index}
                  style={{
                    color: colors.white,
                    backgroundColor: colors.primary
                  }}
                >
                  {tag}
                </span>
              ))} */}
          </div>
        </div>
        <div onClick={() => router.push('/Quest/[id]', `/Quest/${ID}`)}>
          <StartButton />
        </div>
      </section>
    </>
  )
}
