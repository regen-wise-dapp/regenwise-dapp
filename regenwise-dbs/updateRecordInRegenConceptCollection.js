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

/* id: string, 
Cid?: string, 
name: string, 
adder: string, 
explanation: string[], 
subconcepts?: string[], 
projects?: RegenProject[], 
link?: string */
await db.collection("RegenConcept").record("regeneration").call("setLikes", [0]);
