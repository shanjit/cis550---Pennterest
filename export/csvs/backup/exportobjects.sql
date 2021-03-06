--------------------------------------------------------
--  File created - Saturday-December-07-2013   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table OBJECTS
--------------------------------------------------------

  CREATE TABLE "CIS550PROJECT"."OBJECTS" 
   (	"OBJECTID" NUMBER(*,0), 
	"SOURCEID" VARCHAR2(255 CHAR), 
	"URL" VARCHAR2(255 CHAR), 
	"CACHED" NUMBER(*,0), 
	"OBJECTTYPE" VARCHAR2(255 CHAR)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into CIS550PROJECT.OBJECTS
SET DEFINE OFF;
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (1,'TBD','http://www.dartfrogforums.com/images/tinc_540x350_1.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (2,'TBD','http://images2.fanpop.com/images/photos/6900000/Felines-national-geographic-6909274-1024-768.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (3,'TBD','http://eofdreams.com/data_images/dreams/tiger/tiger-02.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (4,'TBD','http://images.nationalgeographic.com/wpf/media-live/photos/000/004/cache/african-lion-male_436_600x450.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (5,'TBD','http://3.bp.blogspot.com/-X4MTSOjPWXg/T6Nqf6MvcgI/AAAAAAAABHU/GDusB_R3OtM/s1600/mountain+Zebras+babies+of+beautifull+dangerous+animals.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (6,'TBD','http://eofdreams.com/data_images/dreams/tiger/tiger-02.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (7,'TBD','http://images.nationalgeographic.com/wpf/media-live/photos/000/004/cache/african-lion-male_436_600x450.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (8,'TBD','http://images.nationalgeographic.com/wpf/media-live/photos/000/006/cache/leopard_606_600x450.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (9,'TBD','http://www.dartfrogforums.com/images/tinc_540x350_1.jpg',0,'photo');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (10,'TBD','http://www.tldp.org/LDP/intro-linux/intro-linux.pdf',0,'pdf');
Insert into CIS550PROJECT.OBJECTS (OBJECTID,SOURCEID,URL,CACHED,OBJECTTYPE) values (11,'TBD','http://linux-training.be/files/books/LinuxFun.pdf',0,'pdf');
--------------------------------------------------------
--  DDL for Index OBJECTS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CIS550PROJECT"."OBJECTS_PK" ON "CIS550PROJECT"."OBJECTS" ("OBJECTID", "SOURCEID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index OBJECTS_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "CIS550PROJECT"."OBJECTS_UK1" ON "CIS550PROJECT"."OBJECTS" ("OBJECTID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table OBJECTS
--------------------------------------------------------

  ALTER TABLE "CIS550PROJECT"."OBJECTS" MODIFY ("CACHED" NOT NULL ENABLE);
  ALTER TABLE "CIS550PROJECT"."OBJECTS" ADD CONSTRAINT "OBJECTS_UK1" UNIQUE ("OBJECTID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
  ALTER TABLE "CIS550PROJECT"."OBJECTS" ADD CONSTRAINT "OBJECTS_CHK1" CHECK (OBJECTTYPE IN ('pdf', 'photo', 'video', 'other')) ENABLE;
  ALTER TABLE "CIS550PROJECT"."OBJECTS" ADD CONSTRAINT "OBJECTS_PK" PRIMARY KEY ("OBJECTID", "SOURCEID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
  ALTER TABLE "CIS550PROJECT"."OBJECTS" MODIFY ("OBJECTTYPE" NOT NULL ENABLE);
  ALTER TABLE "CIS550PROJECT"."OBJECTS" MODIFY ("URL" NOT NULL ENABLE);
  ALTER TABLE "CIS550PROJECT"."OBJECTS" MODIFY ("SOURCEID" NOT NULL ENABLE);
  ALTER TABLE "CIS550PROJECT"."OBJECTS" MODIFY ("OBJECTID" NOT NULL ENABLE);
