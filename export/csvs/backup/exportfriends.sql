--------------------------------------------------------
--  File created - Saturday-December-07-2013   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table FRIENDS
--------------------------------------------------------

  CREATE TABLE "CIS550PROJECT"."FRIENDS" 
   (	"USERID" NUMBER(*,0), 
	"EMAILID" VARCHAR2(255 CHAR)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into CIS550PROJECT.FRIENDS
SET DEFINE OFF;
Insert into CIS550PROJECT.FRIENDS (USERID,EMAILID) values (1,'bill.gates@gmail.com');
Insert into CIS550PROJECT.FRIENDS (USERID,EMAILID) values (2,'tom.cruise@gmail.com');
Insert into CIS550PROJECT.FRIENDS (USERID,EMAILID) values (3,'manmohan.singh@gmail.com');
Insert into CIS550PROJECT.FRIENDS (USERID,EMAILID) values (4,'sachin.tendulkar@gmail.com');
Insert into CIS550PROJECT.FRIENDS (USERID,EMAILID) values (24,'bill.gates@gmail.com');
Insert into CIS550PROJECT.FRIENDS (USERID,EMAILID) values (25,'bill.gates@gmail.com');
--------------------------------------------------------
--  DDL for Index FRIENDS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CIS550PROJECT"."FRIENDS_PK" ON "CIS550PROJECT"."FRIENDS" ("USERID", "EMAILID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table FRIENDS
--------------------------------------------------------

  ALTER TABLE "CIS550PROJECT"."FRIENDS" ADD CONSTRAINT "FRIENDS_PK" PRIMARY KEY ("USERID", "EMAILID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
  ALTER TABLE "CIS550PROJECT"."FRIENDS" MODIFY ("EMAILID" NOT NULL ENABLE);
  ALTER TABLE "CIS550PROJECT"."FRIENDS" MODIFY ("USERID" NOT NULL ENABLE);
--------------------------------------------------------
--  Ref Constraints for Table FRIENDS
--------------------------------------------------------

  ALTER TABLE "CIS550PROJECT"."FRIENDS" ADD CONSTRAINT "FRIENDS_USERS_FK1" FOREIGN KEY ("EMAILID")
	  REFERENCES "CIS550PROJECT"."USERS" ("EMAILID") ENABLE;
  ALTER TABLE "CIS550PROJECT"."FRIENDS" ADD CONSTRAINT "FRIENDS_USERS_FK2" FOREIGN KEY ("USERID")
	  REFERENCES "CIS550PROJECT"."USERS" ("USERID") ENABLE;