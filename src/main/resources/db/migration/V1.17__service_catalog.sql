create table SERVICE_CATALOG (
    id bigint not null,
    name varchar(255),
    primary key (id)
);

alter table SERVICE_CATALOG
    add constraint UNIQUE_SERVICE_CATALOG unique (name);

INSERT INTO SERVICE_CATALOG VALUES (1, 'Brunata');

ALTER TABLE service ADD COLUMN service_catalog_id bigint;

Update service set service_catalog_id = 1
where service_catalog_id is NULL;

ALTER TABLE service ALTER COLUMN service_catalog_id SET NOT NULL;

alter table service
      add constraint SERVICE_CATALOG_FK
        foreign key (service_catalog_id)
          references SERVICE_CATALOG;