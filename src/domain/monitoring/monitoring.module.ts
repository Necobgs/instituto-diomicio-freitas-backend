import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitoring } from './entities/monitoring.entity';
import { MonitoringRepository } from './monitoring.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Monitoring])],
  controllers: [MonitoringController],
  providers: [MonitoringService, MonitoringRepository],
  exports: [MonitoringService, MonitoringRepository],
})
export class MonitoringModule {}
