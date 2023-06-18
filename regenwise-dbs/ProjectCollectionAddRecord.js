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

await db.collection("RegenProject").create(["regenwise-nft-collection-zero0",
                                            "",
                                            "RegenWise Trees With The Regenerative Benefits NFT Collection",
                                            "'RegenWise Trees With The Regenerative Benefits' is a meaningful and attractive NFT collection featuring 12 special artworks. Each NFT showcases some beautiful tree art and inform about a regenerative benefit (such as carbon sequestration) as its description. Experience the connection between trees and regeneration in digital form.",
                                            true,
                                            "Ongoing",
                                            "Approved",
                                            "RegenWise Team, Omar",
                                            ["regeneration", "regenerative-agriculture-and-forestry"],
                                            "keenregen@gmail.com",
                                            "2023",
                                            "Kartal",
                                            "",
                                            "Might Be",
                                            "Istanbul",
                                            "",
                                            "Turkey"
                                        ])


