import { AirtableBase } from '../../../airtable'

export default async function handler(req, res) {
  const { duration } = req.query

  const records = await getAllRecordsForDuration(duration)
  const categoryExpense = getTotalOfEachCategory(records)

  const categoryPercentage = getPercetageOfEachCategory(records)

  const collectedCategoryData = []
  for (const category in categoryExpense) {
    if (categoryExpense[category] > 0) {
      collectedCategoryData.push({
        x: `${category}
          $${categoryExpense[category]}`,
        y: categoryPercentage[category],
      })
    }
  }
  res.status(200).json(collectedCategoryData)
}

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

const getAllRecordsForDuration = async (duration) => {
  const formula = filterByDuration(duration)

  const allRecordsForDuration = await AirtableBase('Expenses')
    .select({
      fields: ['Amount', 'Date', 'Category'],
      filterByFormula: formula,
    })
    .all()

  return allRecordsForDuration
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
