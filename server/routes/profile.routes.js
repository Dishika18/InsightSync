import express from 'express'
import { getProfile } from '../controller/profile.controller.js'


const profileRouter = express.Router()

profileRouter.route('/getprofile').post(getProfile)

export {profileRouter}