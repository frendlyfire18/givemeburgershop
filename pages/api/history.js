import {uri,options} from "../../lib/constants";
import { MongoClient } from 'mongodb'
import { ObjectId } from "mongodb";
const POST_METHOD = "POST";

export default async (req, res) => {
    const client = new MongoClient(uri, options)
    const db = client.db("givemeburger")

    if(req.method === POST_METHOD){
        const orders = await db
            .collection("history")
            .insertOne(req.body)

        res.json({status:200,message:"Order added"})
        return;
    }

    const find_option = req.query.phone && req.query.email ? {phone:"+"+req.query.phone,email:req.query.email}:undefined;
    
    if(find_option === undefined){
        res.json({status:400,message:"Don't have date"});
        return;
    }
    const orders = await db
    .collection("history")
    .find(find_option)
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

    res.json(orders);
};