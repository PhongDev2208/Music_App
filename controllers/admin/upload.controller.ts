import { Request, Response } from "express";
import { systemConfig } from "../../config/system";

// [GET] /admin/upload
export const upload = async (req: Request, res: Response) => {
  try {
    res.json({
      location: req.body["file"],
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};
