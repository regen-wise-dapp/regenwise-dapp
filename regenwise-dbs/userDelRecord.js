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

await db.collection("user").record("0x70569f25376b361663a7fffbb307fc4ee707b53d").call("del");
