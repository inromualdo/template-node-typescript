import { MongoClient, Db } from 'mongodb';

const url: string = process.env.MONGO_URL || 'mongodb://localhost:27017';

var client = new MongoClient(url, { useNewUrlParser: true });
const dbName = process.env.MONGO_DB_NAME;

let clientdb: Db | undefined;

export const connectDb = async () => {
  try {
    await client.connect()
    clientdb = client.db(dbName)
    console.info("db connected")
  } catch (error) {
    console.error("db connexion error", error);
  }
}

export default () => clientdb;
