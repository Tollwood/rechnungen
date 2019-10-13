
create table COMPANY (
    id bigint not null,
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


INSERT INTO COMPANY VALUES (1,
                            1,
                            'http://google.com',
                            '0176 / 51 51 26 81',
                            'timm1960@gmail.com',

                            'Bokel',
                            '30',
                            'Fasanenweg',
                            '25364',

                            'Hypo-Vereinsbank HH',
                            'DE45 2003 0000 0016 3761 13',
                            'HYVEDEMM300');