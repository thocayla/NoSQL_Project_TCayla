#!/bin/bash

#Import datasets

mongoimport -d NYC -c Crimes --type csv --file ./NYPD_Complaint_Data_Historic.csv --headerline

mongoimport -d NYC -c Population --type csv --file ./New_York_City_Population_By_Census_Tracts.csv --headerline

mongoimport -d NYC -c Address --type csv --file ./AddressPoint.csv --headerline

mongoimport -d NYC -c Restaurant --type csv --file ./DOHMH_New_York_City_Restaurant_Inspection_Results.csv --headerline

mongoimport -d NYC -c Art --type csv --file ./ART_GALLERY.csv --headerline

mongoimport -d NYC -c Subway --type csv --file ./DOITT_SUBWAY_ENTRANCE_01_13SEPT2010.csv --headerline

#Import end
