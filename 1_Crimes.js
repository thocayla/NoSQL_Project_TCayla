db.getCollection('Crimes').find({}).count() // 5101231 crimes recorded

db.getCollection('Crimes').distinct("LAW_CAT_CD") // 3 types: FELONY, MISDEMEANOR and VIOLATION

db.getCollection('Crimes').find({
    LAW_CAT_CD: { $eq: "VIOLATION" }, 
    PARKS_NM: { $ne: "" } 
}).count() // 400 crimes with violation near a Park

// Number of crimes per type
db.getCollection('Crimes').aggregate([
{ 
    $group: 
    { _id: "$LAW_CAT_CD", 
        Total: { $sum: 1 } 
     } 
},
{ $sort: { Total: -1 } }
])

// Number of crimes per borough
db.getCollection('Crimes').aggregate([
{ $match : { 
    BORO_NM :{$ne: ""} 
}},
{ 
    $group: 
    { 
        _id: "$BORO_NM", 
        Total: { $sum: 1 } 
    } 
},
{ $sort: { Total: -1 } }
])

// Number of crimes per borough and per type
db.getCollection('Crimes').aggregate([
{ $group: { 
    _id: {
        Borough: "$BORO_NM", 
        Type: "$LAW_CAT_CD"}, 
        Total: { $sum: 1 } 
        } 
},
{ $sort: { Total: -1 } }
])

// Query to collect the year
db.getCollection('Crimes').aggregate(
   [
     {
       $project:
          {
              CMPLNT_NUM: "$CMPLNT_NUM",
              LAW_CAT_CD: "$LAW_CAT_CD",
              BORO_NM: "$BORO_NM",
              PARKS_NM: "$PARKS_NM",
              Latitude: "$Latitude",
              Longitude: "$Longitude",
              Year: { 
                  $substr: [ "$CMPLNT_FR_DT", 6, 4 ] 
                  }
          }
      },
      { $out : "Crimes_Year" }
])