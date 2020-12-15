ALTER TABLE ORDER_TABLE ADD COLUMN client_name varchar(255);
ALTER TABLE ORDER_TABLE ADD COLUMN client_street varchar(255);
ALTER TABLE ORDER_TABLE ADD COLUMN client_house_number varchar(255);
ALTER TABLE ORDER_TABLE ADD COLUMN client_city varchar(255);
ALTER TABLE ORDER_TABLE ADD COLUMN client_zip_code varchar(255);

Update ORDER_TABLE set client_street = 'Doberanerweg' where client_street is NULL;

Update ORDER_TABLE set client_house_number = '10' where client_house_number is NULL;

Update ORDER_TABLE set client_city = 'Hamburg' where client_city is NULL;

Update ORDER_TABLE set client_zip_code = '22143' where client_zip_code is NULL;

Update ORDER_TABLE set client_name = 'BRUNATA Wärmemesser Hagen GmbH & Co KG' where client_name is NULL;
