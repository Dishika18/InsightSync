import express from 'express'
import { addComment, deleteComment, getComments } from '../controller/comment.controller.js'


const commentRouter = express.Router()


commentRouter.post('/addComment',addComment )
commentRouter.get('/getComments', getComments )
commentRouter.delete('/deleteComment',deleteComment )


export {commentRouter}
