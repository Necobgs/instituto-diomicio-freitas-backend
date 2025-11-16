import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './domain/user/user.module';
import { EnterpriseModule } from './domain/enterprise/enterprise.module';
import { StudentModule } from './domain/student/student.module';
import { MonitoringModule } from './domain/monitoring/monitoring.module';
import { EvaluationModule } from './domain/evaluation/evaluation.module';
import { EvaluationFieldTypeModule } from './domain/evaluation_field_type/evaluation_field_type.module';
import { EvaluationQuestionModule } from './domain/evaluation_question/evaluation_question.module';
import { EvaluationFieldModule } from './domain/evaluation_field/evaluation_field.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true 
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=>({
        type:'postgres',
        database:configService.get('DATABASE_NAME'),
        username:configService.get('DATABASE_USER'),
        password:configService.get('DATABASE_PASSWORD'),
        port:5432,
        autoLoadEntities:true,
        synchronize:true,
        entities:['dist/**/*.entity.js']
      })
    }),
    UserModule,
    EnterpriseModule,
    StudentModule,
    MonitoringModule,
    EvaluationModule,
    EvaluationFieldTypeModule,
    EvaluationQuestionModule,
    EvaluationFieldModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
