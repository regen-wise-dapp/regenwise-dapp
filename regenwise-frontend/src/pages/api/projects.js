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

  const collectionReference0 = db.collection("RegenConcept");
  const collectionReference1 = db.collection("RegenProject");
  

  const projectsData0 = (await collectionReference1.get()).data;

  let projectsData = [];

  projectsData0.forEach((project) => projectsData.push(project.data));

  projectsData = structuredClone(projectsData);
  projectsData.forEach((project) => project.conceptsObjects = []);

  
  
  let projectsConcepts = [];
  let projectsConceptsGetObjectsFunction;
  let projectsConceptsObjects = [];
  let projectConcept = {};

  projectsData.forEach((project) => {
    project.concepts.forEach((concept) => {
      if (!(projectsConcepts.includes(concept))) {
      projectsConcepts.push(concept);
      }
    }
    )
  }
  )

  projectsConceptsGetObjectsFunction = async () => {
    projectsConcepts.forEach(async (concept) => {
      projectConcept = await collectionReference0.record(concept).get();
      projectConcept = projectConcept.data;
      projectsConceptsObjects.push(projectConcept);
      if (projectsConceptsObjects.length === projectsConcepts.length)
      {
        projectsConceptsObjects.forEach((object) => {
          projectsData.forEach((project) => {
            if (project.concepts.includes(object.id))
            {
              project.conceptsObjects.push(object);
            }
          })

        }
        )
        res.status(200).send(projectsData);
      }
    })
    
  }

  await projectsConceptsGetObjectsFunction();
  



  



    
}
  


