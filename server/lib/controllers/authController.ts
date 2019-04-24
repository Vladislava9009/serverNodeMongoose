
import { RequestModel, RequestPost } from '../middlewares/authMiddleware';
import { Response } from 'express';
import * as bcryptjs from "bcryptjs";
import * as jsonwebtoken from "jsonwebtoken";
import { authConfig } from "../config"
import { UserRepository } from '../repositories/userRepository';

interface GetByIdBookParams{
    bookId:string;
}

interface DeleteBookParams{
    bookId:string;
}

interface UpdateBookParams{
    bookId:string;
}

export class AuthController {

    public register(req: RequestPost<{ fullName: string, email: string, password: string }>, res: Response) {
        var hashedPassword = bcryptjs.hashSync(req.body.password, 8);

        UserRepository.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            appointment:[]
        },
            (err, user) => {
                if (err) return res.status(500).send("There was a problem registering the user.")
                // create a token
                var token = jsonwebtoken.sign({ id: user._id, fullName: user.fullName, email: user.email }, authConfig.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
    }

    public login(req: RequestPost<{ email: string, password: string }>, res: Response) {
        UserRepository.findOne({ email: req.body.email }, (err, user) => {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(400).send('No user found.');
            var passwordIsValid = bcryptjs.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            var token = jsonwebtoken.sign({ id: user._id, fullName: user.fullName, email: user.email }, authConfig.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
        });
    }

    // public profile(req: RequestModel<{}>, res: Response) {
    //     res.status(200).send(req.user);
        
    // }

    public getContacts (req: Request, res: Response) {           
        UserRepository.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getById (req: RequestModel<GetByIdBookParams>, res: Response) {           
        UserRepository.findById(req.params.bookId, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }

    public update (req: RequestModel<DeleteBookParams>, res: Response) {           
        UserRepository.findOneAndUpdate({ _id: req.params.bookId }, req.body, { new: true }, (err, contact) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(contact);
        });
    }

    public delete (req: RequestModel<UpdateBookParams>, res: Response) {           
        UserRepository.remove({ _id: req.params.bookId }, (err) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
   

    
}
