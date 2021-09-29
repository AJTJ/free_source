import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveSessionsModule } from 'src/dive-sessions/dive-sessions.module';
import { DivesResolver } from './dives.resolver';
import { DivesService } from './dives.service';
import { DiveEntity } from './models/dive.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiveEntity]), DiveSessionsModule],
  providers: [DivesResolver, DivesService],
  exports: [DivesService],
})
export class DivesModule {}
