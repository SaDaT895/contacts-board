import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseFilters,
  HttpException,
  Res,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';
import { Client } from '@hubspot/api-client';
import { HubspotExceptionFilter } from 'src/hubspot-exception.filter';

@Controller('contacts')
@UseGuards(AuthGuard)
@UseFilters(HubspotExceptionFilter)
export class ContactsController {
  constructor() {}

  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
    @Req() req: Request,
  ) {
    const hubspot = new Client({
      accessToken: req.session.hubspot.access_token,
    });
    const res = await hubspot.crm.contacts.basicApi.create({
      properties: { ...createContactDto },
    });
    return res;
  }

  @Get()
  async findAll(@Req() req: Request) {
    const hubspot = new Client({
      accessToken: req.session.hubspot.access_token,
    });
    const res = await hubspot.crm.contacts.basicApi.getPage(
      undefined,
      undefined,
      ['email', 'firstname', 'lastname'],
    );
    return res.results;
  }

  @Get(':id')
  async findOne(@Param('id') contactId: string, @Req() req: Request) {
    const hubspot = new Client({
      accessToken: req.session.hubspot.access_token,
    });
    const res = await hubspot.crm.contacts.basicApi.getById(contactId, [
      'email',
      'firstname',
      'lastname',
    ]);
    return res;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
    @Req() req: Request,
  ) {
    const hubspot = new Client({
      accessToken: req.session.hubspot.access_token,
    });
    const res = await hubspot.crm.contacts.basicApi.update(id, {
      properties: { ...updateContactDto },
    });
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') contactId: string, @Req() req: Request) {
    const hubspot = new Client({
      accessToken: req.session.hubspot.access_token,
    });
    const res = await hubspot.crm.contacts.basicApi.archive(contactId);
    return res;
  }
}
