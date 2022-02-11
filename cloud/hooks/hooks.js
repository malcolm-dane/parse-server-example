Parse.Cloud.define("SMS", async request => {
    Parse.Cloud.useMasterKey();
var images = new Parse.Query("Employee");
var bunny_data = [];
images.exists('name');

images.find({
    success: function(objects) {
         console.log("worked");
        for(var i = 0;i<objects.length;i++){
            var object =  objects[i];
            object.get('name');

        };
    },
    error: function(error) {
        console.log("An error occured :(");
    }
});
});
Parse.Cloud.define("noSMS", async request => {
var images = new Parse.Query("Employee");
var bunny_data = [];
 images.equalTo("name","joe");
images.find({ useMasterKey: true }).then((results) => {
  // results is an array of parse.object.
for (let i = 0; i < results.length; i++) {
  const object = results[i];
return object;
}
    
    

}).catch((error) =>  {
console.log(error);

 // error is an instance of parse.error.
}
);

}
);
Parse.Cloud.define("Dogs", async (request) => {
    // Returns all Dogs that are between two given ages
    const query = new Parse.Query("Employee");
    query.exists("name")
    const results = await query.find({ useMasterKey: true });
    return results
});

Parse.Cloud.define("Stars", async (request) => {
  const config = await Parse.Config.get({useMasterKey: true});
const privateParam = config.get("privateParam");
 
  const { log, message } = request;
  const query = new Parse.Query("Requests");
  query.exists("username");
  const results = await query.find({ useMasterKey: true, requireUser: false});
  console.log(results);
},{
  requireUser: false
});
Parse.Cloud.define("aBStars", async (request) => {
var images = new Parse.Query("docText");
var bunny_data = [];
images.each(function (object, error) {
    object.destroy({
        success: function (object) {
            console.log("Successfully destroyed object.")
        },
        error: function (error) {
            console.log("Error: " + error.code + " - " + error.message)
        },
        useMasterKey: true
   })
})
});
Parse.Cloud.define("count", async (request) => {
    const query = new Parse.Query("Employee");
    const count = await query.find({ useMasterKey: true });
    console.log("*** count=" + count.get('name'));
    return {"count": count};

    // or if you really need to reject:
    // return count >= 0 ? Promise.resolve(count) : Promise.reject();
});



Parse.Cloud.define("aStars", async (request) => {
var images = new Parse.Query("Employee");
var bunny_data = [];

images.find({
    success: function(objects) {
        for(var i = 0;i<objects.length;i++){
            var object =  objects[i];
            object.get('name')===String;

        };
        
        let privateChats = images.find({ useMasterKey: true });
    return privateChats;
    },
    error: function(error) {
        console.log("An error occured :(");
    }
});
});
      Parse.Cloud.define("bStars", async (request) => {
          const employee = Parse.Object.extend("Employee");
const query = new Parse.Query(employee);
query.doesNotExist("bbb");
query.include("name");
 query.find({useMasterKey: true, requireUser: false}).then((results) => {

  for (let i = 0; i < results.length; ++i) {
   console.log(query[i].get('name')===undefined);
  }
   
     // results is an array of parse.object.
}).catch((error) =>  {
     
     console.log(error); 
 // error is an instance of parse.error.
})

});


 
Parse.Cloud.define("getStars", async (request) => {

  try {

    var AnimalProfiles = Parse.Object.extend("Requests");
    var query = new Parse.Query(AnimalProfiles);

    // note new return!!
     return query.find({useMasterKey: true, requireUser: false}).then((animalProfile) => {

        var AnimalWeights = animalProfile.get("username").query();

        AnimalWeights.descending("createdAt");

        let result = AnimalWeights.first();
        return result;

    }, (error) => {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
        console.log("Uh Oh Inner");
        console.log("Error Inner: "+  error);
    });

  } catch (e) {
    console.log("Uh Oh");
    console.log("Error: "+  e);
  }


});
