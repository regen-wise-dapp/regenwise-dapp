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




await db.collection("RegenProject").record("regenwise-nft-collection-zero").call("setDescription", ["'RegenWise Trees With The Regenerative Benefits' is a meaningful and attractive NFT collection featuring 12 special artworks. Each NFT showcases some beautiful tree art and inform about a regenerative benefit (such as carbon sequestration) as its description. Experience the connection between trees and regeneration in digital form."]);

