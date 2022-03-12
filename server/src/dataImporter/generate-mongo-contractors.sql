COPY (
  SELECT array_to_json(array_agg(t))
FROM (
  SELECT
	empl.id,
	empl."firstName",
	empl."lastName",
	empl."taxIdent",
	empl."technicianId",
	empl."email",
	empl."phone",
  (SELECT row_to_json(a) FROM (VALUES (empl.street, empl.city, empl."zipCode", empl."houseNumber")) AS a (street, city, "zipCode","houseNumber")) as address,
  (SELECT row_to_json(a) FROM (VALUES (empl.bic, empl."iban", empl."bankName")) AS a (bic, iban, "bankName")) as "bankDetails"
  FROM employee empl
) t
) TO STDOUT
