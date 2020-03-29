/*
Implement the Tenant View Filter:
*/

-- 1) Rename the table 
-- use a convention - in this example, we prefix with 'T_'
ALTER TABLE ORDER_TABLE RENAME TO T_ORDER_TABLE;

-- 2) Add the tenant id column /w index
-- we need a default value for existing records
-- we use tenant 1

CREATE INDEX IDX_T_ORDER_TABLE_COMPANY_ID ON T_ORDER_TABLE (company_id);


UPDATE T_ORDER_TABLE SET company_id = 'cfcihargsbgcly' where company_id = '2';
-- 4) Create the filtered view with the original table name
CREATE VIEW ORDER_TABLE AS
SELECT * FROM T_ORDER_TABLE t
WHERE t.company_id IS NULL
   OR t.company_id = CURRENT_USER;

-- 5) grant CRUD access to our 'Product' VIEW for the original test user
-- NOTE: the user cannot access the table.
GRANT SELECT, INSERT, UPDATE, DELETE ON ORDER_TABLE TO "cfcihargsbgcly";

/*
Our Tenant View Filter is complete.
Existing queries - if performed on a correctly configured connection - will work as expected.
Execute ProductDaoTest now, to verify this.
*/