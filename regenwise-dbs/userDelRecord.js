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
  isRegistered?: boolean,   [unregistered, registered]
  image?: string, 
  date?: string, 
  role?: string
  
*/

await db.collection("user").record("0xa542f07ea98d4e7a2e3be21486465f36f8a52474").call("del");
