you need "" for identifiers (fields, table names, etc) and '' for strings

update "users" set password='SexyRobotsShouldUseBcrypt' where name = 'Joe';

your language/wrapper should handle the string params (via bind vars like $1/?) unless you like to live dangerously