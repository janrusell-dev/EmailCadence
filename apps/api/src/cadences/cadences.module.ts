import { Module } from '@nestjs/common';
import { CadencesService } from './cadences.service';
import { CadencesController } from './cadences.controller';

@Module({
  providers: [CadencesService],
  controllers: [CadencesController],
  exports: [CadencesService],
})
export class CadencesModule {}
