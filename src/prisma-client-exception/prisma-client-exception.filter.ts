import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from 'generated/prisma';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    const updateResponse = (status: number) => {
      response.status(status).json({
        message: message,
        status: status,
      });
    };

    switch (exception.code) {
      case 'P2002': {
        updateResponse(HttpStatus.CONFLICT);
        break;
      }
      case 'P2025': {
        updateResponse(HttpStatus.BAD_REQUEST);
        break;
      }
      case 'P2003': {
        updateResponse(HttpStatus.NOT_FOUND);
        break;
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
