// Best address to live in according to the best ZIP found with the Art Gallery dataset
db.getCollection('Address_without_crimes').aggregate([
    {
       $lookup:
         {
           from: "Art_ZIP_1",
           localField: "ZIPCODE",
           foreignField: "_id",
           as: "address_best_zip"
         }
    },
   {
      $match: { "address_best_zip": { $ne: [] } }
   },
   {
      $out: "Address_best_zip" 
   }
])
