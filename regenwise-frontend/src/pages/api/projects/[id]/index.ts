import { Project } from '@src/models/project';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseError } from '@src/models/ResponseError';
import { Polybase } from '@polybase/client';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST'],
});

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
  res: NextApiResponse<Project | ResponseError>
) {
  await runMiddleware(req, res, cors);
  const { query } = req;
  const { id } = query;

  const db = new Polybase({ defaultNamespace: 'regenwise-regen-db' });
  const collectionReference = db.collection('RegenProject');
  const conceptscollectionReference = db.collection('RegenConcept');

  const project = (await collectionReference.record(id as string).get()).data;
  let projectConceptsObjects: any[] = [];
  let projectConcepts: string[] = [];

  // Get data from the record
  project.concepts.forEach((concept: string) => {
    if (!projectConcepts.includes(concept)) {
      projectConcepts.push(concept);
    }
  });

  const projectsConceptsGetObjectsFunction = async () => {
    project.conceptsObjects = [];
    project.concepts.forEach(async (concept: any) => {
      let projectConceptObject = (
        await conceptscollectionReference.record(concept).get()
      ).data;
      projectConceptsObjects.push(projectConceptObject);
      if (projectConceptsObjects.length === project.concepts.length) {
        project.conceptsObjects = structuredClone(projectConceptsObjects);
        project
          ? res.status(200).json(project)
          : res.status(404).json({ message: `Projects not found.` });
      }
    });
  };

  await projectsConceptsGetObjectsFunction();
}
