import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { AppController } from 'src/app.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ContactsModule, HttpModule, ConfigModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
