import Cors from 'cors';
import { Polybase } from "@polybase/client";
import { promises } from 'dns';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req,
  res,
  fn
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req,
  res
) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  const db = new Polybase({
    defaultNamespace: "regenwise-regen-db",
  });

  const collectionReference = db.collection("RegenProject");
  const collectionReference1 = db.collection("RegenConcept");

  const projectsData0 = (await collectionReference.get()).data;

  const projectsData = [];

  projectsData0.forEach((project) => projectsData.push(project.data));

  let projectConcepts = [];
  let projectConceptObjects = [];
  const projectDataV2 = [];
  let projectConceptObject = [];
  

  // projectConceptObjects.push(
  projectsData.forEach((project) => {
    
    projectConcepts = structuredClone(project.concepts);
    projectConcepts.map( (concept) => {
      projectConceptObject.push((collectionReference1.record(concept).get()).data);
    }
    )
    Promise.all(projectConceptObjects).then((value) => console.log(value))


  });

  


}