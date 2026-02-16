import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CadencesService } from './cadences.service';
import { CreateCadenceDto } from './dto/create-cadence.dto';
import { UpdateCadenceDto } from './dto/update-cadence.dto';

@Controller('cadences')
export class CadencesController {
  constructor(private readonly cadencesService: CadencesService) {}

  @Post()
  createCadence(@Body() createCadenceDto: CreateCadenceDto) {
    return this.cadencesService.createCadence(createCadenceDto);
  }
  @Get(':id')
  getCadence(@Param('id') id: string) {
    return this.cadencesService.getCadence(id);
  }
  @Put(':id')
  updateCadence(
    @Param('id') id: string,
    @Body() updateCadenceDto: UpdateCadenceDto,
  ) {
    return this.cadencesService.updateCadence(id, updateCadenceDto);
  }
}
