const express = require("express");
const mongoose = require("mongoose");

/*
- create to mongodb server -- DONE
- Create a Schema for our data
-create a model from the schema
*/

//Step-1
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/library");
};

//step-2
const bookSchema = new mongoose.Schema(
    {
        book_name: {type: String, required:true},
        author_name: {type: String, required:true},
        page_no: {type: Number, required:true},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

//step-3
const Book = mongoose.model("book", bookSchema);

const app = express();

app.use(express.json());

/*
books
post = /books
get all = /books
get one = /books/:id
Update one = /books/:id
Delete one = /books/:id
*/

app.post("/books", async (req,res) => {
    try{
        const books = await Book.create(req.body);
        
        return res.status(201).send(Book);
    } catch (e) { //Exception
        return res.status(500).json({ message: e.message });
    }
});

app.get("/books", async(req, res)=>{
    // thennable
    try {
        const books = await Book.find().lean().exec();
    
        res.send({ books });
    } catch (e) { 
        //Exception
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});

app.get("/books/:id", async (req, res)=>{   // /anything /1 /2 /daffkfbjbuyg
    try{
        const book = await Book.findById(req.params.id).lean().exec();
    
        res.send({ book });
    } catch (e) { 
        //Exception
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});
// Patch Request
app.patch("/:books/:id", async (req,res) => {
   try{

    
       const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
           new: true,
       })
           .lean()
           .exec();

       return res.status(201).send(book);
   } catch (e) { //Exception
    return res.status(500).json({ message: e.message, status: "Failed" });
}
});
//Delete books
app.delete("/:books/:id", async (req,res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(book)
    }  catch (e) { //Exception
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.listen(4455, async function () {
    await connect();
    console.log("listening on port 4455")
});