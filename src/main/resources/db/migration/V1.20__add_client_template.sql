create table CLIENT_TEMPLATE (
    id bigint not null,
    name varchar(255),
    street varchar(255),
    house_number varchar(255),
    city varchar(255),
    zip_code varchar(255),
    service_catalog_id bigint,
    primary key (id)
);

alter table CLIENT_TEMPLATE
    add constraint UNIQUE_CLIENT_TEMPLATE unique (name);

INSERT INTO SERVICE_CATALOG VALUES (2, 'Data-Concept');
INSERT INTO CLIENT_TEMPLATE VALUES (1, 'BRUNATA Wärmemesser Hagen GmbH & Co KG','Doberanerweg','10','Hamburg','22143',1);
INSERT INTO CLIENT_TEMPLATE VALUES (2, 'Data-Concept Energiemessdienst','Sophienblatt','57','Kiel','24114',2);

ALTER TABLE CLIENT_TEMPLATE ALTER COLUMN service_catalog_id SET NOT NULL;

alter table CLIENT_TEMPLATE
      add constraint SERVICE_CATALOG_FK
        foreign key (service_catalog_id)
          references SERVICE_CATALOG;


