import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/admin/upload.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import multer from "multer";

const upload = multer();

router.post("/",upload.single('file'),uploadCloud.uploadSingle, controller.upload);

export const uploadRoutes: Router = router;
 