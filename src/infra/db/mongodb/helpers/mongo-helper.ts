import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  connection: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },

  async disconnect(): Promise<void> {
    await this.connection.close()
    this.connection = null
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.connection?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.connection.db().collection(name)
  },

  map(data: any): any {
    const { _id, ...collectionWithoutId } = data
    return { ...collectionWithoutId, id: _id }
  },

  mapCollection(collection: any[]): any[] {
    return collection.map(c => MongoHelper.map(c))
  },
}
