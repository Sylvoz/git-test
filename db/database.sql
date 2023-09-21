create DATABASE if not EXISTS companydb;
use companydb;

create Table employee(
  id int(11) not NULL auto_increment PRIMARY KEY ,
  name varchar(45) DEFAULT NULL,
  salary int(5) DEFAULT null
);

describe employee;

insert into employee VALUES
(1,'Joe',1000),
(2,'Henry',2000),
(3,'Sam',2500),
(4,'Max',1500);
