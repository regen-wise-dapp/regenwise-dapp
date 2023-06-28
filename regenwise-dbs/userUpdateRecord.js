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




// await db.collection("user").record("0xa542f07ea98d4e7a2e3be21486465f36f8a52474").call("setProjects", [["regenwise-web-platform","regenwise-nft-collection-zero"]]);
await db.collection("user").record("0xa542f07ea98d4e7a2e3be21486465f36f8a52474").call("setImage", ["keenImage1"]);

