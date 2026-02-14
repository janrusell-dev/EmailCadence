import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CadencesService } from './cadences.service';

@Controller('cadences')
export class CadencesController {
  constructor(private readonly cadencesService: CadencesService) {}

  @Post()
  createCadence(): string {
    return this.cadencesService.createCadence();
  }
  @Get(':id')
  getCadence(@Param('id') id: string): string {
    return this.cadencesService.getCadence(id);
  }
  @Put(':id')
  updateCadence(@Param('id') id: string) {
    return this.cadencesService.updateCadence(id);
  }
}
