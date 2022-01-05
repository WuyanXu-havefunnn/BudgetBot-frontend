import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { VictoryPie } from 'victory-pie'
import { QUERIES } from '../lib/constants'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'

export default function HomePage({}) {
  const [duration, setDuration] = useState('day')
  const [categoryData, setCategoryData] = useState([])

  // { delay: 500 } → wait 500 milliseconds to display the spinner
  // { delay: 500 } to prevent flickering when the component is loaded on high-speed connections.

  // doc: function usePromiseTracker(outerConfig? : Config) : { promiseInProgress : boolean }
  const { promiseInProgress } = usePromiseTracker({ delay: 500 })
  // setTimeOut to implement myself
  const loadDataFromBackend = async () => {
    const response = await fetch(`/api/expenses/${duration}`)
    const categoryDataFromBackend = await response.json()
    setCategoryData(categoryDataFromBackend)
  }

  useEffect(() => {
    // will return the promise it's tracking
    trackPromise(loadDataFromBackend())
  }, [duration])

  return (
    <Wrapper>
      <HeadingContainer>
        <Heading>Hi Tracy 🙂</Heading>
        <Heading>
          Check out your expense chart for the <TimeVar>{duration}</TimeVar> !
        </Heading>
      </HeadingContainer>
      <Pie>
        {promiseInProgress ? (
          <p>'🐌 loading...'</p>
        ) : (
          <div>
            {categoryData.length === 0 ? (
              <Message>
                Oops! No expense to display for the {duration} 🤪
              </Message>
            ) : (
              <VictoryPie
                data={categoryData}
                colorScale={[
                  '#9bf6ff',
                  '#ffc6ff',
                  '#bdb2ff',
                  '#caffbf',
                  '#ffd6a5',
                ]}
                radius={100}
                width={410}
                style={{
                  data: {
                    fillOpacity: 0.9,
                    stroke: 'white',
                    strokeWidth: 2,
                  },
                  labels: {
                    fontSize: 14,
                  },
                }}
              />
            )}
          </div>
        )}
      </Pie>

      <ButtonGroup>
        <Button
          highlighted={duration === 'day'}
          onClick={() => setDuration('day')}
        >
          Day
        </Button>
        <Button
          highlighted={duration === 'week'}
          onClick={() => setDuration('week')}
        >
          Week
        </Button>
        <Button
          highlighted={duration === 'month'}
          onClick={() => setDuration('month')}
        >
          Month
        </Button>
      </ButtonGroup>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 80px 0;
  position: relative;
  overflow: none;

  @media ${QUERIES.tabletAndBigger} {
    padding: 100px;
  }
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 40px;
`

const Heading = styled.h1`
  font-family: var(--font-sans-serif);
  font-size: 1rem;
  letter-spacing: 1px;
`
const TimeVar = styled.span`
  font-family: var(--font-cursive);
  font-size: ${20 / 16}rem;
  text-transform: uppercase;
  color: #c3500c;
`

const Message = styled.p`
  padding: 60px 40px;
`

const Pie = styled.div`
  font-family: var(--font-sans-serif);
  padding-right: 10px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 30px;
  position: absolute;
  top: 500px;
  @media ${QUERIES.phoneAndBigger} {
    top: 600px;
    gap: 50px;
  }
`

const Button = styled.button`
  background-color: ${({ highlighted }) =>
    highlighted ? '#ffd60a' : '#c2fbd7'};
  border-radius: 100px;
  color: ${({ highlighted }) => (highlighted ? '#a63c06' : 'green')};
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: #ffd60a;
    color: #a63c06;
    transform: scale(1.05) rotate(-1deg);
  }
`
