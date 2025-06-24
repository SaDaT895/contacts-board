import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [ContactsController],
})
export class ContactsModule {}
