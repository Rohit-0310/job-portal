const express = require("express");
const mongoose = require("mongoose");


const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/naukri");
};

const jobSchema = new mongoose.Schema(
  {
    comapny_name: { type: String, required: true },
    job_name: { type: String, required: true },
    skill: { type: String, required: true },
    location: { type: String, required: true },
    reating: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Job = mongoose.model("job", jobSchema);



const app = express();

app.use(express.json());


app.post("/jobs", async (req, res) => {
  try {
    const job = await Job.create(req.body);

    return res.status(201).send(job);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().lean().exec();

    return res.send({ jobs });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});



app.listen(4455, async function () {
  await connect();
  console.log("listening on port 4455");
});