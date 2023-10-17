import { ApiProperty } from '@nestjs/swagger';

export class ExceptionModel {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string[];
  @ApiProperty()
  timestamp: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  name?: string;
  constructor(status: number, error: any, path: string, name?: string) {
    console.log(error);
    this.statusCode = status;
    this.timestamp = new Date().toISOString();
    this.message = error.response
      ? ['We were unable to process your request']
      : ['Internal Server Error'];
    this.name = name;
    this.path = path;
  }
}
