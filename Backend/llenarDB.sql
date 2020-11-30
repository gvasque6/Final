INSERT INTO `datawarehouse`.`users` (`isAdmin`,`name`,`last_name`,`email`,`password`) 
VALUES 
	( false,'Collie',  'Mabey',  'cmabey0@sciencedaily.com',  'jyYf9Us768' ),
	( false,'Lissie',  'Gladden',  'lgladden1@amazon.co.uk',  '3KYQRadJBt' ),
	( true,'Sonnie',  'Humpherson',  'shumpherson2@amazonaws.com',  'RPpeyQ' ),
	( true,'Antonie',  'Coleman',  'acoleman3@so-net.ne.jp',  'rVdQ2E' ),
	( false,'Georgi',  'MacTavish',  'gmactavish4@imdb.com',  '6PkYCf2fj' );
INSERT INTO `datawarehouse`.`regions` (`name`) 
VALUES 
	('LATAM'),
    ('EUA');
INSERT INTO `datawarehouse`.`countries` (`regionId`,`name`) 
VALUES 
	(  2,  'Finland'),
	(  2,  'Bosnia and Herzegovina'),
	(  2,  'Philippines'),
	(  2,  'Russia'),
	(  1,  'Madagascar'),
	(  1,  'United States'),
	(  2,  'Pakistan'),
	(  1,  'Indonesia'),
	(  1,  'China'),
	(  2,  'Russia');
    
 INSERT INTO `datawarehouse`.`cities` (`countryId`,`name`) 
 VALUES   
		( 9,'Independencia'),
		( 1,'Bitam'),
		( 6,'Aya'),
		( 8,'Fartura'),
		( 8,'Prestea'),
		( 8,'Zhongzi'),
		( 10,'Aghsu'),
		( 5,'Kanashevo'),
		( 4,'San José de Miranda'),
		( 2,'Itápolis'),
		( 7,'Nyaungdon'),
		( 10,'Guadalupe Victoria'),
		( 6,'Fengcheng'),
		( 6,'Primorka'),
		( 6,'Koga'),
		( 2,'Pueblo Nuevo Viñas'),
		( 6,'Novokuz’minki');
INSERT INTO `datawarehouse`.`companies` (`name`,`address`,`phone`,`email`,`cityId`)
 VALUES       
    ( 'Leexo', '475 Melvin Road', '618-309-2101', 'avials0@state.gov', 17 ),
	( 'Zoonder', '352 Cordelia Circle', '523-613-9089', 'tmcelvine1@fda.gov', 16 ),
	( 'Janyx', '2 Pond Plaza', '757-556-3981', 'rsimms3@squarespace.com', 13 ),
	( 'Skajo', '66 Kings Street', '372-754-7562', 'plembrick4@lulu.com', 12 ),
	( 'Mydeo', '59710 Blaine Hill', '930-637-2166', 'jramsey9@ibm.com', 1 ),
	( 'Feedspan', '8 Summit Center', '528-126-1600', 'tpenninoa@examiner.com', 2 ),
	( 'Quire', '79972 Hintze Plaza', '816-532-3856', 'pscurfieldc@ed.gov', 3 ),
	( 'Kwilith', '830 Mifflin Trail', '496-302-3262', 'akernard@ocn.ne.jp', 4 );
    INSERT INTO `datawarehouse`.`contacts` (`name`,`last_name`,`phone`,`email`,`occupation`,`companyId`,`cityId`,`address`)
    VALUES 
		('Madeline','Sloan','943-940-1030','msloan0@mac.com','Office Assistant IV', 7, 7,'9904 Starling Alley'),
		('Patricio','Wythill','611-701-3839','pwythill1@amazon.com','Staff Scientist', 8, 17,'8776 Rieder Point'),
		( 'Nils','Salsberg','963-634-7036','nsalsberg2@thetimes.co.uk', 'Assistant Manager', 4, 14,'5 Talmadge Park'),
		('Adda','Kenninghan','993-528-9339','akenninghan3@google.fr','Account Coordinator',7,8,'734 Chive Lane'),
		('Pamella','Surcomb','292-856-4566','psurcomb4@patch.com','Senior Editor',2,2,'5 Sauthoff Avenue'),
		('Priscilla','Clappson', '843-476-5798','pclappson5@macromedia.com', 'Design Engineer', 5, 8,'756 Mockingbird Hill'),
		('Guy','Bartalot', '583-491-1376','gbartalot6@biblegateway.com','Engineer III', 6, 3,'1 Dunning Point');