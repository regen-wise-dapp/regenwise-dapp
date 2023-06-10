import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "regenwise-db",
    signer: (data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.key0, data)
      }}
  });

/*  
    id: string;
    Cid?: string;
    name: string;
    adder: string;
    explanation: string[];
    categories?: RegenConcept[];
    subconcepts?: string[];
    projects?: string[];
    link?: string;
    adderPublicKeyH: string;
    likes?: number;
    
*/
// await db.collection("RegenConcept").record("others").call("setSubconcepts", [["Regenerative Water Management", "Regenerative Waste Management", "Regenerative Fisheries", "Regenerative Education", "Regenerative Landscaping", "Regenerative Diets"]]);

await db.collection("RegenConcept").record("regenerative-education").call("setCategories", [[db.collection("RegenConcept").record("regeneration")]]);

// await db.collection("RegenConcept").record("regenerative-energy").call("setCategories", [[]]);
// await db.collection("RegenConcept").record("regenerative-energy-and-buildings").call("setCategories", [[]]);
// await db.collection("RegenConcept").record("regenerative-fisheries").call("setCategories", [[]]);
// await db.collection("RegenConcept").record("regenerative-landscaping").call("setCategories", [[]]);
// await db.collection("RegenConcept").record("regenerative-waste-management").call("setCategories", [[]]);
// await db.collection("RegenConcept").record("regenerative-water-management").call("setCategories", [[]]);
// console.log(await db.collection("RegenConcept").record("regeneration").get());