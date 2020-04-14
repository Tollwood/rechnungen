ALTER TABLE  COMPANY ADD COLUMN  short_name varchar(255);
UPDATE COMPANY SET short_name = 'timm' where id = 1;
UPDATE COMPANY SET short_name = 'sass' where id = 2;