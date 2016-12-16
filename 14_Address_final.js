// Query to convert the coordinates into geoJSON objects
db.getCollection('Address_coordinates_3dec').find().forEach(function(element) {
    element.loc = {
        "type": "Point", 
        "coordinates": [element.Longitude, element.Latitude]
    };
    db.getCollection('Address_coordinates_3dec').save(element);
});

// Find the address near a subway entrance
db.getCollection('Address_coordinates_3dec').aggregate([
    {
       $lookup:
         {
           from: "Subway_coordinates_3dec",
           localField: "loc",
           foreignField: "loc",
           as: "station_entrances"
         }
    },
   {
      $match: { 
          "station_entrances": { $ne: [] }
              }
   },
   { 
       $group: { 
           _id: "$loc", 
           Total: { $sum: 1 } 
           } 
   },
   { $sort: { Total: -1 } },
   { $limit: 1 }
])
    