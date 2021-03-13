const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require ("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 3;



//for payment gateway
const path = require('path')

const https = require('https')
const qs = require('querystring')

// const checksum_lib = require('./paytm/checksum')
// const config = require('./paytm/config')




//-----------------

var cors = require("cors");

dotenv.config();

const app = express();

//For unblock blocked XMLHttpRequest due to CORS Policy
app.use(cors());

// app.use(bodyParser.urlencoded({extended: true}));

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

//for build folder------------
app.use(express.static(path.join(__dirname, 'build')));


app.get('/react', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//----------------------------

mongoose.connect("mongodb+srv://PRATEEK_CROUDFUNDING:987654321@cluster0.z9tc5.mongodb.net/crowdfundingDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect("mongodb://localhost:27017/crowdfundingDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const cardSchema = {
  title:{
    type:String,
    default:""
  },
  content:{
    type:String,
    default:""
  },
  amount:{
    type:Number
  },
  donation: Number,
  buttonStatus:{
    // type:Boolean,
   type:Number,
    default:0,
    validate:{
      validator : Number.isInteger,
    message   : '{VALUE} is not an integer value'
              }
  
  },
  donor:[{
    orderid:{   //update order id when in /paynow
      type:String,
      default:""
    },
    donatedmoney:Number,//update in /paynow
    status:{ //pending during /paynow and success or fail in /callback
      type:String,
      default:""
    },

    id:{   // update txnid when in /callback in case of successful transaction
      type:String,
      default:""
    }
  }],
};

const Card = mongoose.model("Card", cardSchema);



//camopaign id,txnid,satus

// const card = new Card({
//     title:"Help Daulat ram",
//     content:"He is very sweet person",
//     amount:4000
// });

// card.save(function(err){
//     console.log("successfully saved");
// })





//For getting updated notes useState array from frontend axios Post request
app.post("/admin", function (req, res) {
  // console.log("got data in post request ")
  // console.log(req.body);

  // Card.deleteMany({}, function(error, docs){
  //     if(error)
  //     console.log(error);
  // });

  // console.log("got data in post request after deletemany")
  // Card.find({}, function (err, docs) {
  //     if (err){
  //         console.log(err);
  //     }
  //     else{
  //         console.log(" data: ", docs);
  //     }
  // });

  if (req.body.action === "delete") {
    Card.deleteMany(
      {
        title: req.body.title,
        content: req.body.content,
        amount: req.body.amount,
      },
      function (error, docs) {
        if (error) console.log(error);
        else {
          console.log("updated data after deletion: ", docs);
        }
      }
    );
  } 
  
  
  else
   {
    Card.insertMany(req.body, function (error, docs) {
      if (error) console.log(error);
      else {
        console.log("updated data: ", docs);
      }
    });

    // console.log("got data in post request after insertOne")
    // Card.find({}, function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(" data: ", docs);
    //     }
    // });
  }
});

// console.log("showing the data after post request")
// Card.find({}, function (err, docs) {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log("final data: ", docs);
//     }
// });

app.get("/admin", async function (req, res) {
  // console.log("data inside before find in get request")
  // console.log(docs);
try {
 let docs=await Card.find({});
  console.log("docsssss",docs);
      res.send(docs);
    }
catch(
  err
){console.log(err)}
    // console.log("data inside after find in get request")
    // console.log(docs);

});



//Schema for LOGIN
const loginSchema = {
  email: String,
  password: String,
};

const Login = mongoose.model("Login", loginSchema);

  //  bcrypt.hash("123456", saltRounds, function(err, hash) {

  //      const login = new Login({
  //          email:"prateek544verma@gmail.com",
  //          password:hash
  //      });

  //      login.save(function(err){
  //          if(err){
  //              console.log(err);
  //          }
  //          else{
  //              console.log("Login credential saved")
  //          }
  //      })

  //  });

app.post("/newadmin",function(req,res){
   
  console.log("new admin",req.body);
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

         const login = new Login({
             email:req.body.email,
             password:hash
         });
  
         login.save(function(err){
             if(err){
                 console.log(err);
             }
             else{
                 console.log("Login credential saved")
             }
         })
  
     });

})


