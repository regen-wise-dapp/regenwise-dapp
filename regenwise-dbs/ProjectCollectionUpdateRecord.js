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




await db.collection("RegenProject").record("regenwise-web-platform").call("setConcepts", [["regeneration",
"regenerative-agriculture-and-forestry",
"regenerative-buildings",
"regenerative-education",
"regenerative-energy",
"regenerative-fisheries",
"regenerative-landscaping",
"regenerative-waste-management",
"regenerative-water-management"]]);
// await db.collection("RegenConcept").record("regenerative-education").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-agriculture-and-forestry").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-energy-and-buildings").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-fisheries").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-landscaping").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-waste-management").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-water-management").call("setParentConcepts", [[]]);
