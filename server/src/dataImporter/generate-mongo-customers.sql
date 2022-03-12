COPY (SELECT array_to_json(array_agg(t))
FROM (
  SELECT
	customer.name,
  customer."serviceCatalogId",
	(SELECT row_to_json(a) FROM (VALUES (customer.street, customer.city, customer."zipCode", customer."houseNumber")) AS a (street, city, "zipCode","houseNumber")) as address
	  FROM client_template customer
) t) TO STDOUT