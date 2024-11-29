import express from 'express'
import { storeData } from '../controller/CheckinPG.js';
import Authenticate from '../middleware/authenticate.js';


const checkInRouter = express.Router();

checkInRouter.post('/checkSave',Authenticate,storeData)

export default checkInRouter