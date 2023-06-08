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
        id: string,
        Cid?: string,
        name: string,
        adder: string,
        explanation: string[],
        categories?: string[],
        subconcepts?: string[],
        projects?: string[],
        link?: string
    
*/
await db.collection("RegenConcept").create(["regenerative-agriculture-stockbreeding-and-forestry",
                                            "",
                                            "Regenerative Agriculture, Stockbreeding and Forestry",
                                            "regenWiseTeam0",
                                            ["Regenerative agriculture, stockbreeding and forestry are all holistic approaches that prioritize environmental health and sustainability. Regenerative agriculture and stockbreeding focuses on revitalizing the land and surrounding ecosystems rather than solely focusing on crop production. By implementing practices like crop rotation, cover cropping, no-till farming, and integrating livestock, regenerative agriculture and stockbreeding enhance soil health, reduces erosion, and increases carbon sequestration. It also promotes biodiversity by supplying habitats for diverse plant and animal species and helps mitigate climate change by sequestering more carbon, and reducing greenhouse gas emissions. Similarly, regenerative forestry is an environmentally friendly approach to managing forest ecosystems. It places a strong emphasis on biodiversity, soil health, and carbon sequestration. In summary, regenerative agriculture, stockbreeding and forestry are integrated environmentally friendly solutions that aim to restore and regenerate the planet instead of just exploiting it."],
                                            ["Regeneration"],
                                            [ "Tropical Forest Restoration",
                                              "Silvopasture",
                                              "Peatland Protection and Rewetting",
                                              "Tree Plantations",
                                              "Perennial Staple Crops",
                                              "Temperate Forest Restoration",
                                              "Tree Intercropping",
                                              "Multistrata Agroforestry",
                                              "Regenerative Annual Cropping",
                                              "Managed Grazing",
                                              "Abandoned Farmland Restoration",
                                              "Bamboo Production",
                                              "Improved Cattle Feed",
                                              "Improved Rice Production",
                                              "Forest Protection",
                                              "Conservation Agriculture"],
                                            [],
                                            ""
                                        ]); 
