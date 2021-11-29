const express = require("express");
const mongoose = require("mongoose");


const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/naukri");
};


//job----------------
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


//company----------------
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




//City ---------------

const citySchema = new mongoose.Schema(
    {
      location: { type: String, required: true ,unique:true},
      aval_job: { type: Number, required: false },
    //   body: {type:String, required:true},
        Company_id: {
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
  
  const City = mongoose.model("city", citySchema);






const app = express();

app.use(express.json());

//JObs API------------------------
//post------------------
app.post("/jobs", async (req, res) => {
  try {
    const job = await Job.create(req.body);

    return res.status(201).send(job);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
//get All-------------------------------------
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().lean().exec();

    return res.send({ jobs });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//get single------------------------
app.get("/jobs/:id", async (req, res) => {
    try {
      const job = await Job.findId(req.params.id).lean().exec();
  
      return res.send(job);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });


  //Update----------------

  app.patch("/jobs/:id", async (req, res) => {
    try {
      const job = await Job.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
  
      return res.status(200).send(job);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });



//Company API------------------------
//post------------------

app.post("/companys", async (req, res) => {
    try {
      const company = await Company.create(req.body);
  
      return res.status(201).send(company);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  //get All-------------------------------------
  app.get("/companys", async (req, res) => {
    try {
      const companys = await Company.find().lean().exec();
  
      return res.send( companys );
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  //get single------------------------
app.get("/companys/:id", async (req, res) => {
    try {
      const company = await Company.findId(req.params.id).lean().exec();
  
      return res.send(company);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  //Update----------------

  app.patch("/companys/:id", async (req, res) => {
    try {
      const company = await Company.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
  
      return res.status(200).send(company);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });



  //city API------------------------
//post------------------

app.post("/citys", async (req, res) => {
    try {
      const city = await City.create(req.body);
  
      return res.status(201).send(city);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  //get All-------------------------------------
  app.get("/citys", async (req, res) => {
    try {
      const citys = await City.find().lean().exec();
  
      return res.send( citys );
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  //get single------------------------
  app.get("/citys/:id", async (req, res) => {
    try {
      const city = await City.findId(req.params.id).lean().exec();
  
      return res.send(city);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

    //Update----------------

    app.patch("/citys/:id", async (req, res) => {
        try {
          const city = await City.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
      
          return res.status(200).send(city);
        } catch (e) {
          return res.status(500).json({ message: e.message, status: "Failed" });
        }
      });
    





app.listen(4455, async function () {
  await connect();
  console.log("listening on port 4455");
});