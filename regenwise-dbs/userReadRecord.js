import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "regenwise-regen-db",
  });

  
console.log((await db.collection('user').record("0xb8ef45e628df1791f4c9ddbf400404efdfd22f286d2f8433a1c46de7fb9bfb62f1bbd5312669ddf42e922cbf355280d46d58f75e6fb385ea293e4b9597c13be9").get()).data);
