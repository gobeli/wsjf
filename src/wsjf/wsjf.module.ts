import { PlanningController } from './planning.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from './entities/planning.entity';
import { Story } from './entities/story.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Planning, Story])
  ],
  controllers: [PlanningController]
})
export class WsjfModule {

}