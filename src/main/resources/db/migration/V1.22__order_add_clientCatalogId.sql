ALTER TABLE ORDER_TABLE ADD COLUMN SERVICE_CATALOG_ID bigint;

Update ORDER_TABLE set service_catalog_id = 1
where service_catalog_id is NULL;

ALTER TABLE ORDER_TABLE ALTER COLUMN service_catalog_id SET NOT NULL;