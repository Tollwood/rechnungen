ALTER TABLE service ADD COLUMN description varchar(255);

INSERT INTO service (id , article_number,price,title,selectable,company_id,description)
VALUES (10001, '100A', 0.52, 'Vollkornbrötchen', true, 2, 'Gut und günstig' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description) VALUES (10002, '1001B', 0.42, 'Milchbrötchen',
                                                                                                true , 2, 'Unsere liebsten');
INSERT INTO service (id , article_number,price,title,selectable,company_id,description) VALUES (10003, '1001C', 0.48, 'Dinkelbrötchen',
                                                                                                true, 2, 'Mit Liebe gebacken' );
INSERT INTO service (id , article_number,price,title,selectable,company_id,description) VALUES (10004, '1001D', 1.10, 'Croissant', true ,
                                                                                                2, 'Gut und günstig');

INSERT INTO service (id , article_number,price,title,selectable,company_id,description)  VALUES (10005, '1001E', 1.40, 'Vollkorn Brot 750g', true , 2, '');