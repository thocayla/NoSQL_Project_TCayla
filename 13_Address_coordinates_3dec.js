// Query to collect the two fields latitude and longitude, with 3 decimals
db.getCollection('Address_best_zip').aggregate(
   [
     {
         $project:
              {
                ADDRESS_ID: "$ADDRESS_ID",
                the_geom: "$the_geom",
                ZIPCODE: "$ZIPCODE",
                ST_NAME: "$ST_NAME",
                Longitude: { $substr: [ "$the_geom", 7, 7 ] },
                Latitude: { $substr: [ "$the_geom", 26, 6 ] }
              }
        },
    { $out : "Address_coordinates_3dec" }
])