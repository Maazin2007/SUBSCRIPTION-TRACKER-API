import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/',  (req, res) => res.send({title: 'GET all subscription'}));

subscriptionRouter.get('/:id',  (req, res) => res.send({title: 'GET subscription details'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id',  (req, res) => res.send({title: 'UPDATE a subscription'}));

subscriptionRouter.delete('/:id',  (req, res) => res.send({title: 'DELETE subscription'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel',  (req, res) => res.send({title: 'CANCEL SUBSCRITPION'}));

subscriptionRouter.get('/upcoming-renewals',  (req, res) => res.send({title: 'GET upcoming subscriptions'}));


export default subscriptionRouter;