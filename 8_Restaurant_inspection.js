// Cuisine description
db.getCollection('Restaurant').distinct("CUISINE DESCRIPTION")

// Grade Inspection
db.getCollection('Restaurant').distinct("GRADE")

// Action description
db.getCollection('Restaurant').distinct("ACTION")

// List of no critical restaurant, with a grade A, for only Bakery and Café/Tea, and without the Bronx
db.getCollection('Restaurant').aggregate([
{ 
    $match: { 
        "BORO": { $nin: ["BRONX", ""] },
        "CUISINE DESCRIPTION": { $in: ["CafÃ©/Coffee/Tea", "Bakery"] },
        "GRADE": {$eq: "A"},
        "ACTION": {$eq: "No violations were recorded at the time of this inspection."}
            }
},
{ 
    $group: { 
        _id: "$ZIPCODE"
            } 
}, 
{ $sort: { _id: 1 }  },
{ $out : "Restaurant_ZIP" }
])