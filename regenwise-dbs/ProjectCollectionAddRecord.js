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
  Regen Project Model

  id: string, 
  cid?: string, 
  name: string, 
  description: string[], 
  isInstutional: boolean, 
  status: string, 
  approvalStatus: string, 
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

await db.collection("RegenProject").create(["regenwise-web-platform",
                                            "",
                                            "Regenwise Web Platform",
                                            ["Human actions have caused significant environmental degradation and serious harm to the inhabitants, now it is crucial for us to contribute to the process of regeneration. Regeneration in our context is a term used to describe the restoration and responsible management of environmental systems. Our regen (the short form of the word regeneration) web platform aims to facilitate this contribution by offering various services and resources to users. The platform's two main database collections on regen concepts and regen projects serve as the primary features, connecting it to the world of data analytics and trustworthy web 3 database technologies. The platform's NFT markets is another essential feature that users may benefit from. The users can earn, buy, and sell valuable NFTs from our platform's collections while spending valuable time to learn and contribute to the regen goal. Additionally, we offer a unique learning experience through games that educate users about regen concepts and practices in fields like agriculture and energy."],
                                            true,
                                            "Ongoing",
                                            "Approved",
                                            ["RegenWise Team"],
                                            ["regeneration", "regenerative-education"],
                                            "keenregen@gmail.com",
                                            "2023",
                                            "Kartal",
                                            "https://regenwise.xyz/",
                                            "Might Be",
                                            "Istanbul",
                                            "",
                                            "Turkey"
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
