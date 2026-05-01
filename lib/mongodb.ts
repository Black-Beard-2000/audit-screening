import { MongoClient, Db } from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}

export async function getDatabase(): Promise<Db> {
  if (db) {
    return db
  }

  if (!client) {
    client = new MongoClient(uri as string)
    await client.connect()
  }

  db = client.db(process.env.MONGODB_DATABASE || 'audit-screening')
  return db
}

export async function closeDatabase() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}
