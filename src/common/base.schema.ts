import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';

export class BaseSchema {
  static getSchema(entity: Type) {
    return SchemaFactory.createForClass(entity);
  }
}
