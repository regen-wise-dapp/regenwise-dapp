import Cors from 'cors';
import { Polybase } from '@polybase/client';
import { ResponseError } from '@src/models/ResponseError';
import { NextApiRequest, NextApiResponse } from 'next';
import { Concept } from '@src/models/concept';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Concept[] | ResponseError>
) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const db = new Polybase({
    defaultNamespace: 'regenwise-regen-db',
  });

  const concepCollectionData = (await db.collection('RegenConcept').get()).data;

  let concepts: Concept[] = concepCollectionData.map((concept) => {
    {
      return { ...concept.data, parentConceptsObjects: [] };
    }
  });

  const conceptsParentConceptsGetObjectsFunction = async () => {
    concepts.forEach((concept) => {
      let parentConceptObjects: any = concepts.filter((item) =>
        structuredClone(concept.parentConcepts).includes(item.id)
      );
      concept.parentConceptsObjects = structuredClone(parentConceptObjects);
    });

    concepts
      ? res.status(200).json(concepts)
      : res.status(404).json({ message: `Projects not found.` });
  };

  await conceptsParentConceptsGetObjectsFunction();
}
