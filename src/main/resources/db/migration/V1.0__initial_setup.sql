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
    city varchar(255),
    house_number varchar(255),
    street varchar(255),
    zip_code varchar(255),
    primary key (id)
);

create table service (
    id bigint not null,
    article_number varchar(255),
    price decimal,
    title varchar(255),
    primary key (id)
);

create table service_order (
    id bigint not null,
    amount integer not null,
    service_id bigint,
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

INSERT INTO service VALUES (1, '1 A', 5, 'Grundgebühr bis 20 km' );
INSERT INTO service VALUES (2, '1 F', 2, 'Zuschlag Kleinauftrag' );
INSERT INTO service VALUES (3, '2 A', 1, 'abl. HKVK' );
INSERT INTO service VALUES (4, '2 B', 1, 'Abl.  tPlus / tStar' );
INSERT INTO service VALUES (5, '2 C', 1, 'Abl. Wasserzähler');
INSERT INTO service VALUES (6, '2 D', 1, 'Abl. WMZ');
INSERT INTO service VALUES (7, '2 E', 1, 'Auslesen Datensammler');
INSERT INTO service VALUES (8, '3 A', 1, 'Prüfung Rauchmelder');

INSERT INTO service VALUES (9, '4 A', 1, 'Montage tPlus / tStar');
INSERT INTO service VALUES (10, '4 C', 1, 'Montage GenH / Ei650');
INSERT INTO service VALUES (11, '4 D', 1, 'Montage Rmstar');
INSERT INTO service VALUES (12, '4 E', 1, 'Montage WZ APZ');
INSERT INTO service VALUES (13, '4 F', 1, 'Montage WZ MK');
INSERT INTO service VALUES (14, '4 L', 1, 'Montage WMZ qn 0,6 -  qn 2,5');
INSERT INTO service VALUES (15, '4 M', 1, 'Montage WMZ ab qn 3,5');


INSERT INTO service VALUES (16, '5 A', 1, 'Austausch HKVK -->  tPlus/tStar');
INSERT INTO service VALUES (17, '5 B', 1, 'Austausch tPlus --> tPlus');
INSERT INTO service VALUES (18, '5 C', 1, 'Austausch Fremd --> tPlus/tStar');
INSERT INTO service VALUES (19, '5 D', 1, 'Austausch RM gleiches Modell');
INSERT INTO service VALUES (20, '5 E', 1, 'Austausch Fremd -->  RM GenH/Ei650');
INSERT INTO service VALUES (21, '5 F', 1, 'Austausch auf Rmstar');
INSERT INTO service VALUES (22, '5 H', 1, 'Austausch WZ APZ');
INSERT INTO service VALUES (23, '5 I', 1, 'Austausch WZ MK');
INSERT INTO service VALUES (24, '5 O', 1, 'AustauschWMZ qn 0,6 - qn 2,5');
INSERT INTO service VALUES (25, '5 P', 1, 'Austausch WMZ ab qn 3,5');

INSERT INTO service VALUES (26, '6 A', 1, 'Neuaufnahme WMZ');
INSERT INTO service VALUES (27, '6 B', 1, 'Neuaufnahme WZ');
INSERT INTO service VALUES (28, '6 C', 1, 'Neuaufnahme RM');
INSERT INTO service VALUES (29, '7 A', 1, 'FB Datensammler');
INSERT INTO service VALUES (30, '7 B', 1, 'FB Rmstar');
INSERT INTO service VALUES (31, '7 C', 1, 'FB HKV');
INSERT INTO service VALUES (32, '7 D', 1, 'FB  WZ');
INSERT INTO service VALUES (33, '7 E', 1, 'FB WMZ 0,6 - 2,5');
INSERT INTO service VALUES (34, '7 F', 1, 'FB ab 3,5 mit M-Bus Montage');
INSERT INTO service VALUES (35, '8 A', 1, 'Rauchmelder Eilauftrag / Tausch bei HA');
INSERT INTO service VALUES (36, '10 C', 1, 'Reparaturzuschlag DS');
INSERT INTO service VALUES (37, '10 D', 1, 'Foto Tauchhülse');
INSERT INTO service VALUES (38, '10 E', 1, 'Foto Heizkörper');
INSERT INTO service VALUES (39, '10 F', 1, 'tel. Bewertung');
INSERT INTO service VALUES (40, '10 H', 1, 'Rosetten kürzen');
INSERT INTO service VALUES (41, '10 I', 1, 'Arbeitszeit / Minute');
INSERT INTO service VALUES (42, '10 J', 1, 'Montage Fernfühler');
INSERT INTO service VALUES (43, '10 L', 1, 'Reparaturzuschlag HKV bei HA');
INSERT INTO service VALUES (44, '10 M', 1, 'Reparaturzuschlag NM bei HA');
INSERT INTO service VALUES (45, '10 P', 1, 'Aufmass HK');
INSERT INTO service VALUES (46, 'B C D', 0, 'Zuschlag (7,50/15,-/22,50€)');


INSERT INTO EMPLOYEE VALUES (1, 'Rainer', 'Timm','13 187 00870', 'T82','Bokel','25364', 'Fasanenweg','30' );
INSERT INTO EMPLOYEE VALUES (2, 'Rainer', 'Timm','13 187 00870', 'T85','Bokel','25364', 'Fasanenweg','30');
INSERT INTO EMPLOYEE VALUES (3, 'Anna ', 'Timm','12 187 04307', 'T84', 'Kiel','24116', 'Spiechernstraße','4' );