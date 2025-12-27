import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get('/', (req, res) => res.send({title: 'GET all workflow'}));

export default workflowRouter;