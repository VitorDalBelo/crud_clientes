import { Module } from '@nestjs/common';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './database';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService]
    }),
    ClientesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