app.post("/updatecampaign", function (req, res) {
  console.log("Updated data",req.body)

  Card.updateOne({"title":req.body.olddata.title,"content":req.body.olddata.content,"amount":req.body.olddata.amount},
                {"title":req.body.newdata.title,"content":req.body.newdata.content},function (err, docs) { 
                  if (err){ 
                      console.log(err) 
                  } 
                  else{ 
                      console.log("success Updated note : ", docs); 
                  } 
               })


})


app.post("/blockcampaign", function (req, res) {
  console.log("block",req.body.title);

  // mongoose.set('useFindAndModify', false);

  Card.findOneAndUpdate({"title":req.body.title,"content":req.body.content,"amount":req.body.amount},
  {$bit:{"buttonStatus":{xor:1}}},function (err,docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("found staus ", docs); 
    } 
 })


})


let loginStatus = false;

app.post("/login", function (req, res) {
  Login.findOne({ email: req.body.email }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      
      if (foundUser) {
        console.log("user:", foundUser);
       
        bcrypt.compare( req.body.password,foundUser.password,function (err, result) {
            console.log("result:",result );
            loginStatus = result;

            var token=null;

            // res.json({email:req.body.email,password:req.body.password,result});
           
           if(loginStatus === true)
           {
           token = jwt.sign({_id:foundUser._id},process.env.TOKEN_SECRET,{ expiresIn: '3s'});
           res.header('auth-token',token); 
          //  res.header('auth-token',token).send(token); 
           }
           
           
           
            res.json({
              token: token==null?null:token,
              result: result,
              email:foundUser.email
          });

          }
        );
      } else{
        res.json({result:false});
      }

    }
  });

  

  // console.log("status inside post");
  // console.log("inside post:",loginStatus);
});
// console.log("status outside post");
// console.log(loginStatus);

// app.get("/login", function (req, res) {
//   console.log("status inside get");
//   console.log(loginStatus);
//   res.send(loginStatus);
//   loginStatus = false;
// });

function auth(req,res,next){
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');

  try{
    const verified = jwt.verify(token,process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('INVALID TOKEN');
  }
}



//Payment gateway----------------------------------------------------

// Middleware for body parsing
const parseUrl = express.urlencoded({ extended: false })
const parseJson = express.urlencoded({ extended: false })

const checksum_lib = require('./paytm/checksum')
const config = require('./paytm/config')


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'))
// })


let cardIdentity={};
app.post('/paynow', [parseUrl, parseJson], async(req, res) => {

//Identity of selected card for payment
cardIdentity={
  title:req.body.title,
  content:req.body.content
}

console.log("payment data",req.body);


    if (!req.body.amount || !req.body.email || !req.body.phone) {
      res.status(400).send('Payment failed')
    } else {
      var params = {};
      params['MID'] = config.PaytmConfig.mid;
      params['WEBSITE'] = config.PaytmConfig.website;
      params['CHANNEL_ID'] = 'WEB';
      params['INDUSTRY_TYPE_ID'] = 'Retail';
      params['ORDER_ID'] = 'TEST_' + new Date().getTime();
      params['CUST_ID'] = 'customer_001';
      params['TXN_AMOUNT'] = req.body.amount.toString();
      params['CALLBACK_URL'] = 'http://localhost:4000/callback';
      params['EMAIL'] = req.body.email;
      params['MOBILE_NO'] = req.body.phone.toString();
  
  
     //Updating orderid,amount,status
      // Card.findOne({title:req.body.title,content:req.body.content},function(err,result){
      //   if(err)
      //   console.log(err)
      //   else{
      //     console.log("Campaign database id",result._id);//database unique of individual campaign

           
      //     Card.updateOne({_id:result._id},{"donor.orderid":params.ORDER_ID,"donor.donatedmoney":params.TXN_AMOUNT,"donor.status":"Pending"},function (err, docs) { 
      //         if (err){ 
      //             console.log(err) 
      //         } 
      //         else{ 
      //             console.log("Updated Docs : ", docs); 
      //         } 
      //      })


      //     }
      //   })
     
      //  console.log("temp:",temp);
        //---------------------------------------------------------------
        // console.log("param",params.ORDER_ID);
  

     checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
        
        var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
        // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
  
        var form_fields = "";
        for (var x in params) {
          form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
        }
        form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
  
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
        res.end();

      });
    }
  })
  

  

