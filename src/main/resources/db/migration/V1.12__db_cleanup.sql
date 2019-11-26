ALTER TABLE order_table DROP CONSTRAINT IF EXISTS UK_bill_no;
alter table order_table
  add constraint  UK_bill_no unique (bill_no);

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