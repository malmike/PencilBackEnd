export const topicQuestionQuery = (queryString: string) => {
  return [
    {
      '$match': {
        '$or': [
          {
            '_id': queryString
          }, {
            'ancestors': queryString
          }
        ]
      }
    }, {
      '$lookup': {
        'from': 'questions',
        'localField': '_id',
        'foreignField': 'annotations',
        'as': 'result'
      }
    }, {
      '$unwind': {
        'path': '$result',
        'preserveNullAndEmptyArrays': false
      }
    }, {
      '$replaceRoot': {
        'newRoot': '$result'
      }
    }
  ]
};
