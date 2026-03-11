import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './domain/user/user.module';
import { EnterpriseModule } from './domain/enterprise/enterprise.module';
import { StudentModule } from './domain/student/student.module';
import { MonitoringModule } from './domain/monitoring/monitoring.module';
import { EvaluationModule } from './domain/evaluation/evaluation.module';
import { AuthModule } from './domain/auth/auth.module';
import { EmailModule } from './integrations/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { PermissionModule } from './domain/permission/permission.module';
import { RoleModule } from './domain/role/role.module';
import { JobModule } from './domain/job/job.module';
import { ReferralModule } from './domain/referral/referral.module';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_PG_URL'),
        autoLoadEntities: true,
        synchronize: true,
        entities: ['dist/**/*.entity.js']
      })
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
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
    AuthModule,
    PermissionModule,
    RoleModule,
    JobModule,
    ReferralModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
