import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import multer from "multer";

const upload = multer();

router.get("/", controller.index);
router.get("/create", controller.create);
router.get("/edit/:id", controller.edit);
router.post(
  "/create",
  upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
  uploadCloud.uploadFields,
  controller.createPost
);
router.patch(
  "/edit/:id",
  upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
  uploadCloud.uploadFields,
  controller.editPatch
);

export const songRoutes: Router = router;
