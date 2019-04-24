import { IEnvironment } from "./environment";

export const productionEnvironment:IEnvironment={
    // mongoDbConnectionString:"mongodb://sa:qwe123@mongodb-shard-00-00-a6ysx.mongodb.net:27017,mongodb-shard-00-01-a6ysx.mongodb.net:27017,mongodb-shard-00-02-a6ysx.mongodb.net:27017/test?ssl=true&replicaSet=MongoDb-shard-0&authSource=admin&retryWrites=true"
    mongoDbConnectionString:"mongodb+srv://user:123@cluster0-mpmd0.mongodb.net/test"
}