--------------------------------------------------------
--  File created - Saturday-December-07-2013   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table OBJECTTAGS
--------------------------------------------------------

  CREATE TABLE "CIS550PROJECT"."OBJECTTAGS" 
   (	"OBJECTID" NUMBER(*,0), 
	"TAG" VARCHAR2(255 CHAR)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into CIS550PROJECT.OBJECTTAGS
SET DEFINE OFF;
Insert into CIS550PROJECT.OBJECTTAGS (OBJECTID,TAG) values (1,'animals');
Insert into CIS550PROJECT.OBJECTTAGS (OBJECTID,TAG) values (2,'animals');
Insert into CIS550PROJECT.OBJECTTAGS (OBJECTID,TAG) values (3,'animals');
Insert into CIS550PROJECT.OBJECTTAGS (OBJECTID,TAG) values (4,'animals');
Insert into CIS550PROJECT.OBJECTTAGS (OBJECTID,TAG) values (10,'computers');
Insert into CIS550PROJECT.OBJECTTAGS (OBJECTID,TAG) values (11,'linux');
--------------------------------------------------------
--  DDL for Index OBJECTTAGS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CIS550PROJECT"."OBJECTTAGS_PK" ON "CIS550PROJECT"."OBJECTTAGS" ("OBJECTID", "TAG") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table OBJECTTAGS
--------------------------------------------------------

  ALTER TABLE "CIS550PROJECT"."OBJECTTAGS" ADD CONSTRAINT "OBJECTTAGS_PK" PRIMARY KEY ("OBJECTID", "TAG")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
  ALTER TABLE "CIS550PROJECT"."OBJECTTAGS" MODIFY ("TAG" NOT NULL ENABLE);
  ALTER TABLE "CIS550PROJECT"."OBJECTTAGS" MODIFY ("OBJECTID" NOT NULL ENABLE);
--------------------------------------------------------
--  Ref Constraints for Table OBJECTTAGS
--------------------------------------------------------

  ALTER TABLE "CIS550PROJECT"."OBJECTTAGS" ADD CONSTRAINT "OBJECTTAGS_OBJECTS_FK1" FOREIGN KEY ("OBJECTID")
	  REFERENCES "CIS550PROJECT"."OBJECTS" ("OBJECTID") ENABLE;
