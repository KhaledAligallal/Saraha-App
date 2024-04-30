import * as mc from "./message.controller.js";  
import{Router}from 'express';
const   router = Router()
 
router.post('/sendto/:sendTo',mc.sendMessage)
router.delete('/deletemsg',mc.deleteMessage)
router.put('/updatemsg',mc.markMessageAsRead)
router.get('/sort',mc.listUserMessage)
export default router