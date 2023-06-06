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

  constructor (id: string, Cid?: string, projectName: string, description: string[], isInstutional: boolean, status: string, implementers: string[], categories: RegenConcept[], contactEmail:string, date?: string, address?:string, link?: string, ghgPuller?: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}
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
  }

  function setCid (Cid: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to call this function. If you think there is an error, contact us.');}
      if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
          error('You are not allowed to call this function.');
      }
      this.Cid = Cid;
  }

  function setProjectName (projectName: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}
      if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
          error('You are not allowed to call this function.');
      }
      this.projectName = projectName;
  }

  function setDescription (description: string[]) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}
      if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
          error('You are not allowed to call this function.');
      }
      this.description = description;
  }

  function setIsInstutional (isInstutional: boolean) {
      if (!ctx.publicKey)
      {error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}
      if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
          error('You are not allowed to call this function.');
      }
      this.isInstutional = isInstutional;
  }

  function setImplementers (implementers: string[]) {
      if (!ctx.publicKey)
      {error('You should sign in first to call this function. If you think there is an error, contact us.');}
      if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
          error('You are not allowed to call this function.');
      }
      this.implementers = implementers;
  }

    function setCategories (categories: RegenConcept[]) {
      if (!ctx.publicKey)
      {error('You should sign in first to call this function. If you think there is an error, contact us.');}
      if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
          error('You are not allowed to call this function.');
      }
      this.categories = categories;
    }


    function setStatus (status: string) {
    if (!ctx.publicKey)
    {error('You should sign in first to call this function. If you think there is an error, contact us.');}
    if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
        error('You are not allowed to call this function.');
    }
    this.status = status;
    }

    function setContactEmail (contactEmail: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to call this function. If you think there is an error, contact us.');}
      if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
          error('You are not allowed to call this function.');
      }
      this.contactEmail = contactEmail;
  }


    function setDate (date: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to call this function. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.date = date;
    }

    function setAddress (address: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to call this function. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.address = address;
        }

    function setLink (link: string) {
            if (!ctx.publicKey)
            {error('You should sign in first to call this function. If you think there is an error, contact us.');}
            if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
                error('You are not allowed to call this function.');
            }
            this.link = link;
        }

        function setGhgPuller (ghgPuller: string) {
            if (!ctx.publicKey)
            {error('You should sign in first to call this function. If you think there is an error, contact us.');}
            if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
                error('You are not allowed to call this function.');
            }
            this.ghgPuller = ghgPuller;
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

    constructor (id: string, Cid?: string, projectName: string, description: string[], isInstutional: boolean, status: string, implementers: string[], categories: RegenConcept[], contactEmail:string, date?: string, address?:string, link?: string, ghgPuller?: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection.');}
        if (ctx.publicKey.toHex() != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca")
        {error('You are not allowed to add a record to this collection.');}
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
    }

    function setCid (Cid: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to call this function. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.Cid = Cid;
    }
  
    function setProjectName (projectName: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.projectName = projectName;
    }
  
    function setDescription (description: string[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.description = description;
    }
  
    function setIsInstutional (isInstutional: boolean) {
        if (!ctx.publicKey)
        {error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.isInstutional = isInstutional;
    }
  
    function setImplementers (implementers: string[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to call this function. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.implementers = implementers;
    }
  
      function setCategories (categories: RegenConcept[]) {
        if (!ctx.publicKey)
        {error('You should sign in first to call this function. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.categories = categories;
      }
  
  
      function setStatus (status: string) {
      if (!ctx.publicKey)
      {error('You should sign in first to call this function. If you think there is an error, contact us.');}
      if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
          error('You are not allowed to call this function.');
      }
      this.status = status;
      }
  
      function setContactEmail (contactEmail: string) {
        if (!ctx.publicKey)
        {error('You should sign in first to call this function. If you think there is an error, contact us.');}
        if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
            error('You are not allowed to call this function.');
        }
        this.contactEmail = contactEmail;
    }
  
  
      function setDate (date: string) {
          if (!ctx.publicKey)
          {error('You should sign in first to call this function. If you think there is an error, contact us.');}
          if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
              error('You are not allowed to call this function.');
          }
          this.date = date;
      }
  
      function setAddress (address: string) {
          if (!ctx.publicKey)
          {error('You should sign in first to call this function. If you think there is an error, contact us.');}
          if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
              error('You are not allowed to call this function.');
          }
          this.address = address;
          }
  
      function setLink (link: string) {
              if (!ctx.publicKey)
              {error('You should sign in first to call this function. If you think there is an error, contact us.');}
              if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
                  error('You are not allowed to call this function.');
              }
              this.link = link;
          }

          function setGhgPuller (ghgPuller: string) {
            if (!ctx.publicKey)
            {error('You should sign in first to call this function. If you think there is an error, contact us.');}
            if (ctx.publicKey != "0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca") {
                error('You are not allowed to call this function.');
            }
            this.ghgPuller = ghgPuller;
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