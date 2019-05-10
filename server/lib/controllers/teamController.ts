import { Request, Response } from 'express';
import {RequestModel,RequestPost} from '../middlewares/authMiddleware'
import { TeamRepository } from '../repositories/teamRepository';

interface GetByAuthorIdBookParams{
    authorId:number;
}

interface GetBookParams{
}

interface GetByIdBookParams{
    bookId:string;
}

interface DeleteBookParams{
    bookId:string;
}

interface UpdateBookParams{
    bookId:string;
}

export class TeamController{

    public add (req: RequestPost<{img: String,
        name: String,
        about:String}>, res: Response) {       
        let newService = new TeamRepository(req.body);
        newService.save((err, service) => {
            if (err) return res.status(500).send('Error on the server.');  
            res.json(service);
        });
    }

    public getByAuthorId (req: RequestModel<GetByAuthorIdBookParams>, res: Response) {
        let authorId = req.params.authorId;
        TeamRepository.find({ authorId :authorId}, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }

    public get (req: RequestModel<GetBookParams>, res: Response) {
        TeamRepository.find({}, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }


    public getById (req: RequestModel<GetByIdBookParams>, res: Response) {           
        TeamRepository.findById(req.params.bookId, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }

    public update (req: RequestModel<DeleteBookParams>, res: Response) {           
        TeamRepository.findOneAndUpdate({ _id: req.params.bookId }, req.body, { new: true }, (err, contact) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(contact);
        });
    }

    public delete (req: RequestModel<UpdateBookParams>, res: Response) {           
        TeamRepository.remove({ _id: req.params.bookId }, (err) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
    
}