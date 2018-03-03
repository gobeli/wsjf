import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as path from 'path';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import {getConnection } from 'typeorm';
import { Session } from './session.entity';
import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
	const app :INestApplication = await NestFactory.create(ApplicationModule);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(express.static(path.join(__dirname, 'assets')));
  
  const sessionrepo = getConnection().getRepository(Session);

  app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new TypeormStore({ ttl: 86400 }).connect(sessionrepo)
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    if (req.session.passport && req.session.passport.user) {
      res.locals.user = req.session.passport.user;
    }
    next();
  });

	await app.listen(3000);
}
bootstrap();
