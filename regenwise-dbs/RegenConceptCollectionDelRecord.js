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
    categories?: string[];
    subconcepts?: string[];
    projects?: string[];
    link?: string;
    adderPublicKeyH: string;
    likes?: number;
    
*/
await db.collection("RegenConcept").record("regenerative-fisheries").call("del");
