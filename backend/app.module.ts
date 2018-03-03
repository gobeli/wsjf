import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Session } from './session.entity';
import { AppController } from './app.controller';
import { WsjfModule } from './wsjf/wsjf.module';

const { DB_USER, DB_DATABASE, DB_PASSWORD, DB_HOST } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: 3306,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Session]),
    AuthModule,
    UserModule,
    WsjfModule
  ],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
