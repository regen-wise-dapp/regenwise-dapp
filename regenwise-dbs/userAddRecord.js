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
  Regen user Model

id: string, 
userName?: string, 
name?: string, 
surname?: string, 
projects?: string[], 
nftCids?: string[], 
publicKeyH?: string, 
image?: string, 
date?: string, 
role?: string
  
*/

await db.collection("user").create([ "0x6b8b06Fa8A51D2597b3158e27690A3343E493c40",
                                      "",
                                      "",
                                      "",
                                      [""],
                                      [""],
                                      "",
                                      "",
                                      "16.06.2023",
                                      "standard"
 ])
