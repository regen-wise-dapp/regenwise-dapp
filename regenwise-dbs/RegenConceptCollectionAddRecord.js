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
    cid?: string;
    name: string;
    adder: string;
    explanation: string[];
    parentConcepts?: string[];
    childConcepts?: string[];
    projects?: string[];
    link?: string;
 
*/
await db.collection("RegenConcept").create(["regenerative-fisheries",
                                            "",
                                            "Regenerative Fisheries",
                                            "regenWiseTeam",
                                            ["Regenerative fisheries focus on sustainable fishing practices that prioritize ecosystem health and long-term viability. This includes actions such as implementing fishing techniques that minimize bycatch, protecting critical habitats, and promoting responsible fishing quotas to prevent overfishing."],
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
