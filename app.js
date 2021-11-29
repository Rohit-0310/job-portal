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


//company
const companySchema = new mongoose.Schema(
    {
      comapny_name: { type: String, required: true },
      aval_job: { type: Number, required: false },
    //   body: {type:String, required:true},
      job_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "job",
          required: true,
      }
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  const Company = mongoose.model("company", companySchema);


const app = express();

app.use(express.json());

//JObs API------------------------
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


//Company API------------------------
app.post("/companys", async (req, res) => {
    try {
      const company = await Company.create(req.body);
  
      return res.status(201).send(company);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  app.get("/companys", async (req, res) => {
    try {
      const companys = await Company.find().lean().exec();
  
      return res.send( companys );
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });


app.listen(4455, async function () {
  await connect();
  console.log("listening on port 4455");
});