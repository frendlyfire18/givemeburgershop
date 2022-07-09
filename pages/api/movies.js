import {uri,options} from "../../lib/constants";
import { MongoClient } from 'mongodb'

export default async (req, res) => {
  const client = new MongoClient(uri, options)
  const db = client.db("sample_mflix");

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(movies);
};