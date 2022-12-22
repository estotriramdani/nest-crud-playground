import * as path from 'path';
import * as fs from 'fs';
import * as moment from 'moment';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    console.log(body.name);
    if (!file) {
      // throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      throw new BadRequestException();
    }
    const fileName = `V2_${moment().format('YYYYMMDDHHmmss')}_${
      file.originalname
    }`;
    const p = path.join(`${process.env.FILE_STORAGE_PATH}\\${fileName}`);
    fs.writeFileSync(p, file.buffer);
    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }

  @Get()
  findAll(@Query() query: any) {
    console.log(process.env.DB_HOST);
    console.log(query);
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
