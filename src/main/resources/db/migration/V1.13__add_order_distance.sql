ALTER TABLE ORDER_TABLE ADD COLUMN distance decimal;

Update ORDER_TABLE set distance = (Select distance from real_estate where id = order_table.real_estate_id)
where distance is NULL;

ALTER TABLE ORDER_TABLE ALTER COLUMN  distance SET NOT NULL;