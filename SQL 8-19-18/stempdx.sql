SELECT systimestamp, 'Hello World', 5*5 from dual;


SELECT * FROM user_tables;

SELECT * FROM members;


Update members
   SET first_name = 'Joseph'
   WHERE user_id = 1;