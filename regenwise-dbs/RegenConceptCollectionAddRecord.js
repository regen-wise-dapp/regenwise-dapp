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
await db.collection("RegenConcept").create(["regenerative-landscaping",
                                            "",
                                            "Regenerative Landscaping",
                                            "regenWiseTeam0",
                                            ["Regenerative landscaping focuses on designing and maintaining outdoor spaces to promote regeneration, biodiversity, and ecosystem function. It involves practices such as utilizing native plants, minimizing pesticide and fertilizer use, and fostering healthy soil biology. By employing regenerative landscaping, we can minimize environmental damage, support biodiversity, and build beautiful and functional outdoor spaces that offer various benefits, including a healthier environment."],
                                            ["Regeneration", "Others"],
                                            [
                                          ],
                                            [],
                                            ""
                                        ]); 
