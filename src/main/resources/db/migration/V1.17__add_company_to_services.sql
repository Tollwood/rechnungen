ALTER TABLE service ADD COLUMN company_id bigint ;
Update service set company_id = 1 where company_id is null;
ALTER TABLE service ALTER company_id set NOT NULL;


