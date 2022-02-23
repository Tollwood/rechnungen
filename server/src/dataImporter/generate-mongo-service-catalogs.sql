COPY (SELECT array_to_json(array_agg(t))
FROM (
 SELECT 
  	  id ,
	name
  FROM service_catalog
) t) TO STDOUT
