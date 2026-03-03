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
import { AuthModule } from './domain/auth/auth.module';
import { NotificationModule } from './domain/notification/notification.module';
import { EmailModule } from './integrations/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { PermissionModule } from './domain/permission/permission.module';
import { RoleModule } from './domain/role/role.module';

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
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get('EMAIL_USER'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      })
    }),
    EmailModule,
    UserModule,
    EnterpriseModule,
    StudentModule,
    MonitoringModule,
    EvaluationModule,
    EvaluationFieldTypeModule,
    EvaluationQuestionModule,
    EvaluationFieldModule,
    AuthModule,
    NotificationModule,
    PermissionModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
