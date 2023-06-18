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




await db.collection("user").record("0x20f57f30bcad3ce95ea2d0d39dfb9b6dcadc1d5a").call("setProjects", [["regenwise-web-platform","regenwise-nft-collection-zero"]]);


