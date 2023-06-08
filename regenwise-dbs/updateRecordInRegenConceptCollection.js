import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "regenwise-db",
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
    categories?: string[];
    subconcepts?: string[];
    projects?: string[];
    link?: string;
    adderPublicKeyH: string;
    likes?: number;
    
*/
await db.collection("RegenConcept").record("regenerative-agriculture-stockbreeding-and-forestry").call("setExplanation", [["Regenerative agriculture, stockbreeding and forestry are all holistic approaches that prioritize environmental health and sustainability. Regenerative agriculture and stockbreeding focuses on revitalizing the land and surrounding ecosystems rather than solely focusing on production. By implementing practices like crop rotation, cover cropping, no-till farming, and integrating livestock, regenerative agriculture and stockbreeding conduce to enhance soil health, reduce erosion, and increase carbon sequestration. They also promote biodiversity by supplying habitats for diverse plant and animal species and help mitigate climate change by sequestering more carbon, and reducing greenhouse gas emissions. Similarly, regenerative forestry is an environmentally friendly approach to managing forest ecosystems. It places a strong emphasis on biodiversity, soil health, and carbon sequestration. In summary, regenerative agriculture, stockbreeding and forestry are integrated environmentally friendly solutions that aim to restore and regenerate the planet instead of just exploiting it."]]);
