import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config'

const db = new Polybase({
    defaultNamespace: "regenwise-db",
    signer: (data) => {
        return {
            h: 'eth-personal-sign',
            sig: ethPersonalSign(process.env.key0, data)
        }}
});


await db.applySchema(`

@public
collection CandidateRegenProject {
  id: string;
  projectName: string;
  adderPublicKeyH: string;
  description: string[];
  isInstutional: boolean;
  implementers: string[];
  categories: RegenConcept[];
  contactEmail: string;
  link?: string;

  constructor (id: string, projectName: string, description: string[], isInstutional: boolean, implementers: string[], categories: RegenConcept[], contactEmail:string, link?: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      this.id = id;
      this.projectName = projectName;
      this.adderPublicKeyH = ctx.publicKey.toHex();
      this.description = description;
      this.isInstutional = isInstutional;
      this.implementers = projects;
      this.link = link;
  }

  function setCid (Cid: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      if (ctx.publicKey != this.adderPublicKeyH) {
          error('You are not allowed to call this function.');
      }
      this.Cid = Cid;
  }

  function setProjectName (projectName: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      if (ctx.publicKey != this.adderPublicKeyH) {
          error('You are not allowed to call this function.');
      }
      this.projectName = projectName;
  }

  function setDescription (description: string[]) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      if (ctx.publicKey != this.adderPublicKeyH) {
          error('You are not allowed to call this function.');
      }
      this.description = description;
  }

  function setIsInstutional (isInstutional: boolean) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      if (ctx.publicKey != this.adderPublicKeyH) {
          error('You are not allowed to call this function.');
      }
      this.isInstutional = isInstutional;
  }

  function setImplementers (implementers: string[]) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      if (ctx.publicKey != this.adderPublicKeyH) {
          error('You are not allowed to call this function.');
      }
      this.implementers = implementers;
  }

  function setCategories (categories: RegenConcept[]) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      if (ctx.publicKey != this.adderPublicKeyH) {
          error('You are not allowed to call this function.');
      }
      this.categories = categories;
  }

  function setContactEmail (contactEmail: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      if (ctx.publicKey != this.adderPublicKeyH) {
          error('You are not allowed to call this function.');
      }
      this.contactEmail = contactEmail;
  }

  function setLink (link: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection.');}
      if (ctx.publicKey != this.adderPublicKeyH) {
          error('You are not allowed to call this function.');
      }
      this.link = link;
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
    implementers: string[];
    categories: RegenConcept[];
    contactEmail: string;
    link?: string;

    constructor (id: string, Cid?:string, projectName: string, description: string[], isInstutional: boolean, implementers: string[], categories: RegenConcept[], contactEmail:string, link?: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey.toHex() != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca")
        {error('You are not allowed to add a record to this collection.');}
        this.id = id;
        this.projectName = projectName;
        this.adderPublicKeyH = ctx.publicKey.toHex();
        this.description = description;
        this.isInstutional = isInstutional;
        this.implementers = projects;
        this.link = link;
    }

    function setCid (Cid: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.Cid = Cid;
    }

    function setProjectName (projectName: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.projectName = projectName;
    }

    function setDescription (description: string[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.description = description;
    }

    function setIsInstutional (isInstutional: boolean) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.isInstutional = isInstutional;
    }

    function setImplementers (implementers: string[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.implementers = implementers;
    }

    function setCategories (categories: RegenConcept[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.categories = categories;
    }

    function setContactEmail (contactEmail: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.contactEmail = contactEmail;
    }

    function setLink (link: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.link = link;
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

    constructor (id: string, Cid?: string, name: string, adder: string, explanation: string[], subconcepts?: string[], projects?: RegenProject[], link?: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to RegenConcept collection.');}
        if (ctx.publicKey.toHex() != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca")
        {error('You are not allowed to add a record to RegenConcept collection.');}
        this.id = id;
        this.Cid = Cid;
        this.name = name;
        this.adder = adder;
        this.adderPublicKeyH = ctx.publicKey.toHex();
        this.explanation = explanation;
        this.subconcepts = subconcepts;
        this.projects = projects;
        this.link = link;
    }

    function setCid (Cid: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to RegenConcept collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.Cid = Cid;
    }

    function setName (name: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to RegenConcept collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.name = name;
    }

    function setExplanation (explanation: string[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to RegenConcept collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.explanation = explanation;
    }

    function setSubconcepts (subconcepts: string[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to RegenConcept collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.subconcepts = subconcepts;
    }

    function setProjects (projects: RegenProject[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to RegenConcept collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.projects = projects;
    }

    function setLink (link: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to RegenConcept collection.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.link = link;
    }
    


    }
`,);