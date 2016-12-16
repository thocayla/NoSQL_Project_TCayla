// Number of Art Gallery in NYC:
db.getCollection('Art').find({}).count() // 917

// Number of Art Gallery per city:
db.getCollection('Art').aggregate([
{
    $match: {  "ZIP" : { $ne: null } }
},
{ 
    $group: { _id: "$CITY", 
              Total: { $sum: 1 } 
            }
},
{ $sort: { Total: -1 } }
])

// Number of Art Gallery per ZIP according to the previous results (Restaurant ZIP):
db.getCollection('Art').aggregate([
    {
       $lookup:
         {
           from: "Restaurant_ZIP",
           localField: "ZIP",
           foreignField: "_id",
           as: "zip_art"
         }
    },
   {
      $match: { "zip_art": { $ne: [] } }
   },
   { 
       $group: { 
               _id: "$ZIP", 
               Total: { $sum: 1 } 
             } 
   },
   { $sort: { Total: -1 } }
])
   
// Same with limit to 1 ZIP:
db.getCollection('Art').aggregate([
    {
       $lookup:
         {
           from: "Restaurant_ZIP",
           localField: "ZIP",
           foreignField: "_id",
           as: "zip_art"
         }
    },
   {
      $match: { "zip_art": { $ne: [] } }
   },
   { 
       $group: { 
               _id: "$ZIP", 
               Total: { $sum: 1 } 
             } 
   },
   { $sort: { Total: -1 } },
   { $limit: 1},
   { $out: "Art_ZIP_1" }
])
   