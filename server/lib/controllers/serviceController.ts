import { Request, Response } from 'express';
import {RequestModel,RequestPost} from '../middlewares/authMiddleware'
import { ServiceRepository } from '../repositories/serviceRepository';

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

export class ServiceController{

    public add (req: RequestPost<{ title: string,
        what: string,
        time: string,
        value:number}>, res: Response) {       
        let newService = new ServiceRepository(req.body);
        newService.save((err, service) => {
            if (err) return res.status(500).send('Error on the server.');  
            res.json(service);
        });
    }

    public getByAuthorId (req: RequestModel<GetByAuthorIdBookParams>, res: Response) {
        let authorId = req.params.authorId;
        ServiceRepository.find({ authorId :authorId}, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }

    public get (req: RequestModel<GetBookParams>, res: Response) {
        ServiceRepository.find({}, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }


    public getById (req: RequestModel<GetByIdBookParams>, res: Response) {           
        ServiceRepository.findById(req.params.bookId, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }

    public update (req: RequestModel<DeleteBookParams>, res: Response) {           
        ServiceRepository.findOneAndUpdate({ _id: req.params.bookId }, req.body, { new: true }, (err, contact) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(contact);
        });
    }

    public delete (req: RequestModel<UpdateBookParams>, res: Response) {           
        ServiceRepository.remove({ _id: req.params.bookId }, (err) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
    
}