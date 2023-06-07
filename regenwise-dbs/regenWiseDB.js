import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config'

const db = new Polybase({
    defaultNamespace: "regenwise-db",
    signer: (data) => {
        return {
            h: 'eth-personal-sign',
            sig: ethPersonalSign(process.env.key0, data)
        }
    }
});
// sign-in condition
const conditionZero = "if (!ctx.publicKey){error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}";
// pkey check for function call condition
const conditionOne = "if (ctx.publicKey.toHex() != '0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca') {error('You are not allowed to call this function.');}";
// pkey check for constructor
const conditionTwo = "if (ctx.publicKey.toHex() != '0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca') {error('You are not allowed to add a record to this collection.');}";


await db.applySchema(`

@public
collection CandidateRegenProject {
  id: string;
  Cid?: string;
  projectName: string;
  adderPublicKeyH: string;
  description: string[];
  isInstutional: boolean;
  status: string;
  implementers: string[];
  categories: RegenConcept[];
  contactEmail: string;
  date?: string;
  address?: string;
  link?: string;
  ghgPuller?: string;
  city?: string;
  state?: string;
  country?: string;
  likes?: number;

  constructor (id: string, Cid?: string, projectName: string, description: string[], isInstutional: boolean, status: string, implementers: string[], categories: RegenConcept[], contactEmail:string, date?: string, address?:string, link?: string, ghgPuller?: string, city?: string, state?: string, country?: string, likes?:number ) {
      ${conditionZero}
      this.id = id;
      this.Cid = Cid;
      this.projectName = projectName;
      this.adderPublicKeyH = ctx.publicKey.toHex();
      this.description = description;
      this.isInstutional = isInstutional;
      this.status = status;
      this.implementers = projects;
      this.categories = categories;
      this.contactEmail = contactEmail;
      this.date = date;
      this.address = address;
      this.link = link;
      this.ghgPuller = ghgPuller;
      this.city = city;
      this.state = state;
      this.country = country;
      this.likes = 0;
  }

  function setCid (Cid: string) {
      ${conditionZero}
      ${conditionOne}
      this.Cid = Cid;
  }

  function setProjectName (projectName: string) {
      ${conditionZero}
      ${conditionOne}
      this.projectName = projectName;
  }

  function setDescription (description: string[]) {
      ${conditionZero}
      ${conditionOne}
      this.description = description;
  }

  function setIsInstutional (isInstutional: boolean) {
      ${conditionZero}
      ${conditionOne}
      this.isInstutional = isInstutional;
  }

  function setImplementers (implementers: string[]) {
      ${conditionZero}
      ${conditionOne}
      this.implementers = implementers;
  }

    function setCategories (categories: RegenConcept[]) {
      ${conditionZero}
      ${conditionOne}
      this.categories = categories;
    }


    function setStatus (status: string) {
        ${conditionZero}
        ${conditionOne}
        this.status = status;
    }

    function setContactEmail (contactEmail: string) {
        ${conditionZero}
        ${conditionOne}
        this.contactEmail = contactEmail;
  }


    function setDate (date: string) {
        ${conditionZero}
        ${conditionOne}
        this.date = date;
    }

    function setAddress (address: string) {
        ${conditionZero}
        ${conditionOne}
        this.address = address;
        }

    function setLink (link: string) {
        ${conditionZero}
        ${conditionOne}
        this.link = link;
        }

        function setGhgPuller (ghgPuller: string) {
            ${conditionZero}
            ${conditionOne}
            this.ghgPuller = ghgPuller;
        }

        function setCity (city: string) {
            ${conditionZero}
            ${conditionOne}
            this.city = city;
        }

        function setState (state: string) {
            ${conditionZero}
            ${conditionOne}
            this.state = state;
        }

        function setCountry (country: string) {
            ${conditionZero}
            ${conditionOne}
            this.country = country;
        }
        
        function setLikes (likes: number) {
            ${conditionZero}
            ${conditionOne}
            this.likes = likes;
        }
        
}
  
  @public
  collection RegenProject {
    id: string;
    Cid?: string;
    projectName: string;
    adderPublicKeyH: string;
    description: string[];
    isInstutional: boolean;
    status: string;
    implementers: string[];
    categories: RegenConcept[];
    contactEmail: string;
    date?: string;
    address?: string;
    link?: string;
    ghgPuller?: string;
    city?: string;
    state?: string;
    country?: string;
    likes?: number;

    constructor (id: string, Cid?: string, projectName: string, description: string[], isInstutional: boolean, status: string, implementers: string[], categories: RegenConcept[], contactEmail:string, date?: string, address?:string, link?: string, ghgPuller?: string, city?: string, state?: string, country?: string, likes?:number) {
        ${conditionZero}
        ${conditionTwo}
        this.id = id;
        this.Cid = Cid;
        this.projectName = projectName;
        this.adderPublicKeyH = ctx.publicKey.toHex();
        this.description = description;
        this.isInstutional = isInstutional;
        this.status = status;
        this.implementers = projects;
        this.categories = categories;
        this.contactEmail = contactEmail;
        this.date = date;
        this.address = address;
        this.link = link;
        this.ghgPuller = ghgPuller;
        this.city = city;
        this.state = state;
        this.country = country;
        this.likes = 0;
    }

    function setCid (Cid: string) {
        ${conditionZero}
        ${conditionOne}
        this.Cid = Cid;
    }
  
    function setProjectName (projectName: string) {
        ${conditionZero}
        ${conditionOne}
        this.projectName = projectName;
    }
  
    function setDescription (description: string[]) {
        ${conditionZero}
        ${conditionOne}
        this.description = description;
    }
  
    function setIsInstutional (isInstutional: boolean) {
        ${conditionZero}
        ${conditionOne}
        this.isInstutional = isInstutional;
    }
  
    function setImplementers (implementers: string[]) {
        ${conditionZero}
        ${conditionOne}
        this.implementers = implementers;
    }
  
      function setCategories (categories: RegenConcept[]) {
        ${conditionZero}
        ${conditionOne}
        this.categories = categories;
      }
  
  
      function setStatus (status: string) {
      ${conditionZero}
      ${conditionOne}
      this.status = status;
      }
  
      function setContactEmail (contactEmail: string) {
        ${conditionZero}
        ${conditionOne}
        this.contactEmail = contactEmail;
    }
  
  
      function setDate (date: string) {
        ${conditionZero}
        ${conditionOne}
          this.date = date;
      }
  
      function setAddress (address: string) {
        ${conditionZero}
        ${conditionOne}
        this.address = address;
          }
  
      function setLink (link: string) {
        ${conditionZero}
        ${conditionOne}
        this.link = link;
          }

          function setGhgPuller (ghgPuller: string) {
            ${conditionZero}
            ${conditionOne}
            this.ghgPuller = ghgPuller;
        }

        function setCity (city: string) {
            ${conditionZero}
            ${conditionOne}
            this.city = city;
        }

        function setState (state: string) {
            ${conditionZero}
            ${conditionOne}
            this.state = state;
        }

        function setCountry (country: string) {
            ${conditionZero}
            ${conditionOne}
            this.country = country;
        }
        
        function setLikes (likes: number) {
            ${conditionZero}
            ${conditionOne}
            this.likes = likes;
        }
  }

  @public
  collection RegenConcept {
    id: string;
    Cid?: string;
    subconcepts?: string[];
    name: string;
    adder: string;
    adderPublicKeyH: string;
    explanation: string[];
    projects?: RegenProject[];
    link?: string;
    likes?: number;

    constructor (id: string, Cid?: string, name: string, adder: string, explanation: string[], subconcepts?: string[], projects?: RegenProject[], link?: string, likes?: number) {
        ${conditionZero}
        ${conditionTwo}
        this.id = id;
        this.Cid = Cid;
        this.name = name;
        this.adder = adder;
        this.adderPublicKeyH = ctx.publicKey.toHex();
        this.explanation = explanation;
        this.subconcepts = subconcepts;
        this.projects = projects;
        this.link = link;
        this.likes = 0;
    }

    function setCid (Cid: string) {
        ${conditionZero}
        ${conditionOne}
        this.Cid = Cid;
    }

    function setName (name: string) {
        ${conditionZero}
        ${conditionOne}
        this.name = name;
    }

    function setExplanation (explanation: string[]) {
        ${conditionZero}
        ${conditionOne}
        this.explanation = explanation;
    }

    function setSubconcepts (subconcepts: string[]) {
        ${conditionZero}
        ${conditionOne}
        this.subconcepts = subconcepts;
    }

    function setProjects (projects: RegenProject[]) {
        ${conditionZero}
        ${conditionOne}
        this.projects = projects;
    }

    function setLink (link: string) {
        ${conditionZero}
        ${conditionOne}
        this.link = link;
    }

    function setLikes (likes: number) {
        ${conditionZero}
        ${conditionOne}
        this.likes = likes;
    }
}
`,);