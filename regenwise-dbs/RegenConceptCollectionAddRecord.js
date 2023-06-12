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

 const db1 = new Polybase({
    defaultNamespace: "regenwise-db",
    signer: (data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.key0, data)
      }}
  });


const concept = await db1.collection("RegenConcept").record("regenerative-water-management").get()
// console.log(concept.data);



/*  
        id: string,
        cid?: string,
        name: string,
        adder: string,
        explanation: string[],
        parentConcepts?: string[],
        childConcepts?: string[],
        projects?: string[],
        link?: string
    
*/
await db.collection("RegenConcept").create([concept.data.id,
                                            "",
                                            concept.data.name,
                                            "regenWiseTeam",
                                            concept.data.explanation,
                                            ["regeneration"],
                                            [],
                                            [],
                                            ""
                                        ])




/* await db.collection("RegenConcept").create(["regeneration",
                                            "<cid>",
                                            "Regeneration",
                                            "regenWiseTeam0",
                                            [["Explanation"]],
                                            [["Categories"]],
                                            [[]],
                                            [[]],
                                            ""
                                        ]);  */