app.post('/callback',async (req, res) => {
  var body = '';
  
  req.on('data', function (data) {
    body += data;
  });
  
  //checking-----
  console.log("inside calback",cardIdentity);
  // cardIdentity={};
  // console.log("iiiiinside calback",cardIdentity);

  // try{
  req.on('end',async function () {
    // req.on('error', (err) => {
    //   console.error(err);
    // }).on('end', function (err) {


          var html = "";
          var post_data = qs.parse(body);
          
          // received params in callback
          console.log('Callback Response: ', post_data, "\n");
        


     // verify the checksum
     var checksumhash = post_data.CHECKSUMHASH;
     // delete post_data.CHECKSUMHASH;
     var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
     console.log("Checksum Result => ", result, "\n");


     // Send Server-to-Server request to verify Order Status
     var params = {"MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID};

     checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

       params.CHECKSUMHASH = checksum;
       post_data = 'JsonData='+JSON.stringify(params);

       var options = {
         hostname: 'securegw-stage.paytm.in', // for staging
         // hostname: 'securegw.paytm.in', // for production
         port: 443,
         path: '/merchant-status/getTxnStatus',
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': post_data.length
         }
       };


       // Set up the request
       var response = "";
       var post_req = https.request(options,async function(post_res) {
         post_res.on('data', function (chunk) {
           response += chunk;
         });

         post_res.on('end',async function(err){
           console.log('S2S Response: ', response, "\n");

           var _result = JSON.parse(response);
             if(_result.STATUS == 'TXN_SUCCESS')
              {
                
                //Updating successful transaction data
                
              //   Card.updateOne({"donor.orderid":response.ORDERID},{"donor.status":"Success","donor.id":response.TXNID,$inc : {donation:Number(response.TXNAMOUNT)}},function (err, docs) { 
              //     if (err){ 
              //         console.log(err) 
              //     } 
              //     else{ 
              //         console.log("success Updated Docs in callback : ", docs); 
              //     } 
              //  })
                    
               //-----------------------------------------
                  // console.log("orderid in callback:",_result.ORDERID)
                  // console.log("orderid in callback:",typeof(_result.ORDERID))

              //  const temp=await Card.updateOne({donor:{orderid:_result.ORDERID}},{
              //    $push:{donor:{status:"Success",id:_result.TXNID},$inc:{donation:Number(_result.TXNAMOUNT)}}
              //  })

                // const temp=await Card.updateOne({donor:{$in:{orderid:_result.ORDERID,donatedmoney:_result.TXNAMOUNT,status:"Pending"}}},{
                //   $set:{"donor.$.id":_result.TXNID,"donor.$.status":"Success"}
                // })
                // const temp=await Card.findOne({donor:{$in:{orderid:_result.ORDERID,donatedmoney:_result.TXNAMOUNT,status:"Pending"}}})
                // console.log("params inside callback:",params,_result);
                // const temp=await Card.findOne({"donor.orderid":params.orderid})



                // console.log("result",result,_result)



                // Card.findOne({title:cardIdentity.title,content:cardIdentity.content},function(err,result){
                //   if(err)
                //   console.log(err)
                //   else{
                //     console.log("Campaign database id",result._id);


                //     Card.find({_id:result._id},function(err,result){
                //       if(err)
                //       console.log(err);
                //       else
                //       console.log("ALL object of campaign",result);
                //     })

                      

                //     Card.findOneAndUpdate(
                //       { _id:result._id,
                //          "donor.orderid":_result.ORDERID
                //        },
                //       { $set:{
                //          'donor.$.status': "true"
                //       }
                //       }
                //       );
    




                //   }
                // })


                const temp=await Card.updateOne({title:cardIdentity.title,content:cardIdentity.content},{
                  $push:{donor:{orderid:_result.ORDERID,donatedmoney:_result.TXNAMOUNT,status:"Success",id:_result.TXNID}
                },$inc:{donation:_result.TXNAMOUNT}})
               
                // console.log("temp",temp);

                // res.send('payment success')

                res.redirect('http://localhost:4000');
        

                //For running without "build" folder use this url
                // res.redirect('http://localhost:3000');
          
                // Card.updateOne({title:cardIdentity.title,content:cardIdentity.content},
                //   {$inc: {donation:_result.TXNAMOUNT},
                //   $set:{"donor.$.id":_result.TXNID,"donor.$.amount":_result.TXNAMOUNT}},function (err, docs) {
                //     if (err) {
                //       console.log(err);
                //     } else {
                //       res.send();
                //     }})
                
                // let _donation=Number(_result.TXNAMOUNT)
                // let _donation_id=(_result.TXNID)
                // let _donation_amount=Number(_result.TXNAMOUNT)
                // console.log("donation=",_donation)
                // console.log("donationid=",_donation_id)
                // console.log("donationamount=",_donation_amount)


                // Card.updateOne({title:cardIdentity.title,content:cardIdentity.content},
                //   {$inc: {donation:_donation},
                //   $set:{"donor.$.id":_donation_id,"donor.$.amount":_donation_amount}},function (err, docs) {
                //     if (err) {
                //       console.log(err);
                //     } else {
                //       console.log("Document",docs);
                //       res.send(docs);
                //     }})
                    
               
              
              }
             else {
 
              //Updating failure transaction data

            //   Card.updateOne({"donor.oderid":response.ORDERID},{"donor.status":"Fail"},function (err, docs) { 
            //     if (err){ 
            //         console.log(err) 
            //     } 
            //     else{ 
            //         console.log("failure Updated Docs in callback : ", docs); 
            //     } 
            //  })
             
             //---------------------------------------
             const temp=await Card.updateOne({title:cardIdentity.title,content:cardIdentity.content},{
              $push:{donor:{orderid:_result.ORDERID,donatedmoney:_result.TXNAMOUNT,status:"Fail"}
            }})
           

                //  res.send('payment failed')
                res.redirect('http://localhost:4000');
                
                
                //For running without "build" folder use this url
                // res.redirect('http://localhost:3000');




                //  res.send(err);
                //  console.log(err);
             }
           });
       });

       // post the data
       post_req.write(post_data);
       post_req.end();
      });
     
    });
  
  
  // }catch(err){
  //     console.log("hello error",err);
  //   }
    
    
})


//-------------------------------------------------------------------


app.post("/donorinfo",function(req,res){
  console.log("Click campaign data:",req.body);



 Card.findOne({title:req.body.title,content:req.body.content},function(err,result){
      if(err)
      console.log(err)
      else{
        // console.log("Campaign database id",result);//database unique of individual campaign
        
        result.donor.map((info)=>(
          info.id=(info.id).slice(0,10)+"xxxxxxxxxxxxxxxxxxxx"+((info.id).slice(30,((info.id).length)))
          ))
          
          // console.log("infoooooooooo",result);
          res.json(result);

      }
    })	


    
      
    
    
      
      
      
      
});



      





app.listen(process.env.PORT || 4000, function () {
  console.log("Server started on port 4000");
});
// app.listen(4000, function () {
//   console.log("Server started on port 4000");
// });
