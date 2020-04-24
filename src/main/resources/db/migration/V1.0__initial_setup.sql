create sequence hibernate_sequence start with 100 increment by 1;

create table EMPLOYEE (
    id bigint not null,
    first_name varchar(255),
    last_name varchar(255),
    tax_ident varchar(255),
    technician_id varchar(255) NOT NULL ,
    street varchar(255),
    house_number varchar(255),
    city varchar(255),
    zip_code varchar(255),
    CREATED_AT timestamp,
    primary key (id)
);

create table instrumentation_type (
    id bigint not null,
    name varchar(255) not null,
    primary key (id)
);

create table order_table (
    id bigint not null,
    location varchar(255),
    name varchar(255),
    order_id varchar(255),
    phone_number varchar(255),
    type integer,
    utilisation_unit varchar(255),
    first_appointment varchar(255),
    second_appointment varchar(255),
    real_estate_id bigint,
    technician_id bigint,
    small_order boolean,
    status varchar(255),
    include_km_fee boolean,
    bill_no varchar(255),
    bill_date varchar(255),
    payment_recieved_date varchar(255),
    CREATED_AT timestamp,
    prev_status varchar(255),
    distance decimal NOT NULL,
    real_estate_street varchar(255),
    real_estate_house_number varchar(255),
    real_estate_city varchar(255),
    real_estate_zip_code varchar(255),
    canceled boolean DEFAULT FALSE,
    primary key (id)
);

create table order_table_services (
    order_table_id bigint not null,
    services_id bigint not null
);

create table real_estate (
    id bigint not null,
    name varchar(255),
    street varchar(255),
    house_number varchar(255),
    zip_code varchar(255),
    city varchar(255),
    distance decimal not null,
    CREATED_AT timestamp,
    primary key (id)
);

create table service (
    id bigint not null,
    article_number varchar(255),
    price decimal,
    title varchar(255),
    selectable boolean default true,
    CREATED_AT timestamp,
    primary key (id)
);

create table service_order (
    id bigint not null,
    amount integer not null,
    service_id bigint,
    order_id bigint,
    primary key (id)
);

alter table order_table
    add constraint UK_7bdtvg39pj29l98k4au2lqfqm unique (order_id);

alter table order_table_services
    add constraint UK_rwmgenc85uqsrvcn3rvio7deu unique (services_id);

alter table order_table
  add constraint ORDER_REAL_ESTATE_FK
    foreign key (real_estate_id)
      references real_estate;

alter table order_table
  add constraint ORDER_EMPLOYEE_FK
    foreign key (technician_id)
      references EMPLOYEE;

alter table order_table_services
  add constraint FK1koaxhe8aouyj1lvi44djsio5
    foreign key (services_id)
      references service_order;

alter table order_table_services
  add constraint FK9t1b108s74kq8o05kgb70qmcq
    foreign key (order_table_id)
      references order_table;

alter table service_order
  add constraint FK2m1fn4id32tpsgvgh427cvyc8
    foreign key (service_id)
      references service;

create table COMPANY (
                       id bigint not null,
                       name varchar(255),
                       bill_no bigint,
                       logo varchar(255),
                       phone varchar(255),
                       email varchar(255) NOT NULL ,

                       city varchar(255),
                       house_number varchar(255),
                       street varchar(255),
                       zip_code varchar(255),

                       bank_name varchar(255),
                       iban varchar(255),
                       bic varchar(255),
                       primary key (id)
);

create table bill_item (
                         code varchar(255) NOT NULL ,
                         price decimal,
                         amount integer,
                         service_name varchar(255),
                         order_id bigint NOT NULL ,
                         primary key (code, order_id)
);

ALTER TABLE employee DROP CONSTRAINT IF EXISTS UK_technician_id;
ALTER TABLE employee
  add constraint UK_technician_id unique (technician_id);

ALTER TABLE real_estate DROP CONSTRAINT IF EXISTS UK_name;
ALTER TABLE real_estate
  add constraint UK_name unique (name);

ALTER TABLE service DROP CONSTRAINT IF EXISTS UK_article_number;
ALTER TABLE service
  add constraint UK_article_number unique (article_number);

ALTER TABLE order_table DROP CONSTRAINT IF EXISTS UK_7bdtvg39pj29l98k4au2lqfqm;
ALTER TABLE order_table
  add constraint UK_order_id unique (order_id);


ALTER TABLE order_table_services DROP CONSTRAINT IF EXISTS UK_rwmgenc85uqsrvcn3rvio7deu;
ALTER TABLE order_table_services
  add constraint UK_services_id unique (services_id);

ALTER TABLE order_table_services DROP CONSTRAINT IF EXISTS FK1koaxhe8aouyj1lvi44djsio5;
ALTER TABLE order_table_services
  add constraint FK_order_table_services_service_order
    foreign key (services_id)
      references service_order;

ALTER TABLE order_table_services DROP CONSTRAINT IF EXISTS FK9t1b108s74kq8o05kgb70qmcq;
alter table order_table_services
  add constraint FK_order_table_services_order_table
    foreign key (order_table_id)
      references order_table;

ALTER TABLE service_order DROP CONSTRAINT IF EXISTS FK2m1fn4id32tpsgvgh427cvyc8;
alter table service_order
  add constraint FK_service_order_service
    foreign key (service_id)
      references service;

ALTER TABLE bill_item DROP CONSTRAINT IF EXISTS FK_service_order_order_table;
alter table bill_item
  add constraint FK_service_order_order_table
    foreign key (order_id)
      references order_table;

DROP TABLE instrumentation_type;

ALTER TABLE order_table drop COLUMN type;


/** FK service_order.order_id**/
/** FK service_order.service_id**/


ALTER TABLE EMPLOYEE ADD COLUMN email VARCHAR(255);
ALTER TABLE EMPLOYEE ADD COLUMN phone VARCHAR(255);
ALTER TABLE EMPLOYEE ADD COLUMN bic VARCHAR(255);
ALTER TABLE EMPLOYEE ADD COLUMN iban VARCHAR(255);
ALTER TABLE EMPLOYEE ADD COLUMN BANK_NAME VARCHAR(255);

ALTER TABLE EMPLOYEE ALTER COLUMN  email SET NOT NULL;
ALTER TABLE EMPLOYEE ALTER COLUMN  phone SET NOT NULL;
ALTER TABLE EMPLOYEE ALTER COLUMN  bic SET NOT NULL;
ALTER TABLE EMPLOYEE ALTER COLUMN  iban SET NOT NULL;
ALTER TABLE EMPLOYEE ALTER COLUMN  BANK_NAME SET NOT NULL;


ALTER TABLE COMPANY DROP COLUMN  bank_name;
ALTER TABLE COMPANY DROP COLUMN  IBAN;
ALTER TABLE COMPANY DROP COLUMN  BIC;