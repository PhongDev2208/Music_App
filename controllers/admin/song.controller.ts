import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Topic from "../../models/topics.model";
import Singer from "../../models/singers.model";
import { systemConfig } from "../../config/system";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find({
      deleted: false,
    });

    for (const song of songs) {
      const topic = await Topic.findOne({
        _id: song.topicId,
      });

      const singer = await Singer.findOne({
        _id: song.singerId,
      });

      song["infoTopic"] = topic;
      song["infoSinger"] = singer;
    }

    res.render(`admin/pages/songs/index.pug`, {
      pageTitle: "Danh sách bài hát",
      songs,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};

// [GET] /admin/create
export const create = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({
      deleted: false,
    });

    const singers = await Singer.find({
      deleted: false,
    });

    res.render(`admin/pages/songs/create.pug`, {
      pageTitle: "Trang tạo bài hát",
      topics,
      singers,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};

// [POST] /admin/create
export const createPost = async (req: Request, res: Response) => {
  try {
    if (req.body["avatar"]) {
      req.body["avatar"] = req.body["avatar"][0];
    }

    if (req.body["audio"]) {
      req.body["audio"] = req.body["audio"][0];
    }

    const song = new Song(req.body);
    await song.save();
    

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};

// [GET] /admin/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id : string = req.params.id;

    const song = await Song.findOne({
      _id: id,
      deleted: false,
      status: "active",
    });

    const topics = await Topic.find({
      deleted: false,
    });

    const singers = await Singer.find({
      deleted: false,
    });

    res.render(`admin/pages/songs/edit.pug`, {
      pageTitle: "Trang chỉnh sửa bài hát",
      topics,
      song,
      singers,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};

// [POST] /admin/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  try {
    const id : string = req.params.id;
    
    if (req.body["avatar"]) {
      req.body["avatar"] = req.body["avatar"][0];
    }

    if (req.body["audio"]) {
      req.body["audio"] = req.body["audio"][0];
    }

    await Song.updateOne({
      _id: id,
      deleted: false,
      status: "active",
    }, req.body);

    res.redirect('back');
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};