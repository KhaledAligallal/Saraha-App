import * as uc from "./user.controller.js";  
import{Router}from 'express';
const   router = Router()




router.get('/get',uc.getUserData)
router.post('/signup',uc.signUp)
router.post('/signin',uc.signIn)
router.put('/update',uc.Update)
router.delete('/delete',uc.Delete)

export default router