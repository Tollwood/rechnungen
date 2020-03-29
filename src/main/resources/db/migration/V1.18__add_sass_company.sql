ALTER TABLE COMPANY ADD real_estate_support boolean DEFAULT false;
ALTER TABLE COMPANY ADD billing_support boolean DEFAULT false;
ALTER TABLE COMPANY ADD employee_support boolean DEFAULT false;
ALTER TABLE COMPANY ADD customer_support boolean DEFAULT false;

UPDATE COMPANY set real_estate_support = true where id = 1;
UPDATE COMPANY set billing_support = true where id = 1;
UPDATE COMPANY set employee_support = true where id = 1;

INSERT INTO COMPANY (id, bill_no, logo, phone, email, city, house_number, street, zip_code, name, real_estate_support,billing_support,
                     employee_support, customer_support )
VALUES (2,
                            1,
                            'SassLogo.png',
                            '04123 / 27 78',
                            'timm1960@gmail.com',
                            'Barmstedt',
                            '5',
                            'Kuhberg 5',
                            '25355',
                            'Stadtbäckerei & Cafe Sass',
                            false,false,false,true);