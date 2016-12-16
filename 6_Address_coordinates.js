// Query to collect the two fields latitude and longitude, and remove Bronx 
db.getCollection('Address').aggregate(
   [{
       $match: { 
          "BOROCODE": { $ne: 2 }
         }
     },
     {
         $project:
              {
                ADDRESS_ID: "$ADDRESS_ID",
                the_geom: "$the_geom",
                BOROCODE: "$BOROCODE",
                ZIPCODE: "$ZIPCODE",
                ST_NAME: "$ST_NAME",
                Longitude: { $substr: [ "$the_geom", 7, 13 ] },
                Latitude: { $substr: [ "$the_geom", 26, 12 ] }
              }
        },
    { $out : "Address_coordinates" }
])
