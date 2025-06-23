import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ContactsController],
})
export class ContactsModule {}
