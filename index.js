// const dbName=emaZonAuth;
// const cName=emaZon;
// const uName=emazonauth;
// const up=Emazonauth112233;



const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();



const app = express()
const port = 5000

app.use(bodyParser.json());
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w8vla.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello World!')
})




client.connect(err => {
  const collection = client.db("emaZonAuth").collection("emaZon");
  const OrderCollection = client.db("emaZonAuth").collection("emaZon");
  console.log("connect data base ");
  
  app.post('/addProduct',(req,res)=>{
      const product=req.body;
      collection.insertOne(product)
      .then(result=>{
          console.log(result);
          res.send(result.insertedCount)
      })
  })

app.get('/products',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
        res.send(documents)
    })
})

app.get('/product/:key',(req,res)=>{
    collection.find({key:req.params.key})
    .toArray((err,documents)=>{
        res.send(documents[0])
    })
})

app.post('/productByKey',(req,res)=>{
    const productsKeys=req.body;
    collection.find({key:{$in:productsKeys}})
    .toArray((err,documents)=>{
        res.send(documents)
    })
})


app.post('/addOrder',(req,res)=>{
    const order=req.body;
    OrderCollection.insertOne(order)
    .then(result=>{
        console.log(result);
        res.send(result.insertedCount>0)
    }) 
})

});

app.listen(port)