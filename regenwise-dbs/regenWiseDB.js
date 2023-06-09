import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config'

const db = new Polybase({
    defaultNamespace: "regenwise-regen-db",
    signer: (data) => {
        return {
            h: 'eth-personal-sign',
            sig: ethPersonalSign(process.env.key0, data)
        }
    }
});
// sign-in condition
const conditionZero = "if (!ctx.publicKey){error('You should sign in first to add a record to this collection. If you think there is an error, contact us.');}";
// pkey check for admin function call condition
const conditionOne = "if (ctx.publicKey.toHex() != '0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca') {error('You are not allowed to call this function.');}";
// pkey check for constructor
const conditionTwo = "if (ctx.publicKey.toHex() != '0xd5b7c1b3d87f41e7ea850d213402bd158e1a5b6bbb8aa8d8e1f9a84f22cfb929a5edd453e6a2d378b180de69ad2086e3e01bd4b1f023bb8908b05467628e9cca') {error('You are not allowed to add a record to this collection.');}";
// pkey check for users
const conditionThree = "if (ctx.publicKey.toHex() != this.publicKeyH) {error('You are not allowed to change the record data.');}";
// pkey check for projects and concepts
const conditionFour = "if (ctx.publicKey.toHex() != this.adderPublicKeyH) {error('You are not allowed to change the record data.');}";



