import {Module} from "@nestjs/common";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {User} from "./users/users.entity";


@Module( {
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot( {
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User],
            synchronize: true,
        }),
        UsersModule,
    ]
})
export class AppModule {}