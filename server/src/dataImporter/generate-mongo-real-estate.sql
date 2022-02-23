COPY (SELECT array_to_json(array_agg(t))
FROM (
  SELECT
	real.id,
	real.name,
	real.distance,
  (SELECT row_to_json(a) FROM (VALUES (real.street, real.city, real."zipCode", real."houseNumber")) AS a (street, city, zipCode,houseNumber)) as address
  FROM real_estate real
) t) TO STDOUT

