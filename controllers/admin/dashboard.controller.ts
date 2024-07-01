import { Request, Response } from "express";
import { systemConfig } from "../../config/system";

// [GET] /admin/dashboards
export const index = async (req: Request, res: Response) => {
  try {
    res.render(`admin/pages/dashboard/index.pug`, {
      pageTitle: "Dashboard",
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};
