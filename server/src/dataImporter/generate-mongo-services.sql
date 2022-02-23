COPY (SELECT array_to_json(array_agg(t))
FROM (
 SELECT 
  	  id,
	"articleNumber",
	price,
	title,
	selectable,
   "serviceCatalogId"
  FROM service
) t) TO STDOUT
