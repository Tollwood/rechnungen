create table ARTICLE_GROUP (
     id bigint not null,
     title varchar(255),
     primary key (id)
);

INSERT INTO ARTICLE_GROUP VALUES (1, 'Hauptablesung / RM Prüfung' );
INSERT INTO ARTICLE_GROUP VALUES (2, 'Montage' );
INSERT INTO ARTICLE_GROUP VALUES (3, 'Austausch' );
INSERT INTO ARTICLE_GROUP VALUES (4, 'Funkbereitschaft' );
INSERT INTO ARTICLE_GROUP VALUES (5, 'RM' );
INSERT INTO ARTICLE_GROUP VALUES (6, 'Pauschalen' );
INSERT INTO ARTICLE_GROUP VALUES (7, 'Neuaufnahme' );
INSERT INTO ARTICLE_GROUP VALUES (8, 'Fahrtkosten' );


create table article (
      id bigint not null,
      article_number varchar(255),
      price double not null,
      title varchar(255),
      GROUP_ID bigint,
      primary key (id)
    );


INSERT INTO ARTICLE VALUES (1, '1 A', 5, 'Grundgebühr bis 20 km',8 );
INSERT INTO ARTICLE VALUES (2, '1 F', 2, 'Zuschlag Kleinauftrag',8 );
INSERT INTO ARTICLE VALUES (3, '2 A', 1, 'abl. HKVK', 1 );
INSERT INTO ARTICLE VALUES (4, '2 B', 1, 'Abl.  tPlus / tStar',1 );
INSERT INTO ARTICLE VALUES (5, '2 C', 1, 'Abl. Wasserzähler',1 );
INSERT INTO ARTICLE VALUES (6, '2 D', 1, 'Abl. WMZ',1 );
INSERT INTO ARTICLE VALUES (7, '2 E', 1, 'Auslesen Datensammler',1 );
INSERT INTO ARTICLE VALUES (8, '3 A', 1, 'Prüfung Rauchmelder',1 );

INSERT INTO ARTICLE VALUES (9, '4 A', 1, 'Montage tPlus / tStar', 2 );
INSERT INTO ARTICLE VALUES (10, '4 C', 1, 'Montage GenH / Ei650',2 );
INSERT INTO ARTICLE VALUES (11, '4 D', 1, 'Montage Rmstar',2 );
INSERT INTO ARTICLE VALUES (12, '4 E', 1, 'Montage WZ APZ',2 );
INSERT INTO ARTICLE VALUES (13, '4 F', 1, 'Montage WZ MK',2 );
INSERT INTO ARTICLE VALUES (14, '4 L', 1, 'Montage WMZ qn 0,6 -  qn 2,5',2 );
INSERT INTO ARTICLE VALUES (15, '4 M', 1, 'Montage WMZ ab qn 3,5',2 );


INSERT INTO ARTICLE VALUES (16, '5 A', 1, 'Austausch HKVK -->  tPlus/tStar',3 );
INSERT INTO ARTICLE VALUES (17, '5 B', 1, 'Austausch tPlus --> tPlus' ,3);
INSERT INTO ARTICLE VALUES (18, '5 C', 1, 'Austausch Fremd --> tPlus/tStar',3 );
INSERT INTO ARTICLE VALUES (19, '5 D', 1, 'Austausch RM gleiches Modell',3 );
INSERT INTO ARTICLE VALUES (20, '5 E', 1, 'Austausch Fremd -->  RM GenH/Ei650',3 );
INSERT INTO ARTICLE VALUES (21, '5 F', 1, 'Austausch auf Rmstar',3 );
INSERT INTO ARTICLE VALUES (22, '5 H', 1, 'Austausch WZ APZ',3 );
INSERT INTO ARTICLE VALUES (23, '5 I', 1, 'Austausch WZ MK',3 );
INSERT INTO ARTICLE VALUES (24, '5 O', 1, 'AustauschWMZ qn 0,6 - qn 2,5',3 );
INSERT INTO ARTICLE VALUES (25, '5 P', 1, 'Austausch WMZ ab qn 3,5',3 );

INSERT INTO ARTICLE VALUES (26, '6 A', 1, 'Neuaufnahme WMZ',7 );
INSERT INTO ARTICLE VALUES (27, '6 B', 1, 'Neuaufnahme WZ',7 );
INSERT INTO ARTICLE VALUES (28, '6 C', 1, 'Neuaufnahme RM',7 );
INSERT INTO ARTICLE VALUES (29, '7 A', 1, 'FB Datensammler',4 );
INSERT INTO ARTICLE VALUES (30, '7 B', 1, 'FB Rmstar',4 );
INSERT INTO ARTICLE VALUES (31, '7 C', 1, 'FB HKV',4 );
INSERT INTO ARTICLE VALUES (32, '7 D', 1, 'FB  WZ',4 );
INSERT INTO ARTICLE VALUES (33, '7 E', 1, 'FB WMZ 0,6 - 2,5',4 );
INSERT INTO ARTICLE VALUES (34, '7 F', 1, 'FB ab 3,5 mit M-Bus Montage' ,4);
INSERT INTO ARTICLE VALUES (35, '8 A', 1, 'Rauchmelder Eilauftrag / Tausch bei HA',5 );
INSERT INTO ARTICLE VALUES (36, '10 C', 1, 'Reparaturzuschlag DS',6 );
INSERT INTO ARTICLE VALUES (37, '10 D', 1, 'Foto Tauchhülse',6 );
INSERT INTO ARTICLE VALUES (38, '10 E', 1, 'Foto Heizkörper',6 );
INSERT INTO ARTICLE VALUES (39, '10 F', 1, 'tel. Bewertung',6 );
INSERT INTO ARTICLE VALUES (40, '10 H', 1, 'Rosetten kürzen',6 );
INSERT INTO ARTICLE VALUES (41, '10 I', 1, 'Arbeitszeit / Minute',6 );
INSERT INTO ARTICLE VALUES (42, '10 J', 1, 'Montage Fernfühler',6 );
INSERT INTO ARTICLE VALUES (43, '10 L', 1, 'Reparaturzuschlag HKV bei HA',6 );
INSERT INTO ARTICLE VALUES (44, '10 M', 1, 'Reparaturzuschlag NM bei HA',6 );
INSERT INTO ARTICLE VALUES (45, '10 P', 1, 'Aufmass HK',6 );
INSERT INTO ARTICLE VALUES (46, 'B C D', 0, 'Zuschlag (7,50/15,-/22,50€)',8 );