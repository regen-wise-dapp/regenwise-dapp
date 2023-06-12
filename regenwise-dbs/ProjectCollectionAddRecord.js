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
  id: string, 
  cid?: string, 
  projectName: string, 
  description: string[], 
  isInstutional: boolean, 
  status: string, 
  approvalStatus: string[], 
  implementers: string[], 
  concepts: string[], 
  contactEmail:string, 
  date?: string, 
  address?:string, 
  link?: string, 
  ghgPuller?: string, 
  city?: string, 
  state?: string, 
  country?: string, 
  likes?:number
    
*/

await db.collection("RegenConcept").create(["regenwise-web-platform",
                                            "",
                                            "Regenwise Web Platform",
                                            "regenWiseTeam",
                                            ["Regenerative agriculture and forestry focuses on revitalizing the soil and surrounding ecosystems rather than solely focusing on production. By implementing practices like crop rotation, cover cropping, no-till farming, agroforestry and integrating livestock (especially cattle), these conduce to enhance soil health, reduce erosion, and increase carbon sequestration. They also promote biodiversity by supplying habitats for diverse plant and animal species and help mitigate climate change by sequestering more carbon, and reducing greenhouse gas emissions. In summary, regenerative agriculture and forestry are integrated environmentally friendly solutions that aim to restore and regenerate the planet instead of just exploiting it."],
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
