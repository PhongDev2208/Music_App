import { Request, Response } from "express";
import Topic from "../../models/topics.model";

// [GET] /admin/dashboards
export const index = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({
      deleted: false,
    });

    res.render(`admin/pages/topics/index.pug`, {
      pageTitle: "Dashboard",
      topics,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};
