import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "regenwise-regen-db",
  });

/*  
        id: string,
        Cid?: string,
        name: string,
        adder: string,
        explanation: string[],
        categories?: string[],
        subconcepts?: RegenConcept[],
        projects?: RegenProject[],
        link?: string
    
*/
// console.log(await db.collection("RegenConcept").record("regenerative-agriculture-and-forestry").get()); 
  
console.log((await db.collection("RegenConcept").get()).data);
