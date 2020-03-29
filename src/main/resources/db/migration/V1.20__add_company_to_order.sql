ALTER TABLE order_table ADD COLUMN company_id bigint ;
Update order_table set company_id = 1 where company_id is null;
ALTER TABLE order_table ALTER company_id set NOT NULL;


