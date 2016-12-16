// Number of crimes per year (Top 10)
db.getCollection('Crimes_Year').aggregate([
{ 
    $group: 
    { 
        _id: "$Year", 
        Total: { $sum: 1 } 
    } 
},
{ $sort: { Total: -1 } },
{ $limit : 10 }
])

// Number of crimes per borough in 2010
db.getCollection('Crimes_Year').aggregate([
{ $match : { 
    "Year" :{$eq: "2010"} 
    }
},
{ $group: 
    { 
        _id: "$BORO_NM", 
        Number_of_crimes_2010: { $sum: 1 }
    } 
}, 
{ $sort: { Number_of_crimes_2010: -1 } },
{ $out : "Crimes_2010" }
])