import {uri,options} from "../../lib/constants";
import { MongoClient } from 'mongodb'
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const option = {address:req.query.address,email:req.query.email,name:req.query.name,number:req.query.number}
  const client = new MongoClient(uri, options)
  const db = client.db("givemeburger");

  const burgers = await db
    .collection("history")
    .insertOne(option)
    .catch((e)=>{
        res.json({status:404,message:e.message})
    })
    .then(()=>{
        res.json({status:200,message:"Order edded"})
    })
};