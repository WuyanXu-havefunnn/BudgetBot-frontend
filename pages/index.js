import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { VictoryPie } from 'victory-pie'
import { QUERIES } from '../lib/constants'

export default function HomePage({}) {
  const [duration, setDuration] = useState('day')
  const [categoryData, setCategoryData] = useState({})

  useEffect(async () => {
    const response = await fetch(`/api/expenses/${duration}`)
    const categoryDataFromBackend = await response.json()

    setCategoryData(categoryDataFromBackend)
  }, [duration])

  return (
    <Wrapper>
      <HeadingContainer>
        <Heading>Hi Wuyan 🙂</Heading>
        <Heading>
          Check out your expense chart for the <TimeVar>{duration}</TimeVar> !
        </Heading>
      </HeadingContainer>
      <Pie>
        {categoryData.length === 0 ? (
          <p>It seems like there is no expense to display 🤪</p>
        ) : (
          <VictoryPie
            data={categoryData}
            colorScale={['#9bf6ff', '#ffc6ff', '#bdb2ff', '#caffbf', '#ffd6a5']}
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
      </Pie>
      <ButtonGroup>
        <Button onClick={() => setDuration('day')}>Day</Button>
        <Button onClick={() => setDuration('week')}>Week</Button>
        <Button onClick={() => setDuration('month')}>Month</Button>
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
  padding: 40px;
  gap: 60px;
  position: relative;

  @media ${QUERIES.tabletAndBigger} {
    padding: 100px;
  }
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  color: #a63c06;
`

const Pie = styled.div`
  font-family: var(--font-sans-serif);
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 30px;
  position: absolute;
  top: 550px;
  @media ${QUERIES.tabletAndBigger} {
    top: 650px;
    gap: 50px;
  }
`

const Button = styled.button`
  background-color: #c2fbd7;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
    rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
    rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
    rgba(44, 187, 99, 0.15) 0 16px 32px;
  color: green;
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
    box-shadow: rgba(255, 214, 10, 0.35) 0 -25px 18px -14px inset,
      rgba(255, 214, 10, 0.25) 0 1px 2px, rgba(255, 214, 10, 0.25) 0 2px 4px,
      rgba(255, 214, 10, 0.25) 0 4px 8px, rgba(255, 214, 10, 0.25) 0 8px 16px,
      rgba(255, 214, 10, 0.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }

  &:focus {
    background-color: #ffd60a;
    color: #a63c06;
    box-shadow: rgba(255, 214, 10, 0.35) 0 -25px 18px -14px inset,
      rgba(255, 214, 10, 0.25) 0 1px 2px, rgba(255, 214, 10, 0.25) 0 2px 4px,
      rgba(255, 214, 10, 0.25) 0 4px 8px, rgba(255, 214, 10, 0.25) 0 8px 16px,
      rgba(255, 214, 10, 0.25) 0 16px 32px;
  }
`
