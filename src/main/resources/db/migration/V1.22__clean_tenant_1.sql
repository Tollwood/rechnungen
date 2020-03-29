DELETE FROM order_table_services where order_table_id is NOT NULL;
DELETE FROM service_order where service_id is NOT NULL;
DELETE FROM ORDER_TABLE where company_id = 1;
DELETE FROM service where company_id = 1;