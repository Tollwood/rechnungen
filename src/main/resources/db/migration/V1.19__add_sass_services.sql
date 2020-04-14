ALTER TABLE service ADD COLUMN description varchar(255);
ALTER TABLE service ADD COLUMN image varchar(255);

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10001, '1', 3.50, 'Kornkrustenbrot', true, 2, '', '/sass/services/kornkrustenbrot.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10002, '2', 3.10, 'Jubiläumsbrot', true, 2, '', '/sass/services/jubiläumsbrot.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10003, '3', 3.10, 'Kartoffelbrot', true, 2, '', '/sass/services/kartoffelbrot.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10004, '4', 4.10, 'Steinmetz-Dinkelbrot', true, 2, '', '/sass/services/steinmetz-dinkelbrot.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10005, '5', 4.70, 'Steinmetz-Sonne', true, 2, '', '/sass/services/steinmetz-sonne.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10006, '6', 4.50, 'Barmstedter Vollkornbrot', true, 2, '', '/sass/services/barmstedter_vollkornbrot.jpeg' );


INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10007, '7', 0.55, 'Vollkornbrötchen', true, 2, '', '/sass/services/vollkornbroetchen.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10008, '8', 0.65, 'Ciabattabrötchen', true, 2, '', '/sass/services/ciabattabroetchen.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10009, '9', 0.40, 'Schrippen', true, 2, '', '/sass/services/schrippen.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10010, '10', 1.20, 'Rundstücke', true, 2, '', '/sass/services/rundstuecke.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10011, '11', 1.20, 'Franzbrötchen', true, 2, '', '/sass/services/franzbroetchen.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10012, '12', 3.50, 'Croissants', true, 2, '', '/sass/services/croissants.jpeg' );

INSERT INTO service (id , article_number,price,title,selectable,company_id,description, image)
VALUES (10013, '13', 0.75, 'Kürbiskernbrötchen', true, 2, '', '/sass/services/kürbiskernbroetchen.jpeg' );
