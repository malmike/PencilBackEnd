import { Router } from "express";
import { topicQuestionQuery } from "../queries/questionQueries";
import { MongoDBConnection } from "../db_connection";

const questionRoutes = (mongodb: MongoDBConnection) => {
  const questionRouter = Router();

  questionRouter.get('/', async (request, response) => {
    try {
      await mongodb.init();
      const queryString = request.query.q;
      if (typeof queryString !== 'string') throw Error('Incorrect Search Query')
      const topic = queryString.replace(/\"|\'/g, "").trim();
      const collection = await mongodb.getCollection('topics');
      const result = await collection.aggregate(topicQuestionQuery(topic));
      const questions = await result.toArray();
      return response.status(200).json(questions);
    } catch (error) {
      if (error.message === 'Incorrect Search Query')
        return response.status(400).json(error.message);
      return response.status(500).json(error);
    } finally {
      await mongodb.closeConnection();
    }
  })

  return questionRouter;
}

export default questionRoutes;


