// Query to convert the coordinates into geoJSON objects
db.getCollection('Subway_coordinates_3dec').find().forEach(function(element) {
    element.loc = {
        "type": "Point", 
        "coordinates": [element.Longitude, element.Latitude]
    };
    db.getCollection('Subway_coordinates_3dec').save(element);
});