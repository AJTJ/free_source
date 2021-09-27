import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DiveSessionsResolver } from './dive-sessions.resolver';
import { DiveSessionsService } from './dive-sessions.service';
import { DiveSession } from './models/dive-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiveSession]), UsersModule],
  providers: [DiveSessionsResolver, DiveSessionsService],
  exports: [DiveSessionsService],
})
export class DiveSessionsModule {}
