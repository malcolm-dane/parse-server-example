Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hi';
});


//USE CASE: FOR A CONTACTUS FORM REPLY. 
//FROM CLIENT CREATE THE OBJECT, PASS ATLEAST THE EMAIL YOU ARE REPLYING TOO AND THIS WILL SEND.
//NOTE THIS IS WORKING. I HAD TO LOOK THROUGH ALL THE EXAMPLES ONLINE AND BASICALLY MAKE MY OWN. THIS SENDS SECURE REGARDLESS of secureConnection.
Parse.Cloud.afterSave("ContactUs", async( request) => {
  
  var EmailAdapter = require("parse-server-dedicated-email-adapter");

//where options is the same as the emailAdapter options above
//const sender= JSON.stringify(request.params.rec);
 var mailOptions = {

  host: "mailyours.com",
         //the port your smtp server is running on. 25(not secure), 587(TLS), 465(SSL). Default = 25
   port:465,  
   secureConnection: false, // TLS requires secureConnection to be false. EVen with all this set it still sends secure for some reason.
    auth: {
        user: "yours.com",
        pass: "yours"
    },
    tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    },
    
    //declare if the communication will be encrypted. false(port 25), true (587 || 465)
         // if not set, it will be guessed from the port provided. If the provided port is 587 or 465,
         // it will be set to true; if no port or 25 is provided, it will be set to false
   
         email: "contact@yours.com",//The email address of the account you're sending from
         password:"yours"//The password of the account,
   // The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…'})
 // An array of attachment objects. See [Using attachments](https://nodemailer.com/message/attachments/) for details. Attachments can be used for [embedding images](https://nodemailer.com/message/embedded-images/) as well.
};
var mailAdapter = EmailAdapter(mailOptions);



//This adapter uses [nodemailer email transport library](https://nodemailer.com), so it supports all the nodemailer options.
//To see more options, go to the nodemailer [message options documentation](https://nodemailer.com/message/)
mailAdapter.sendMail({
 to:request.object.get('to'), //This is the request param "to":"someDude@somefake.com
   subject: "hmmmm.", // Subject line
   text: ".."
})
.then(feedback => {
  console.log(feedback);
    console.log('F yeah!');

   //handle success here
})
.catch(e => {
     console.log(request.params.to);
    console.log(e);
   console.log('F NO!');

   //handle error here
});
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});
Parse.Cloud.define('A', async req => {
  const GameScore = Parse.Object.extend("GameScore");
  req.log.info(req);
  const query = new Parse.Query(GameScore);
  query.find({ useMasterKey: true });

  const results = await query.find();
  let sum = 0;
  for (let i = 0; i < results.length; ++i) {
     const object = results[i];
  }
  return object
});
Parse.Cloud.beforeSave('Test', () => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});
Parse.Cloud.define("average", async (request) => {
  const query = new Parse.Query("GameScore");
  
  const results = await query.find({useMasterKey: true});
  let sum = 0;
  for (let i = 0; i < results.length; ++i) {
    sum += results[i];
  }
  return results;
});
