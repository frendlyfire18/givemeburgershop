import {uri,options} from "../../lib/constants";
import { MongoClient } from 'mongodb'
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const find_option = req.query.q ? {shop:req.query.q}:(req.query.id && ObjectId.isValid(String(req.query.id)))?{_id:ObjectId(String(req.query.id))}:{}
  const client = new MongoClient(uri, options)
  const db = client.db("givemeburger");

  const burgers = await db
    .collection("goods")
    .find(find_option)
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(burgers);
};