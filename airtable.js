import Airtable from 'airtable'

console.log(process.env.API_KEY)

export const AirtableBase = new Airtable({ apiKey: process.env.API_KEY }).base(
  process.env.BASE_ID,
)
