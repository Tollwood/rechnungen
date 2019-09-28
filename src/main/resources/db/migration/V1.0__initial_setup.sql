create sequence hibernate_sequence start with 100 increment by 1;

create table EMPLOYEE (
    id bigint not null,
    first_name varchar(255),
    last_name varchar(255),
    tax_ident varchar(255),
    technician_id varchar(255) NOT NULL ,
    city varchar(255),
    house_number varchar(255),
    street varchar(255),
    zip_code varchar(255),
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
    primary key (id)
);

create table order_table_services (
    order_table_id bigint not null,
    services_id bigint not null
);

create table real_estate (
    id bigint not null,
    name varchar(255),
    city varchar(255),
    house_number varchar(255),
    street varchar(255),
    zip_code varchar(255),
    distance decimal not null,
    primary key (id)
);

create table service (
    id bigint not null,
    article_number varchar(255),
    price decimal,
    title varchar(255),
    selectable boolean default true,
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

INSERT INTO service VALUES (1, '1A', 17.5, 'Liegeschaftspauschale', false );
INSERT INTO service VALUES (46, '1B', 7.5, 'Anfahrt bis 30 km', false );
INSERT INTO service VALUES (47, '1C', 15, 'Anfahrt bis 40 km', false );
INSERT INTO service VALUES (48, '1D', 22.5, 'Anfahrt bis 50 km', false );
INSERT INTO service VALUES (49, '1E', 0.75, 'Anfahrt über 50 km', false );
INSERT INTO service VALUES (2, '1F', 2, 'Zuschlag Kleinauftrag', false );
INSERT INTO service VALUES (3, '2A', 1, 'abl. HKVK', true );
INSERT INTO service VALUES (4, '2B', 1, 'Abl.  tPlus / tStar', true );
INSERT INTO service VALUES (5, '2C', 1, 'Abl. Wasserzähler', true);
INSERT INTO service VALUES (6, '2D', 1, 'Abl. WMZ', true);
INSERT INTO service VALUES (7, '2E', 1, 'Auslesen Datensammler', true);
INSERT INTO service VALUES (8, '3A', 1, 'Prüfung Rauchmelder', true);

INSERT INTO service VALUES (9, '4A', 1, 'Montage tPlus / tStar', true);
INSERT INTO service VALUES (10, '4C', 1, 'Montage GenH / Ei650', true);
INSERT INTO service VALUES (11, '4D', 1, 'Montage Rmstar', true);
INSERT INTO service VALUES (12, '4E', 1, 'Montage WZ APZ', true);
INSERT INTO service VALUES (13, '4F', 1, 'Montage WZ MK', true);
INSERT INTO service VALUES (14, '4L', 1, 'Montage WMZ qn 0,6 -  qn 2,5', true);
INSERT INTO service VALUES (15, '4M', 1, 'Montage WMZ ab qn 3,5', true);


INSERT INTO service VALUES (16, '5A', 1, 'Austausch HKVK -->  tPlus/tStar', true);
INSERT INTO service VALUES (17, '5B', 1, 'Austausch tPlus --> tPlus', true);
INSERT INTO service VALUES (18, '5C', 1, 'Austausch Fremd --> tPlus/tStar', true);
INSERT INTO service VALUES (19, '5D', 1, 'Austausch RM gleiches Modell', true);
INSERT INTO service VALUES (20, '5E', 1, 'Austausch Fremd -->  RM GenH/Ei650', true);
INSERT INTO service VALUES (21, '5F', 1, 'Austausch auf Rmstar', true);
INSERT INTO service VALUES (22, '5H', 1, 'Austausch WZ APZ', true);
INSERT INTO service VALUES (23, '5I', 1, 'Austausch WZ MK', true);
INSERT INTO service VALUES (24, '5O', 1, 'AustauschWMZ qn 0,6 - qn 2,5', true);
INSERT INTO service VALUES (25, '5P', 1, 'Austausch WMZ ab qn 3,5', true);

INSERT INTO service VALUES (26, '6A', 1, 'Neuaufnahme WMZ', true);
INSERT INTO service VALUES (27, '6B', 1, 'Neuaufnahme WZ', true);
INSERT INTO service VALUES (28, '6C', 1, 'Neuaufnahme RM', true);
INSERT INTO service VALUES (29, '7A', 1, 'FB Datensammler', true);
INSERT INTO service VALUES (30, '7B', 1, 'FB Rmstar', true);
INSERT INTO service VALUES (31, '7C', 1, 'FB HKV', true);
INSERT INTO service VALUES (32, '7D', 1, 'FB  WZ', true);
INSERT INTO service VALUES (33, '7E', 1, 'FB WMZ 0,6 - 2,5', true);
INSERT INTO service VALUES (34, '7F', 1, 'FB ab 3,5 mit M-Bus Montage', true);
INSERT INTO service VALUES (35, '8A', 1, 'Rauchmelder Eilauftrag / Tausch bei HA', true);
INSERT INTO service VALUES (36, '10C', 1, 'Reparaturzuschlag DS', true);
INSERT INTO service VALUES (37, '10D', 1, 'Foto Tauchhülse', true);
INSERT INTO service VALUES (38, '10E', 1, 'Foto Heizkörper', true);
INSERT INTO service VALUES (39, '10F', 1, 'tel. Bewertung', true);
INSERT INTO service VALUES (40, '10H', 1, 'Rosetten kürzen', true);
INSERT INTO service VALUES (41, '10I', 1, 'Arbeitszeit / Minute', true);
INSERT INTO service VALUES (42, '10J', 1, 'Montage Fernfühler', true);
INSERT INTO service VALUES (43, '10L', 1, 'Reparaturzuschlag HKV bei HA', true);
INSERT INTO service VALUES (44, '10M', 1, 'Reparaturzuschlag NM bei HA', true);
INSERT INTO service VALUES (45, '10P', 1, 'Aufmass HK', true);


INSERT INTO EMPLOYEE VALUES (1, 'Rainer', 'Timm','13 187 00870', 'T82','Bokel','25364', 'Fasanenweg','30' );
INSERT INTO EMPLOYEE VALUES (2, 'Rainer', 'Timm','13 187 00870', 'T85','Bokel','25364', 'Fasanenweg','30');
INSERT INTO EMPLOYEE VALUES (3, 'Anna ', 'Timm','12 187 04307', 'T84', 'Kiel','24116', 'Spiechernstraße','4' );


INSERT INTO real_estate VALUES (1, '122 / 12320', 'Hamburg','2', 'Geschwister-Scholl-Strasse', '25355',20 );
INSERT INTO real_estate VALUES (2, '123 / 56730', 'Hamburg','5', 'Schützenstrasse', '25355' ,30);
INSERT INTO real_estate VALUES (3, '122 / 52940', 'Hamburg','3', 'Pilatus Pool', '25355', 40 );
INSERT INTO real_estate VALUES (4, '122 / 52950', 'Hamburg','3', 'Pilatus Pool', '25355', 50 );
INSERT INTO real_estate VALUES (5, '122 / 52960', 'Hamburg','3', 'Pilatus Pool', '25355', 60 );

