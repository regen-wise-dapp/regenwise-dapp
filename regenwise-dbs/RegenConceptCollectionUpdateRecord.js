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
    categories?: string[];
    subconcepts?: string[];
    projects?: string[];
    link?: string;
    adderPublicKeyH: string;
    likes?: number;
    
*/
// await db.collection("RegenConcept").record("others").call("setSubconcepts", [["Regenerative Water Management", "Regenerative Waste Management", "Regenerative Fisheries", "Regenerative Education", "Regenerative Landscaping", "Regenerative Diets"]]);

await db.collection("RegenConcept").record("others").call("setExplanation", [["'Others' includes regenerative fields like regenerative education, regenerative diets, regenerative landscaping, regenerative waste management, regenerative water management, regenerative fisheries."]]);
