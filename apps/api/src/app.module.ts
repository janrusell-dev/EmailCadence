import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CadencesModule } from './cadences/cadences.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [CadencesModule, EnrollmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
