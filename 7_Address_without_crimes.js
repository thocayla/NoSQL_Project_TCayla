// Query to convert the coordinates into geoJSON objects
db.getCollection('Address_coordinates').find().forEach(function(element) {
    element.loc = {
        "type": "Point", 
        "coordinates": [element.Longitude, element.Latitude]
    };
    db.getCollection('Address_coordinates').save(element);
});

// First join: Find the address without crimes
db.getCollection('Address_coordinates').aggregate([
    {
       $lookup:
         {
           from: "Crimes_coordinates",
           localField: "loc",
           foreignField: "_id",
           as: "address_crimes"
         }
    },
   {
      $match: { 
          "address_crimes": { $eq: [] }
              }
   },
    { $out : "Address_without_crimes" }
])
    