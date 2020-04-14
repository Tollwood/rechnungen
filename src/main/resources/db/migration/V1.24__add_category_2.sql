CREATE Table CATEGORY
(
  id   bigint not null,
  name varchar(255),
  company_id bigint not null,
  primary key (id));

alter table CATEGORY
  add constraint CATEGORY_COMPANY_FK
    foreign key (company_id)
      references company;


create TABLE SERVICE_CATEGORY ( category_id bigint not null, service_id bigint not null,primary key (category_id, service_id));

alter table SERVICE_CATEGORY
  add constraint service_category_CATEGORY_FK
    foreign key (category_id)
      references CATEGORY;

alter table SERVICE_CATEGORY
  add constraint service_category_SERVICE_FK
    foreign key (service_id)
      references service;

INSERT INTO CATEGORY (id, name, company_id) VALUES (1,'Unsere Renner',2);

INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10001);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10002);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10003);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10004);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10005);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10006);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10007);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10008);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10009);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10010);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10011);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10012);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (1,10013);


INSERT INTO CATEGORY (id, name, company_id) VALUES (2,'Brot',2);
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10014, '14', 3.50, 'Feinbrot',
                                                                                                       true, 2, '', '/sass/services/feinbrot.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10015, '15', 3.50, 'Weißbrot',
                                                                                                       true, 2, '', '/sass/services/weissbrot.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10016, '16', 3.50, 'Dreikornbrot',
                                                                                                       true, 2, '', '/sass/services/dreikornbrot.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10017, '17', 3.10, 'Leuchtturm',
                                                                                                       true, 2, '', '/sass/services/leuchtturmbrot.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10018, '18', 3.50, 'Kürbiskern',
                                                                                                       true, 2, '', '/sass/services/kuerbisbrot.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10019, '19', 3.10, 'Mohnbrot', true,
                                                                                                       2, '', '/sass/services/mohnbrot.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10020, '20', 3.10, 'Pano Doro',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10021, '21', 3.10, 'Französisches ' ||
                                                                                                                          '' ||
                                                                                                                        'Land', true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10022, '22', 4.10, 'Haferkorn',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10014);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10015);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10016);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10017);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10018);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10019);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10020);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10021);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (2,10022);


INSERT INTO CATEGORY (id, name, company_id) VALUES (3,'Brötchen',2);
INSERT INTO CATEGORY (id, name, company_id) VALUES (4,'Kuchen / Dauergebäck',2);


INSERT INTO CATEGORY (id, name, company_id) VALUES (5,'Sonntagsbrötchen',2);
INSERT INTO CATEGORY (id, name, company_id) VALUES (6,'Grillsaison',2);

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10023, '23', 2.95, 'Meterbrote',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10024, '24', 3.25, 'Zwiebelstange',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10025, '25', 3.25, 'Roggenstange',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10026, '26', 4.70, 'Ciabattastange',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10027, '27', 3.50,
                                                                                                       'Kornkrustenstange',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (6,10023);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (6,10024);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (6,10025);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (6,10026);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (6,10027);



INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10028, '28', 2.20,
                                                                                                       'Mandelhörnchen',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10029, '29', 2.20,
                                                                                                       'Nougatringe',
                                                                                                       true, 2, '', '/sass/services/nougatringe.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10030, '30', 1.30,
                                                                                                       'Rumkugeln',
                                                                                                       true, 2, '', '/sass/services/rumkugel.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10031, '31', 2.00,
                                                                                                       'Nußecke',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10032, '32', 1.10,
                                                                                                       'Butterkuchen',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10033, '33', 1.30,
                                                                                                       'gef, Butterkuchen',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10034, '34', 1.80,
                                                                                                       'Apfelschnitte',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10035, '35', 1.40,
                                                                                                       'Berliner',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10036, '36', 1.60,
                                                                                                       'Kopenhagener',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10037, '37', 2.20,
                                                                                                       'verschiedene Sahne',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10049, '49', 2.20,
                                                                                                       'Eierlikör',
                                                                                                       true, 2, '', '/sass/services/eierlikör.jpeg' );

INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10028);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10029);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10030);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10031);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10032);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10033);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10034);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10035);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10036);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10037);




INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10038, '38', 0.55,
                                                                                                       'Bauernbrötchen',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10039, '39', 0.55,
                                                                                                       'Milchbrötchen',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10040, '40', 0.65,
                                                                                                       'Weltmeister',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10041, '41', 0.55,
                                                                                                       'Weizen Vollkorn',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10042, '42', 0.80,
                                                                                                       'Laugenbrötchen',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10043, '43', 1.30,
                                                                                                       'Schokocroisaant',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10044, '44', 0.80,
                                                                                                       'Camping',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10045, '45', 0.55,
                                                                                                       'Roggenbrötchen',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10046, '46', 0.45,
                                                                                                       'Kaiser',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );

INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10038);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10039);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10040);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10041);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10042);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10043);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10044);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10045);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (3,10046);


INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10047, '47', 0.55,
                                                                                                       'Sesam',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10048, '48', 0.75,
                                                                                                       'Dinkel',
                                                                                                       true, 2, '', '/sass/services/placeholder.png' );

INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10046);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10019);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10043);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10010);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10045);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10008);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10040);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10039);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (5,10048);

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10050, '50', 32.00,
                                                                                                       'Pfirsichtorte',
                                                                                                       true, 2, '', '/sass/services/pfirsichtorte.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10052, '52', 2.20,
                                                                                                       'Nussknacker',
                                                                                                       true, 2, '', '/sass/services/nussknacker.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10053, '53', 2.20,
                                                                                                       'Nusßschnitte',
                                                                                                       true, 2, '', '/sass/services/nussschnitte.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10054, '54', 2.00,
                                                                                                       'Sandgebäck',
                                                                                                       true, 2, '', '/sass/services/sandgebaeck.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10055, '55', 2.20,
                                                                                                       'Schwarzwälderrolle',
                                                                                                       true, 2, '', '/sass/services/schwarzwaelderrolle.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10056, '56', 2.00,
                                                                                                       'Schweineohren',
                                                                                                       true, 2, '', '/sass/services/schweineohren.jpeg' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image) VALUES (10057, '57', 2.20,
                                                                                                       'Zitronenrolle',
                                                                                                       true, 2, '', '/sass/services/zitronenrolle.jpeg' );

INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10050);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10052);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10053);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10054);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10055);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10056);
INSERT INTO SERVICE_CATEGORY (category_id, service_id) VALUES (4,10057);