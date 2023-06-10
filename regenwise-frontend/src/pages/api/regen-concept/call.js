import Cors from 'cors';
import { Polybase } from "@polybase/client";

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
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
    defaultNamespace: "regenwise-db",
  });

  const jsonDataData = db.collection("RegenConcept").where("likes", "==", 0).get();



  // Rest of the API logic

  // const call0 = await fetch('https://testnet.polybase.xyz/v0/collections/regenwise-db%2FRegenConcept/records/regeneration');
  // const jsonData = await call0.json();
  // const jsonDataData = jsonData.data;

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