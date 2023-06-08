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
        id: string,
        Cid?: string,
        name: string,
        adder: string,
        explanation: string[],
        categories?: string[],
        subconcepts?: string[],
        projects?: string[],
        link?: string
    
*/
await db.collection("RegenConcept").create(["others",
                                            "",
                                            "Others",
                                            "regenWiseTeam0",
                                            ["'Others' includes regenerative fields like regenerative water management, waste management, wildlife conservation and so on."],
                                            ["Regeneration"],
                                            ["Careful Diets",
                                            "Reduced Food Waste",
                                            "Regeneration in Education",
                                            "Recycling",
                                            "Regenerative Landscaping"
                                          ],
                                            [],
                                            ""
                                        ]); 
