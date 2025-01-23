import { Router } from "express";
import { addInsight, getallInsight, getinsightbyid, getinsightbytopic, getinsightbyUser  } from "../controller/insight.controller.js";
import multer from 'multer'
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";
import { authUser } from "../middleware/auth.middleware.js";

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp'); // Use relative path for portability
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// const upload = multer({storage:storage}); 
const upload = multer({ storage: multer.memoryStorage() });
const router = Router()

router.route('/addinsight').post( upload.single('imagefile'), authUser, addInsight)
// router.post("/addinsight", upload.single("imagefile"), async (req, res) => {
//     try {
//       const fileBuffer = req.file.buffer; // Get file buffer from Multer
//       const imageUrl = await upload_on_cloudinary(fileBuffer); // Upload image
//       res.status(200).json({ success: true, imageUrl: imageUrl });
//     } catch (error) {
//       console.error("Upload error:", error);
//       res.status(500).json({ success: false, error: "Image upload failed" });
//     }
//   });
router.route('/getallinsight').get(getallInsight)
router.route("/getinsightbytopic").post(getinsightbytopic)
router.route("/getinsightbyid").post(getinsightbyid)
router.route("/getinsightbyuser").get(getinsightbyUser)

export default router