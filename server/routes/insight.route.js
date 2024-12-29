import { Router } from "express";
import { addInsight, getallInsight, getinsightbyid, getinsightbytopic  } from "../controller/insight.controller.js";
import multer from 'multer'


// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Use relative path for portability
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ dest: "./uploads/" }); 
const router = Router()

router.route('/addinsight').post( upload.single('imagefile'), addInsight)
router.route('/getallinsight').get(getallInsight)
router.route("/getinsightbytopic").post(getinsightbytopic)
router.route("/getinsightbyid").post(getinsightbyid)

export default router