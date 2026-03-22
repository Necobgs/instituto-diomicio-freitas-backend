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
import { JobModule } from './domain/job/job.module';
import { ReferralModule } from './domain/referral/referral.module';
import { ResourceModule } from './domain/resource/resource.module';
import { PermissionsMigration1710631234567 } from './migrations/1710631234567-permissions-migration';
import { ActionsMigration1710631234566 } from './migrations/1710631234566-actions-migration';
import { ResourcesMigration1710631234565 } from './migrations/1710631234565-resources-migration';
import { UserFullPermissionsMigration1710631234575 } from './migrations/1710631234575-user-full-permissions-migration';
import { ActionModule } from './domain/action/action.module';


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
        entities: ['dist/**/*.entity.js'],
        migrations: [
          ActionsMigration1710631234566,
          ResourcesMigration1710631234565,
          PermissionsMigration1710631234567,
          UserFullPermissionsMigration1710631234575
        ],
        migrationsRun: true,
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
    JobModule,
    ReferralModule,
    ResourceModule,
    ActionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
