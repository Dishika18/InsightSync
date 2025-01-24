import express from 'express'
import { deleteProfile, editProfile, getinsights, getProfile } from '../controller/profile.controller.js'
import multer from 'multer'

const upload = multer({storage:multer.memoryStorage()})
const profileRouter = express.Router()

profileRouter.route('/getprofile').get(getProfile)
profileRouter.route('/editprofile').post( upload.single('image') ,editProfile)
profileRouter.route('/deleteprofile').delete(deleteProfile)
profileRouter.route('/getinsights').get(getinsights)

export {profileRouter}