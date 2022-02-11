// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const args = process.argv || [];
const test = false;

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
var allowInsecureHTTP = true;
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
const config = {
  databaseURI: databaseUri || 'mongodb+srv://me:ADDYOURS@cluster0.svzzo.mongodb.net/myDb?retryWrites=true&w=majority',
  cloud: process.env.PARSE_SERVER_CLOUD || './cloud/main.js',
  appId: process.env.APP_ID || 'ID',
  masterKey: process.env.MASTER_KEY || 'KEY', //Add your master key here. Keep it secret!
  parseMount: process.env.PARSE_MOUNT|| '/parse',
  serverURL: process.env.SERVER_URL || 'https://ADDYOURS.herokuapp.com/parse', // Don't forget to change to https if needed

  liveQuery: {
    classNames: ['aRequest'], // List of classes to support for query subscriptions
  },
   
};
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
if (!test) {
 const api = new ParseServer({
  databaseURI: databaseUri || 'mongodb+srv://me:YOURS@cluster0.svzzo.mongodb.net/myDb?retryWrites=true&w=majority',
  cloud: process.env.PARSE_SERVER_CLOUD || './cloud/main.js',
  appId: process.env.APP_ID || 'backend',
  masterKey: process.env.MASTER_KEY || 'abcde', //Add your master key here. Keep it secret!
  parseMount: process.env.PARSE_MOUNT|| '/parse',
  serverURL: process.env.SERVER_URL || 'https://yours.herokuapp.com/parse', // Don't forget to change to https if needed,
emailAdapter: {
      module: "parse-server-dedicated-email-adapter",
      options: {
         //your mail server smtp host. If empty, it will be guessed from the email option
         // for example, provided the host is empty and the email is doc@api.com, the 
         // smtp host will be set as mail.api.com
         host: "mail.yours.com",
         //the port your smtp server is running on. 25(not secure), 587(TLS), 465(SSL). Default = 25
         port: 465,
         //declare if the communication will be encrypted. false(port 25), true (587 || 465)
         // if not set, it will be guessed from the port provided. If the provided port is 587 or 465,
         // it will be set to true; if no port or 25 is provided, it will be set to false
         secure:true,
         email: 'contact-us@tyours.com',//The email address of the account you're sending from
         password:"##########!"//The password of the account,
         
      }
   },
  pages: {
    enableRouter: true, // Enables the experimental feature; required for custom routes
    customRoutes: [{
      method: 'GET',
      path: '/flow',
      handler: async request => {
        // custom logic
        // ...
        // then, depending on the outcome, return a HTML file as response
        return { file: '/demo/index.html' };
      },
      method: 'GET',
      path: '/tok',
      handler: async request => {
        // custom logic
        // ...
        // then, depending on the outcome, return a HTML file as response
        return { file: '/tok/contactus.html' };
      }

    }]
  }
});


  app.use('/demo', express.static(path.join(__dirname, '/demo')));
   app.use('/tok', express.static(path.join(__dirname, '/tok')));
   app.use('/engine', express.static(path.join(__dirname, '/engine')));
  app.use(mountPath, api);}

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of working fdlawlessly on heroku with a MongoDB Atlas. Only using this to demo something in android compose');
});
app.post('/B', function (req, res) {
    
    
 res.status(200).send(Parse.Cloud.run("B"));

});



const port = process.env.PORT || 5000;
if (!test) {
  const httpServer = require('http').createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server-example running on heroku port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);
}
var bodyParser = require('body-parser');
app.use( bodyParser.json() );

app.post('/api/cloud/functions/B', function(request, response) { 
  var body = request.body;
  var id = body.id;

  var params = {
    id : id
  }
  
  Parse.Cloud.run("B", params,{
   success:function(e){
    response.status(200).send(e);
   },
   error:function(e){
    response.status(-1).send(e);
   }
  });
});


module.exports = {
  app,
  config,
};
