import { ServiceController } from './../controllers/serviceController';
import { Request, Response, NextFunction } from "express";
import { BookController } from "../controllers/bookController";
import { AuthorController } from "../controllers/authorController";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { AuthController } from "../controllers/authController"
import { TeamController } from '../controllers/teamController';

export class Routes {

    public bookController: BookController = new BookController()
    public authorController: AuthorController = new AuthorController()
    public authController: AuthController = new AuthController()
    public serviceController:ServiceController = new ServiceController()
    public teamController: TeamController = new TeamController()

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Auth
        app.route('/auth/profile/get')
            .get( this.authController.getContacts);
        app.route('/auth/register')
            .post(this.authController.register);
        app.route('/auth/login')
            .post(this.authController.login);
        app.route('/auth/profile/:bookId')
            .get( this.authController.getById)
            .put( this.authController.update)
            .delete( this.authController.delete)

        // Book 
        app.route('/book')
            .post( this.bookController.add);
        app.route('/book/get/:authorId')
            .get( this.bookController.getByAuthorId)
        app.route('/book/get')
            .get( this.bookController.get)
        app.route('/book/:bookId')
            .get( this.bookController.getById)
            .put( this.bookController.update)
            .delete( this.bookController.delete)

        // Service 
        app.route('/service')
            .post( this.serviceController.add);
        app.route('/service/get/:authorId')
            .get( this.serviceController.getByAuthorId)
        app.route('/service/get')
            .get( this.serviceController.get)
        app.route('/service/:bookId')
            .get( this.serviceController.getById)
            .put( this.serviceController.update)
            .delete( this.serviceController.delete)

        // Team 
        app.route('/team')
            .post( this.teamController.add);
        app.route('/team/get/:authorId')
            .get( this.teamController.getByAuthorId)
        app.route('/team/get')
            .get( this.teamController.get)
        app.route('/team/:bookId')
            .get( this.teamController.getById)
            .put( this.teamController.update)
            .delete( this.teamController.delete)

        // Author 
        app.route('/author')
            .get(AuthMiddleware, this.authorController.get)
            .post(AuthMiddleware, this.authorController.add);
        app.route('/author/:authorId')
            .get(AuthMiddleware, this.authorController.getById)
            .put(AuthMiddleware, this.authorController.update)
            .delete(AuthMiddleware, this.authorController.delete)

    }
}