import { Collection, MongoClient } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  connection: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },

  async disconnect(): Promise<void> {
    await this.connection.close()
  },

  getCollection(name: string): Collection {
    return this.connection.db().collection(name)
  },

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return { ...collectionWithoutId, id: _id }
  },
}
