import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory{
    constructor(private configService: ConfigService){}
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
       return{
            type:"postgres",
            host:process.env.DB_HOST,
            port:Number(process.env.DB_PORT),
            username:process.env.DB_USER,
            password:String(process.env.DB_PASSWORD),
            database:process.env.DB_NAME,
            entities:[__dirname + '/../**/*.entity{.js,ts}'],
            logging:false,
            synchronize:true,
            schema:"public",
            verboseRetryLog:true,

       }
    }

}