// Query to convert the coordinates latitude and longitude into geoJSON objects
db.getCollection('Crimes').find().forEach(function(element) {
    element.loc = {
        "type": "Point", 
        "coordinates": [element.Longitude, element.Latitude]
    };
    db.getCollection('Crimes').save(element);
});

// Query to collect all the distinct crimes coordinates
db.getCollection('Crimes').aggregate([
{ 
    $group: { _id: "$loc" } 
},
   { $out : "Crimes_coordinates" }
])

