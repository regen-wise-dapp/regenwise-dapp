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
publicKeyH?: string, 
name?: string, 
surname?: string, , 
email?: string, 
userName?: string, 
date?: string, 
projects?: string[], 
nftCids?: string[], 
image?: string,
role?: string
  
*/

await db.collection("user").create([ "0x6k8b06fa8a51d2597b3158e27690a3343e493c40"
 ])
