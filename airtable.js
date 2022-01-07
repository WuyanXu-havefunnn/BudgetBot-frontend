import Airtable from 'airtable'

export const AirtableBase = new Airtable({ apiKey: process.env.API_KEY }).base(
  process.env.BASE_ID,
)
