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
    id: string;
    Cid?: string;
    name: string;
    adder: string;
    explanation: string[];
    categories?: RegenConcept[];
    subconcepts?: string[];
    projects?: string[];
    link?: string;
    adderPublicKeyH: string;
    likes?: number;
    
*/
// await db.collection("RegenConcept").record("others").call("setSubconcepts", [["Regenerative Water Management", "Regenerative Waste Management", "Regenerative Fisheries", "Regenerative Education", "Regenerative Landscaping", "Regenerative Diets"]]);


await db.collection("RegenConcept").record("regeneration").call("setExplanation", [["Human actions have caused significant environmental degradation and serious harm to the inhabitants, now it is crucial for us to contribute to the process of regeneration. 'Regeneration' in our context is a term used to describe the restoration and responsible management of environmental systems. Our regen (the short form of the word regeneration) platform aims to facilitate regen efforts by offering various services and resources to users. The DApp's two main database collections on regen concepts and regen projects serve as the primary features, connecting it to the world of data analytics and trustworthy web 3 database technologies. The platform's NFT markets is another essential feature that users may benefit from. The users can earn, buy, and sell valuable NFTs from our platform's collections while spending valuable time to learn and contribute to the regen goal. Additionally, we offer a unique learning experience through quests that educate users about regen concepts and practices in fields like agriculture and energy."]]);
// await db.collection("RegenConcept").record("regenerative-education").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-agriculture-and-forestry").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-energy-and-buildings").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-fisheries").call("setParentConcepts", [[]]);

// await db.collection("RegenConcept").record("regenerative-landscaping").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-waste-management").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-water-management").call("setParentConcepts", [[]]);

// await db.collection("RegenConcept").record("regenerative-energy").call("setParentConcepts", [[]]);
// await db.collection("RegenConcept").record("regenerative-buildings").call("setParentConcepts", [[]]);

// await db.collection("RegenConcept").record("regenerative-water-management").call("setLink", [JSON.stringify((await db.collection("RegenConcept").record("regeneration").get()).data)]);
// console.log(await ((await db.collection("RegenConcept").record(JSON.stringify((await db.collection("RegenConcept").record("regenerative-water-management").get()).data.categories[0].id))).get()));
// console.log((await db.collection("RegenConcept").record((await db.collection("RegenConcept").record("regenerative-water-management").get()).data.categories[0].id).get()).data);