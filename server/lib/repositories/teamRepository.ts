import * as mongoose from 'mongoose';
import { ITeamModel } from '../../../shared/models/team.model';
interface IUserEntity extends ITeamModel, mongoose.Document { }
mongoose.model('Team', new mongoose.Schema({
    img: String,
    name: String,
    about:String,
    schedule:Array
}));

export const TeamRepository = mongoose.model<IUserEntity>('Team');