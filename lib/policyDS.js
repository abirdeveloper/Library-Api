const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
var ObjectId = require('mongodb').ObjectID;

//DB Config
const dbUri = keys.MongoUri;

let dbo = null;
    
    const init = async() => {
        try {
            MongoClient.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
                if(err) {
                    throw err
                } else {
                    console.log('Mongo db connected')
                    dbo = db.db(keys.dbName)
                    // var colec = dbo.collection(keys.collectionName)
                    // colec.createIndex({ "$**": "text" });
                }
            });
        } catch(err) {
            console.log('Error while initializing mongodb')
        }       
    }

    const findAll = async() => {
        try {
            const result = await dbo.collection(keys.collectionName).find({}).toArray()  
                      
            return result            
        } catch (err) {
            throw err
        }
    }

    const findOne = async(_id) => {
        try {
           
            const result = await dbo.collection(keys.collectionName).findOne({"_id": new ObjectId(_id)})             
            return result            
        } catch (err) {
            throw err
        }
    }

    const AddBook = async(book) => {
        try {
            const result = await dbo.collection(keys.collectionName).insertOne(book)            
            return result            
        } catch (err) {
            throw err
        }
    }
    const UpdateBook = async(book) => {
        try {
            var myquery = {"_id": new ObjectId(book._id)};
            var newvalues = { $set: {"customername":book.customername,"address":book.address,"policynumber": book.policynumber,"premium":book.premium,"emailid":book.emailid,"lob":book.lob } };
            const result = await dbo.collection(keys.collectionName).updateOne(myquery, newvalues);            
            return result            
        } catch (err) {
            throw err
        }
    }

    const DeleteBook = async(code) => {
        try {
            console.log(code)
            var myquery = {"_id": new ObjectId(code)};
            const result = await dbo.collection(keys.collectionName).deleteOne(myquery)            
            return result            
        } catch (err) {
            throw err
        }
    }

    const SearchBook = async(policynumber) => {
        
             
             var myquery = {"policynumber": policynumber};
             const result = await dbo.collection(keys.collectionName).find(myquery).toArray(function(err, results) {
                 if (err) throw err;
                 return results
                  
             });

             return result; 

}



            /* const  SearchBook =  (policynumber) => {
                return new Promise(function(resolve, reject) {
                    var myquery = {"policynumber": policynumber};
                    dbo.collection(keys.collectionName).find(myquery).toArray( function(err, docs) {
                    if (err) {
                      // Reject the Promise with an error
                      return reject(err)
                    }
              
                    
                    return resolve(docs)
                  })
                })
              } */
              
           
               
     
    

module.exports = {init, findAll, findOne,AddBook,DeleteBook,UpdateBook,SearchBook};