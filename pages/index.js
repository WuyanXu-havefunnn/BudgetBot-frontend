import styled from 'styled-components'
import Airtable from 'airtable'
import { useEffect, useState } from 'react'
import { VictoryPie } from 'victory-pie'
import { QUERIES } from '../lib/constants'

var base = new Airtable({ apiKey: 'keyP1SbuDuLo1qPhM' }).base(
  'appuSqLyneHIkdtvH',
)

const today = new Date()
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
yesterday.setHours(0, 0, 0, 0)

const dateAWeekAgo = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
)

const dateAMonthAgo = new Date(
  today.getFullYear(),
  today.getMonth() - 1,
  today.getDate(),
)

const filterByDuration = (duration) => {
  if (duration === 'day') {
    return `IS_AFTER({DATE}, '${yesterday}')`
  }
  if (duration === 'week') {
    return `IF(AND(IS_AFTER({DATE}, '${dateAWeekAgo}'), IS_BEFORE({DATE}, '${today}')), 1, 0)`
  }
  if (duration === 'month') {
    return `IF(AND(IS_AFTER({DATE}, '${dateAMonthAgo}'), IS_BEFORE({DATE}, '${today}')), 1, 0)`
  }
}

const getSum = (records) => {
  if (records.length > 0) {
    const sum = records.reduce(
      (currentSum, record) => currentSum + record.fields.Amount,
      0,
    )
    return sum
  } else {
    return 0
  }
}

const getPercentage = (sumAll, sumCategory) => {
  return Math.round((sumCategory / sumAll) * 100)
}

const getTotalOfEachCategory = (allRecordsForDuration) => {
  let totalOfCategory = {
    Food: 0,
    Transportation: 0,
    Other: 0,
    Shopping: 0,
    Lodging: 0,
  }

  for (const record of allRecordsForDuration) {
    const category = record.fields.Category
    const amount = Math.round(record.fields.Amount)
    if (category === 'Food') {
      totalOfCategory['Food'] += amount
    } else if (category === 'Transportation') {
      totalOfCategory['Transportation'] += amount
    } else if (category === 'Other') {
      totalOfCategory['Other'] += amount
    } else if (category === 'Lodging') {
      totalOfCategory['Lodging'] += amount
    } else if (category == 'Shopping') {
      totalOfCategory['Shopping'] += amount
    }
  }
  return totalOfCategory
}

const getPercetageOfEachCategory = (allRecordsForDuration) => {
  let categoryWithPercentage = {}

  const sumOfAllRecords = getSum(allRecordsForDuration)

  const totalOfCategory = getTotalOfEachCategory(allRecordsForDuration)

  for (const category in totalOfCategory) {
    const sumOfCategory = totalOfCategory[category]

    categoryWithPercentage[category] = getPercentage(
      sumOfAllRecords,
      sumOfCategory,
    )
  }

  return categoryWithPercentage
}

const getAllRecordsForDuration = async (duration) => {
  const formula = filterByDuration(duration)
  console.log({ formula })

  const allRecordsForDuration = await base('Expenses')
    .select({
      fields: ['Amount', 'Date', 'Category'],
      filterByFormula: formula,
    })
    .all()

  return allRecordsForDuration
}

export default function HomePage({}) {
  const [duration, setDuration] = useState('day')
  const [allRecords, setAllRecords] = useState([])

  useEffect(async () => {
    const records = await getAllRecordsForDuration(duration)
    setAllRecords(records)
  }, [duration])

  const categoryExpense = getTotalOfEachCategory(allRecords)

  const categoryPercentage = getPercetageOfEachCategory(allRecords)

  const myData = []
  for (const category in categoryExpense) {
    if (categoryExpense[category] > 0) {
      myData.push({
        x: `${category}
          $${categoryExpense[category]}`,
        y: categoryPercentage[category],
      })
    }
  }

  return (
    <Wrapper>
      <HeadingContainer>
        <Heading>Hi Wuyan 🙂</Heading>
        <Heading>
          Check out your expense chart for the <TimeVar>{duration}</TimeVar> !
        </Heading>
      </HeadingContainer>
      <Pie>
        {myData.length === 0 ? (
          <p>It seems like there is no expense to display 🤪</p>
        ) : (
          <VictoryPie
            data={myData}
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
    box-shadow: rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,
      rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,
      rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px,
      rgba(44, 187, 99, 0.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }
`
