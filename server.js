const express = require('express');
const bodyParser = require('body-parser');

const request = require('request');
const app = express();
const port = process.env.PORT || 4001;
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

//for monogo client use
const mod = require('./Models/UserSchema.js')
const mongoDB ='mongodb://michael:michael1@ds139725.mlab.com:39725/productivityvis';
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

// server react app
app.get('/', function (req, res) {
  console.log('main')
  /*res.sendFile(path.join(__dirname, 'build', 'index.html')); */
});

//check to see if valid user
app.get('/userCheck/:userId', function (req, res){
  console.log('userLookup')
  let userName = req.params.userId;
  MongoClient.connect(mongoDB, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('productivityvis')
    db.collection('user-data')
      .find( { 'user.username': userName} )
      .toArray(function(err, result) {
        if (err) throw err;
        if(result === []){
          console.log('adding user');
          insertNew(userName, res);
        } else{
          console.log('user found')
          res.send({data: result});
        }
      });
  })
})

//check to see if valid user
app.post('/saveFocus/:userId', function (req, res) {
  var focus = req.body;
  let userName = req.params.userId;
  try {
    callLookUpPromiseSave( userName, focus)
      .then( function(result){
        console.log("send")
        res.send("sucess");
      })
  } catch(e) {
    console.log(e)
  }
})

// creates await for lookup
const callLookUpPromiseSave = async (name, focus) => {
  lookupPromiseSave( name, focus) 
  // let result = await ( lookupPromiseSave(client, name, focus) );
  // return ( result );
}

// to lookup
const lookupPromiseSave = (userName, focus) => {
  console.log('lookupPromise ', focus.key)
  let lookupKey = 'user.focus.' + focus.key 
  console.log(lookupKey)
  MongoClient.connect(mongoDB, { useNewUrlParser: true },  (err, client) => {
      client.db('productivityvis')
            .collection('user-data')
            .updateOne({ 'user.username': userName }, 
                      { $set : { [lookupKey]:  focus }}, 
                        function(err, result){
                          (err)
                            ? console.log(err)
                            : console.log(result[0]) })
      
  })
}

//add user if necessary
app.get('/addUser/:userId', function (req, res){
  console.log('adding user');
  const userName = req.params.userId;
  insertNew(userName, res);
  res.send("sucess")
})

const getUserScheme = (username) =>{
  let userScheme = mod;
  userScheme.username = username;
  userScheme._id = username;
  return userScheme
}

const insertNew = (username, res) =>{
  var userScheme = getUserScheme(username)
  try{
    MongoClient.connect(mongoDB, { useNewUrlParser: true },  (err, client) => {
      console.log('in this')
      client.db('productivityvis')
            .collection('user-data')
            .insertOne({_id:username, user:userScheme.user});

    })
  }catch(err){
    console.log('insert err', err);
  }
 }

 //add hide pomodoro later once we have the rest of the system rigged up
app.get('/hideFocus/:userName/:pomId', function(req, res){
  console.log('hiding pomodoro')
  const pomId = req.params.pomId;
  const lookupHidden = 'user.focus.' + pomId + '.hidden';
  const userName = req.params.userName;
  MongoClient.connect(mongoDB, { useNewUrlParser: true }, (err, client) => {
    db = client.db('productivityvis')
    db.collection('user-data')
      .updateOne( {_id: 'username'}, 
                  { '$set' : { [lookupHidden]: true }});
    
  })
  res.send("sucess")
})

 app.get('/updateDistraction/:userName/:pomId/:distraction', function(req, res){
  console.log('updating pomodoro')
  const { pomId, distraction, userName } = req.params;
  const lookupDistraction = 'user.focus.' + pomId + '.distraction';
  console.log(lookupDistraction);
  MongoClient.connect(mongoDB, { useNewUrlParser: true }, (err, client) => {
    db = client.db('productivityvis')
    db.collection('user-data')
      .updateOne( {_id: 'username'}, 
                  { '$set' : { [lookupDistraction]: distraction }});
    
  })
  res.send("sucess")
})

app.get('/updateDistraction/:username/:option', function(req, res){
  console.log('new option')
  const { username, option } = req.params;
  MongoClient.connect(mongoDB, { useNewUrlParser: true }, (err, client) => {
    db = client.db('productivityvis')
    db.collection('user-data')
      .updateOne( {_id: username}, 
                  { '$push' : { 'user.options': option }});
    
  })
  res.send("sucess")
})

app.listen( port, () => console.log(`Listening on port ${port}`) )
