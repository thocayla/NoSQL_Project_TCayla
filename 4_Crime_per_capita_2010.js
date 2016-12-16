// Query to compute the crime rate per capita in 2010
db.getCollection('Crimes_2010').aggregate(
   [
      {
         $project:
           {
             _id: 1,
             Crime_per_capita:
               {
                 $cond: { if: { $eq: [ "$_id", "STATEN ISLAND" ] }, 
                 then: { $divide: [ "$Number_of_crimes_2010", 468730 ] },
                 else: {
                     $cond: {
                         if: { "$eq": ["$_id", "BRONX"]}, 
                         then: { $divide: [ "$Number_of_crimes_2010", 1385108 ] },
                         else: {
                             $cond: {
                                 if: { "$eq": ["$_id", "MANHATTAN"]},
                                 then: { $divide: [ "$Number_of_crimes_2010", 1585873 ] },
                                 else: {
                                     $cond: {
                                         if: { "$eq": ["$_id", "QUEENS"]},
                                         then: { $divide: [ "$Number_of_crimes_2010", 2230722 ] },
                                         else: {
                                             $cond: {
                                                 if: { "$eq": ["$_id", "BROOKLYN"]},
                                                 then: { $divide: [ "$Number_of_crimes_2010", 2504700 ] },
                                                 else: "Not found."
                                                    }
                                                }
                                            } 
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
   { $sort: { "Crime_per_capita": -1 } }
   ]
)
