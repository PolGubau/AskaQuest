import Link from 'next/link'
import { CollectionInterface } from 'src/interfaces/Collection'
import PATH from 'src/utils/path'
import styles from './CollectionMinView.module.css'

export interface CollectionMinViewProps {
  name: string
  collections: CollectionInterface
}

export default function CollectionMinView ({ name, collections }: CollectionMinViewProps) {
  return (
    <Link href={`${PATH.QUEST}/${collections.ID}`}>
        <div className={styles.container}>
            <p className={styles.name}>{name}</p>
        </div>
    </Link>
  )
}
