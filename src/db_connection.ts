import { Collection, Db, MongoClient } from 'mongodb';

const mongoOptions = { useUnifiedTopology: true }

export class MongoDBConnection{
  private _client: MongoClient;
  private database: Db | undefined;

  constructor(mongoURI: string) {
    this._client = new MongoClient(mongoURI, mongoOptions);
  }

  async init(dbName?: string) {
    try {
      await this._client.connect();
      this.database = this._client.db(dbName);
    } catch (error) {
      throw error;
    }
  }

  async getCollection(collectionName: string): Promise<Collection<any>> {
    try {
      await this._client.connect();
      if (this.database) {
        return this.database.collection(collectionName)
      }
      throw new Error('No existing database connection');
    } catch (error) {
      throw error;
    }
  }

  async closeConnection() {
    await this._client.close();
  }
}
