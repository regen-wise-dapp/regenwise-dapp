import Cors from 'cors';
import { Polybase } from "@polybase/client";

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

  const jsonDataData = db.collection("RegenConcept").where("likes", "==", 0).get();



  // Rest of the API logic

  const concept = await jsonDataData.then((concept) => { 
    const array = []; 
    concept.data.forEach(data => { 
    if (typeof (data.data.id) === "string") 
    { array.push(data.data.id)}; }) 
    return array;
  });



  // jsonDataData.then((concept) => { 
  //   const array = []; 
  //   concept.data.forEach(data => { 
  //   if (typeof (data.data.id) === "string") 
  //   { array.push(data.data.id)}; }) 
  //   console.log(array);
  //   return array;
  // }).then(array1 => res.status(200).send(array1));

  res.status(200).send(concept);


}