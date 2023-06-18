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




await db.collection("RegenProject").record("regenwise-web-platform").call("setImplementers", ["RegenWiseTeam, Omar"]);
// await db.collection("RegenProject").record("regenwise-web-platform").call("setConcepts", [["regeneration",
// "regenerative-agriculture-and-forestry",
// "regenerative-buildings",
// "regenerative-education",
// "regenerative-energy",
// "regenerative-fisheries",
// "regenerative-landscaping",
// "regenerative-waste-management",
// "regenerative-water-management"]]);

