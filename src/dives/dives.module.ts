import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivesResolver } from './dives.resolver';
import { DivesService } from './dives.service';
import { Dive } from './models/dive.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dive])],
  providers: [DivesResolver, DivesService],
  exports: [DivesService],
})
export class DivesModule {}
