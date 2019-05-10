import * as mongoose from 'mongoose';
import { IServiceModel } from '../../../shared/models/service.model';
interface IUserEntity extends IServiceModel, mongoose.Document { }
mongoose.model('Service', new mongoose.Schema({
    title: String,
    what: String,
    time: String,
    value:Number
}));

export const ServiceRepository = mongoose.model<IUserEntity>('Service');