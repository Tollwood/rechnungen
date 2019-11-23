DELETE FROM bill_item where order_id is null;
DELETE FROM bill_item where code is null;

ALTER TABLE bill_item DROP CONSTRAINT bill_item_pkey;

ALTER TABLE bill_item DROP COLUMN id;

ALTER TABLE bill_item ALTER COLUMN  code SET NOT NULL;
ALTER TABLE bill_item ALTER COLUMN  order_id SET NOT NULL;

ALTER TABLE bill_item ADD PRIMARY KEY (code, order_id);