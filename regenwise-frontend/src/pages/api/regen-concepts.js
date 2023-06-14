import Cors from 'cors';
import { Polybase } from "@polybase/client";

// // // projects objects are to be added

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
  

  const conceptsData0 = (await collectionReference0.get()).data;

  let conceptsData = [];

  conceptsData0.forEach((concept) => conceptsData.push(concept.data));

  conceptsData = structuredClone(conceptsData);
  conceptsData.forEach((concept) => concept.parentConceptsObjects = []);

  
  
  let conceptsParentConcepts = [];
  let conceptsParentConceptsGetObjectsFunction;
  let conceptsParentConceptsObjects = [];
  let conceptParentConcept = {};

  conceptsData.forEach((concept) => {
    concept.parentConcepts.forEach((concept) => {
      if (!(conceptsParentConcepts.includes(concept))) {
        conceptsParentConcepts.push(concept);
      }
    }
    )
  }
  )

  conceptsParentConceptsGetObjectsFunction = async () => {
    conceptsParentConcepts.forEach(async (concept) => {
      conceptParentConcept = await collectionReference0.record(concept).get();
      conceptParentConcept = conceptParentConcept.data;
      conceptsParentConceptsObjects.push(conceptParentConcept);
      if (conceptsParentConceptsObjects.length === conceptsParentConcepts.length)
      {
        conceptsParentConceptsObjects.forEach((object) => {
            conceptsData.forEach((concept) => {
            if (concept.parentConcepts.includes(object.id))
            {
                concept.parentConceptsObjects.push(object);
            }
          })

        }
        )
        res.status(200).send(conceptsData);
      }
    })
    
  }

  await conceptsParentConceptsGetObjectsFunction();
  



  



    
}
  


