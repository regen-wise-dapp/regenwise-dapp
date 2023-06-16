import { Polybase } from '@polybase/client';
import { ResponseError } from '@src/models/ResponseError';
import { User } from '@src/models/user';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function ProjectHandler(
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  await runMiddleware(req, res, cors);
  const { query } = req;
  const { id } = query;

  const db = new Polybase({ defaultNamespace: 'regenwise-regen-db' });
  const collectionReference = db.collection('user');
  const projectsCollectionReference = db.collection('RegenProject');

  try {
    const user = (await collectionReference.record(id as string).get()).data;
    let userProjectsObjects: Promise<any>[] = [];
    let userProjects: string[] = [];

    // Get data from the record
    user.projects.forEach((project: string) => {
      if (!userProjects.includes(project)) {
        userProjects.push(project);
      }
    });

    user.projectsObjects = [];

    user.projects.forEach((project: any) => {
      let userProjectObject = projectsCollectionReference.record(project).get();
      userProjectsObjects.push(userProjectObject);
    });

    Promise.allSettled(userProjectsObjects).then((results) => {
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          user.projectsObjects.push(result.value.data);
        } else {
          console.log('Promise rejected:', result.reason);
        }
      });

      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: `User not found.` });
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
