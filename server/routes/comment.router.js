import express from 'express'
import { addComment, deleteComment, getComments, getCommentsByInsight } from '../controller/comment.controller.js'


const commentRouter = express.Router()


commentRouter.post('/addComment',addComment )
commentRouter.get('/getComments', getComments )
commentRouter.delete('/deleteComment',deleteComment )
commentRouter.get('/getcommentsbyinsight/:id', getCommentsByInsight )


export {commentRouter}
