CREATE Table CATEGORY
(
  id   bigint not null,
  name varchar(255),
  primary key (id));

create TABLE SERVICE_CATEGORY ( category_id bigint not null, service_id bigint not null,primary key (category_id, service_id));

alter table SERVICE_CATEGORY
  add constraint service_category_CATEGORY_FK
    foreign key (category_id)
      references CATEGORY;

alter table SERVICE_CATEGORY
  add constraint service_category_SERVICE_FK
    foreign key (service_id)
      references service;
