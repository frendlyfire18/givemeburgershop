export const uri = "mongodb+srv://admin:admin@givemeburgerdb.kyuig.mongodb.net/sample_mflix?retryWrites=true&w=majority&ssl=true"
export const options = {}
export const cur_url_with_host_and_port = `http://${process.env.HOST||"localhost"}`;
module.exports={
    uri,
    cur_url_with_host_and_port,
    options
}