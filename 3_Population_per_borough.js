// Year of census
db.getCollection('Population').distinct("Year")

// Number of inhabitant per borough, from the last census (2010)
db.getCollection('Population').aggregate([
{ 
    $match : 
    { Year : { $eq: 2010 } } 
},
{ 
    $group: 
    { 
    _id: "$Borough", 
    Population_2010: { $sum: "$Population" }
    } 
}, 
{ $sort: { Population_2010: -1 }  }
])

