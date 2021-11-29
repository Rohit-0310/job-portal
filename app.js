const express = require("ecpress");
const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/naukri");
}

const jobSchema = new mongoose.Schema({
    company_name: {type:String, required:true},
    job_name: {type:String, required:true},
    skill: {type:String, required:true},
    location: {type:String, required:true},
    rating: {type: Number, required:true}
})
const Job = mongoose.model("job",jobSchema);


const app = express();

app.use(express.json());


//-------job api--------

app.post("/jobs", async(req,res)=> {
    try{
        const job = await Job.create(req.body)
        return res.status(201).send(job);
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
});

app.listen(5454, async function(){
    await connect();
    console.log("listening on port 5454")
});