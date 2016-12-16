// Query to collect the two fields latitude and longitude, with 3 decimals
db.getCollection('Subway').aggregate(
   [
     {
         $project:
              {
                the_geom: "$the_geom",
                NAME: "$NAME",
                Longitude: { $substr: [ "$the_geom", 7, 7 ] },
                Latitude: { $substr: [ "$the_geom", 26, 6 ] }
              }
        },
    { $out : "Subway_coordinates_3dec" }
])
    