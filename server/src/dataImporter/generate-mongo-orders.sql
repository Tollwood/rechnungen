COPY (

SELECT array_to_json(array_agg(t))
FROM (
  SELECT
	orderT.id,
	orderT.location,
	orderT.name,
	orderT."orderId",
	orderT."phoneNumber",
	orderT."utilisationUnit",
	orderT."firstAppointment",
	orderT."secondAppointment",
	orderT."smallOrder",
	orderT.status,
	orderT."prevStatus",
	orderT."includeKmFee",
	orderT."paymentRecievedDate",
	orderT.distance,
	orderT.canceled,
	orderT."taxRate",
	orderT."serviceCatalogId",
  (SELECT row_to_json(a) FROM (VALUES (orderT."clientName", 
									   (SELECT row_to_json(address) FROM ( SELECT * FROM(VALUES( orderT."clientStreet", orderT."clientCity", orderT."clientZipcode", orderT."clientHousenumber")) as t(street, city, "zipCode", "houseNumber")) as address)
									  )) AS a (name,address)) as customer,
  (SELECT row_to_json(e) FROM (VALUES ( emp.id, emp."firstName", emp."lastName",emp."taxIdent", emp."technicianId",emp.email, emp.phone,
									  (SELECT row_to_json(address) FROM (SELECT * FROM(VALUES( emp.street, emp.city, emp."zipCode", emp."houseNumber")) as t(street, city, "zipCode", "houseNumber")) as address),
									   (SELECT row_to_json(bankDetails) FROM (SELECT * FROM(VALUES( emp.bic, emp.iban, emp."bankName")) as t(bic,iban, "bankName")) as bankDetails)
									  )) AS e (id,"firstName","lastName","taxIdent","technicianId",email,phone,address, "bankDetails")) as contractor,
	  (SELECT row_to_json(a) FROM (VALUES ( 
		  real.name,
									   (SELECT row_to_json(address) FROM ( SELECT * FROM(VALUES( orderT."realEstateStreet", orderT."realEstateCity", orderT."realEstateZipcode", orderT."realEstateHousenumber")) as t(street, city, "zipCode", "houseNumber")) as address)
									  )) AS a (name,address)) as "realEstate",
		  (SELECT row_to_json(a) FROM (VALUES ( 
		  orderT."billNo",
	orderT."billDate",
			  (select array_to_json(array_agg(t))
					 FROM ( Select * from bill_item where "orderId" = orderT.id  ) as t) 
									  )) AS a ("billNo","billDate","billItems")) as bill
	
  FROM order_table orderT
	inner join employee emp on orderT."employeeId" = emp.id
	inner join real_estate real on orderT."realEstateId" = real.id
) t

) TO STDOUT