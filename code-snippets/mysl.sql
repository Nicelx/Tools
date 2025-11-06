-- backup table example
-- create new table products_backup and copy everything from products;
CREATE TABLE products_backup AS 
SELECT * FROM products;

-- add 3 hours to timezone. Date--from timezone--to timezone
CONVERT_TZ('2025-10-05 21:00:00', '+00:00', '+03:00')
-- result: '2025-10-06 00:00:00' (+3h)