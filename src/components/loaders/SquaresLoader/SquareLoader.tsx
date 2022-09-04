import styles from './squaresLoader.module.css'
import styled from 'styled-components'

export default function SquareLoader ({
  squaresColor = '#0270e1',
  count = 3,
  size = 30
}: {
  squaresColor?: string
  count?: number
  size?: number
}) {
  const Loader = styled.div`
    size: ${size}px;
    display: flex;
    gap: 0.8rem;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
`
  const Box = styled.div`
  border-radius: 10%;
  width: ${size}px;
  height: ${size}px;
  animation: rotate 2s infinite;
  background-color: ${squaresColor};
`
  return (
    <>
      <Loader>
        {[...Array(count)].map((_, i) => (
          <Box
          key={i}
          className={styles.box}
        ></Box>
        ))}

      </Loader>
    </>
  )
}
