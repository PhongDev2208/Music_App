import { Request, Response, NextFunction } from "express";
import uploadToCloudinary from "../../helpers/upload-to-cloudinary.helper";

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req["file"]) {
    const result = await uploadToCloudinary(req["file"]["buffer"]);
    req.body[req["file"]["fieldname"]] = result;
  }

  next();
};

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req["files"]);
    for (const key in req["files"]) {
      req.body[key] = [];

      const array = req["files"][key];
      for (const item of array) {
        const result = await uploadToCloudinary(item["buffer"]);
        console.log(key,result)
        req.body[key].push(result);
      }
    }
  } catch (error) {
    console.log(error);
  }

  next();
};
