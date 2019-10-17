create table bill_item (
                       id bigint not null,
                       code varchar(255),
                       price decimal,
                       amount integer,
                       service_name varchar(255),
                       order_id bigint,
                       primary key (id)
);
