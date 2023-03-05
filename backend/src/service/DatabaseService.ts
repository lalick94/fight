import { Injectable, Inject } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {

    constructor(private config: ConfigService) {
    }

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            ...this.getDbOptions()
        };
    }

    public getDbOptions(): any {
        return {
            type: 'postgres',
            host: this.config.get<string>('DATABASE_HOST'),
            port: this.config.get<number>('DATABASE_PORT'),
            database: this.config.get<string>('DATABASE_NAME'),
            username: this.config.get<string>('DATABASE_USER'),
            password: this.config.get<string>('DATABASE_PASSWORD'),
            entities: ['dist/model/*.{ts,js}'],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        };
    }
}