import { ApiException } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

@Catch(ApiException<any>)
export class HubspotExceptionFilter<T> implements ExceptionFilter {
  catch(exception: ApiException<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(exception.code).json(exception);
  }
}
