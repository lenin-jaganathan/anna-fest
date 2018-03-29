select * from users;
desc users;

commit;


select * from sessions;

drop table sessions;

select * from sportRegistration;

select * from sports;

select * from verification;

CREATE TABLE `sessions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) DEFAULT NULL,
  `sessionId` varchar(25) NOT NULL,
  `token` varchar(25) NOT NULL,
  `flag` int(10) DEFAULT '0',
  `expiry` bigint(50) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  FOREIGN KEY (`email`) REFERENCES `users` (`email`)
);
drop table sportregistration;
CREATE TABLE `sportregistration` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) NOT NULL,
  `sportId` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  KEY `sportId` (`sportId`),
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp not null default current_timestamp on update current_timestamp,
  FOREIGN KEY (`email`) REFERENCES `users` (`email`),
  FOREIGN KEY (`sportId`) REFERENCES `sports` (`id`)
) ;

CREATE TABLE `sports` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sport` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` bigint(10) DEFAULT NULL,
  `college` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `year` int(5) NOT NULL,
  `verified` varchar(25) DEFAULT '0',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ;

alter table sportRegistration add column createdOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
alter table sportRegistration add column updatedOn timestamp not null default current_timestamp on update current_timestamp;

desc users;

alter table users modify column verified boolean default 0 not null;

select u.id,u.email,u.name,u.phone,u.college,sp.sport from users u join sportRegistration s on (u.email = s.email) join sports sp on (sp.id = s.sportId) where sp.id=2;

commit;

create table verification (
`email` varchar(50)not null,
`otp` bigint(10) not null,
`expiry` bigint(50) not null,
`createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedOn` timestamp not null default current_timestamp on update current_timestamp,
foreign key (`email`) references users(email)
);