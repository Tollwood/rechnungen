ALTER TABLE COMPANY ADD COLUMN name varchar(255);

Update COMPANY
set name = 'Wärmemessdienst Timm'
where id = 1;