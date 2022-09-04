import styles from './EachQuest.module.css'
import TimeAgo from 'timeago-react'
import UserHeader from 'src/components/UserHeader/UserHeader'
import returnObjectById from 'src/services/returnObjectById'
import StartButton from 'src/components/Buttons/StartButton/StartButton'
import UserHeaderLoading from 'src/components/UserHeader/UserHeaderLoading'
import { AiOutlineCalendar } from 'react-icons/ai'
import { CollectionInterface } from 'src/interfaces/Collection'
import LikesQuest from './LikesQuest/LikesQuest'
import UserInterface from 'src/interfaces/user'
import PATH from 'src/utils/path'
import Link from 'next/link'

//
export default function EachQuest ({
  collection,
  userLoged,
  extraInfo = { times: 0, id: 0, per: 0 }
}: {
  collection: CollectionInterface
  userLoged: UserInterface | undefined
  extraInfo: {times: number, id: number, per: number}
}) {
  const {
    ID,
    title,
    creator_id: creatorId,
    date_creation: dateCreation,
    tags
  } = collection

  const tagsArray = tags ? JSON.parse(tags) : []
  const user = returnObjectById(PATH.API.USER_BY_ID, creatorId)
  const { data, status } = user

  return (
    <>
      <Link href="/Quest/[id]" as={`/Quest/${ID}`}>
        <section className={styles.section}>
          <div className={styles.header}>
            {status === 'success'
              ? (
              <UserHeader
                name={data.userName}
                image={`https://api.multiavatar.com/${data.userName}.svg`}
                searchById={{ state: false, id: '' }}
                you={false}
                size={40}
              />
                )
              : (
              <UserHeaderLoading />
                )}
                <div className={styles.rightHeader}>
            <LikesQuest collection={collection} />
            {extraInfo.times > 0 && (
              <div className={styles.times}>
                <p>Played {extraInfo.times} times</p>
                </div>
            )}
            </div>
          </div>
          <div>
            <h3 className={styles.title}>{title}</h3>

            <p>
              <span>
                <AiOutlineCalendar />
                {'Created '}
                {dateCreation && (
                  <TimeAgo datetime={dateCreation} locale="es.ts" />
                )}
              </span>
            </p>
            <div className={styles.tags}>
              {tags &&
                tagsArray.map((tag: string, index: string) => (
                  <span className={styles.tag} key={index}>
                    {tag}
                  </span>
                ))}
            </div>
          </div>
          <Link href="/Quest/[id]" as={`/Quest/${ID}`}>
            <a>
              <StartButton />
            </a>
          </Link>
        </section>
      </Link>
    </>
  )
}