await db.applySchema(`


  @public 
  collection user 
  {
    id: string;
    publicKeyH?: string; 
    name?: string;
    surname?: string; 
    email?: string;
    userName?: string; 
    date?: string;
    projects?: string[]; 
    nftCids?: string[]; 
    image?: string;
    role?: string;
    points?: string;

    constructor (id: string, publicKeyH?: string, name?: string, surname?: string, email?: string, userName?: string, date?: string, projects?: string[], nftCids?: string[], image?: string, role?: string) {
        ${conditionZero}
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.surname = surname;
        this.projects = projects;
        this.points = "0";
        this.nftCids = nftCids;
        this.publicKeyH = publicKeyH;
        this.image = image;
        this.date = date;
        this.role = role;
        this.email = email;
    }

    function setUserName (userName: string) {
        ${conditionZero}
        ${conditionThree}
        this.userName = userName;
    }

    function setName (name: string) {
        ${conditionZero}
        ${conditionThree}
        this.name = name;
    }

    function setSurname (surname: string) {
        ${conditionZero}
        ${conditionThree}
        this.surname = surname;
    }

    function setProjects (projects: string[]) {
        ${conditionZero}
        ${conditionThree}
        this.projects = projects;
    }

    function setPoints (points: string) {
        ${conditionZero}
        ${conditionOne}
        this.points = points;
    }

    function setNftCids (nftCids: string[]) {
        ${conditionZero}
        ${conditionOne}
        this.nftCids = nftCids;
    }

    function setPublicKeyH (publicKeyH: string) {
        ${conditionZero}
        ${conditionOne}
        this.publicKeyH = publicKeyH;
    }


    function setImage (image: string) {
        ${conditionZero}
        ${conditionOne}
        this.image = image;
    }
    
    function setDate (date: string) {
        ${conditionZero}
        ${conditionOne}
        this.date = date;
    }

    function setRole (role: string) {
        ${conditionZero}
        ${conditionOne}
        this.role = role;
    }

    function setEmail (email: string) {
        ${conditionZero}
        ${conditionThree}
        this.email = email;
    }

    function updateUser (name: string, surname: string, email:string, userName:string) {
        ${conditionZero}
        ${conditionThree}
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.userName = userName;
    }

    del () {
        ${conditionZero}
        ${conditionThree}
        selfdestruct();
      }
  }

  @public
  collection RegenProject {
    id: string;
    cid?: string;
    name?: string;
    adderPublicKeyH?: string;
    description?: string;
    isInstutional?: boolean;
    status?: string;
    approvalStatus?: string;
    implementers?: string[];
    concepts?: string[];
    contactEmail?: string;
    date?: string;
    address?: string;
    link?: string;
    ghgPuller?: string;
    city?: string;
    state?: string;
    country?: string;
    likes?: number;

    constructor (id: string, cid?: string, name?: string, description?: string, status?: string, approvalStatus?: string, implementers?: string[], concepts?: string[], contactEmail?:string, date?: string, address?:string, link?: string, ghgPuller?: string, city?: string, state?: string, country?: string, likes?:number) {
        ${conditionZero}
        this.id = id;
        this.cid = cid;
        this.name = name;
        this.adderPublicKeyH = ctx.publicKey.toHex();
        this.description = description;
        this.isInstutional = false;
        this.status = status;
        this.approvalStatus = approvalStatus;
        this.implementers = implementers;
        this.concepts = concepts;
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

    function setCid (cid: string) {
        ${conditionZero}
        ${conditionOne}
        this.cid = cid;
    }
  
    function setName (name: string) {
        ${conditionZero}
        ${conditionOne}
        this.name = name;
    }
  
    function setDescription (description: string) {
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
  
      function setConcepts (concepts: string[]) {
        ${conditionZero}
        ${conditionOne}
        this.concepts = concepts;
      }
  
  
      function setStatus (status: string) {
      ${conditionZero}
      ${conditionOne}
      this.status = status;
      }

      function setApprovalStatus (approvalStatus: string) {
        ${conditionZero}
        ${conditionOne}
        this.status = approvalStatus;
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

        function updateProject (name: string, implementers: string[], contactEmail:string, country:string, state: string, city:string, address:string, concepts:string[], description: string, ghgPuller: string, link: string, status: string) {
            ${conditionZero}
            ${conditionFour}
            this.name = name;
            this.implementers = implementers;
            this.contactEmail = contactEmail;
            this.country = country;
            this.state = state;
            this.city = city;
            this.address = address;
            this.concepts = concepts;
            this.description = description;
            this.ghgPuller = ghgPuller;
            this.isInstutional = false;
            this.link = link;
            this.status = status;

        }


        del () {
            ${conditionZero}
            ${conditionFour}
            selfdestruct();
          }
  }

  @public
  collection RegenConcept {
    id: string;
    cid?: string;
    name: string;
    adder: string;
    explanation: string[];
    parentConcepts?: string[];
    childConcepts?: string[];
    projects?: string[];
    link?: string;
    adderPublicKeyH: string;
    likes?: number;

    constructor (    
        id: string,
        cid?: string,
        name: string,
        adder: string,
        explanation: string[],
        parentConcepts?: string[],
        childConcepts?: string[],
        projects?: string[],
        link?: string) {
        ${conditionZero}
        ${conditionTwo}
        this.id = id;
        this.cid = cid;
        this.name = name;
        this.adder = adder;
        this.explanation = explanation;
        this.parentConcepts = parentConcepts;
        this.childConcepts = childConcepts;
        this.projects = projects;
        this.link = link;
        this.adderPublicKeyH = ctx.publicKey.toHex();
        this.likes = 0;
    }

    function setCid (cid: string) {
        ${conditionZero}
        ${conditionOne}
        this.cid = cid;
    }

    function setAdder (adder: string) {
        ${conditionZero}
        ${conditionOne}
        this.adder = adder;
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

    function setChildConcepts (childConcepts: string[]) {
        ${conditionZero}
        ${conditionOne}
        this.childConcepts = childConcepts;
    }

    function setProjects (projects: string[]) {
        ${conditionZero}
        ${conditionThree}
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

    function setParentConcepts (parentConcepts: string[]) {
        ${conditionZero}
        ${conditionOne}
        this.parentConcepts = parentConcepts;
    }

    del () {
        ${conditionZero}
        ${conditionFour}
        selfdestruct();
      }
}
`,);