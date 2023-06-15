import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "regenwise-regen-db",
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


await db.collection("RegenConcept").record("regenerative-agriculture-and-forestry").call("setProjects", [["regenwise-nft-collection-zero","regenwise-web-platform"]]);
// await db.collection("RegenConcept").record("regenerative-education").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-agriculture-and-forestry").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-energy-and-buildings").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-fisheries").call("setParentConcepts", [[]]);

// await db.collection("RegenConcept").record("regenerative-landscaping").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-waste-management").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-water-management").call("setParentConcepts", [[]]);

// await db.collection("RegenConcept").record("regenerative-energy").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-buildings").call("setParentConcepts", [[]]);

// await db.collection("RegenConcept").record("regenerative-water-management").call("setLink", [JSON.stringify((await db.collection("RegenConcept").record("regeneration").get()).data)]);
// console.log(await ((await db.collection("RegenConcept").record(JSON.stringify((await db.collection("RegenConcept").record("regenerative-water-management").get()).data.categories[0].id))).get()));
// console.log((await db.collection("RegenConcept").record((await db.collection("RegenConcept").record("regenerative-water-management").get()).data.categories[0].id).get()).data);