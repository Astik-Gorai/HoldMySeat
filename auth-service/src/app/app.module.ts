import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_CONNECTION_STRING,
      autoLoadEntities: true,

      synchronize: true,

      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
