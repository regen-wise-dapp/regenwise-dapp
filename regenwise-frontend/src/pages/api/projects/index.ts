import Cors from 'cors';
import { Polybase } from '@polybase/client';
import { Project } from '@src/models/project';
import { ResponseError } from '@src/models/ResponseError';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | ResponseError>
) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const db = new Polybase({
    defaultNamespace: 'regenwise-regen-db',
  });

  const collectionReference0 = db.collection('RegenConcept');
  const collectionReference1 = db.collection('RegenProject');
  const projectsData0 = (await collectionReference1.get()).data;

  let projectsData: Project[] = [];
  projectsData0.forEach((project) => projectsData.push(project.data));

  projectsData = structuredClone(projectsData);
  projectsData.forEach((project) => (project.conceptsObjects = []));

  let projectsConcepts: string[] = [];
  let projectsConceptsGetObjectsFunction;
  let projectsConceptsObjects: any[] = [];
  let projectConcept = {};

  projectsData.forEach((project) => {
    project.concepts.forEach((concept) => {
      if (!projectsConcepts.includes(concept)) {
        projectsConcepts.push(concept);
      }
    });
  });

  projectsConceptsGetObjectsFunction = async () => {
    projectsConcepts.forEach(async (concept) => {
      projectConcept = (await collectionReference0.record(concept).get()).data;
      projectsConceptsObjects.push(projectConcept);
      if (projectsConceptsObjects.length === projectsConcepts.length) {
        projectsConceptsObjects.forEach((object) => {
          projectsData.forEach((project) => {
            if (project.concepts.includes(object.id)) {
              project.conceptsObjects.push(object);
            }
          });
        });
        projectsData
          ? res.status(200).json(projectsData)
          : res.status(404).json({ message: `Projects not found.` });
      }
    });
  };

  await projectsConceptsGetObjectsFunction();
}
