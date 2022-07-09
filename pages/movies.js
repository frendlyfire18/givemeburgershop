import {uri,options} from "../lib/constants";
import { MongoClient } from 'mongodb'

export default function Movies({movies}){
    return(
        <>
            {
                movies.map(movie=>(
                    <p>{movie.title}</p>
                ))
            }
        </>
    )
}
export async function getServerSideProps(context) {
    const client = new MongoClient(uri, options)
    const db = client.db("givemeburger");

    const movies = await db
        .collection("goods")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();
        
    return {
        props: { movies: JSON.parse(JSON.stringify(movies)) },
    }
}