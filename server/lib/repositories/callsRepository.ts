import * as mongoose from 'mongoose';
import { ICallsModel } from '../../../shared/models/calls.model';
interface ICallsEntity extends ICallsModel, mongoose.Document { }
mongoose.model('Calls', new mongoose.Schema({
    phone:String
}));

export const CallsRepository = mongoose.model<ICallsEntity>('Calls');