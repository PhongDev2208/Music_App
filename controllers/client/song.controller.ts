import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Topic from "../../models/topics.model";
import Singer from "../../models/singers.model";
import FavoriteSong from "../../models/favorite-song.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  try {
    const slugTopic : string = req.params.slugTopic;

    const topic = await Topic.findOne({
      slug: slugTopic,
      status: "active",
      deleted: false,
    });

    const songs = await Song.find({
      topicId: topic.id,
      status: "active",
      deleted: false,
    }).select("title avatar like singerId slug");

    for (const song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false,
      });

      song["infoSinger"] = infoSinger;
    }

    res.render("client/pages/songs/list.pug", {
      pageTitle: topic.title,
      songs: songs,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong : string = req.params.slugSong;

    const song = await Song.findOne({
      slug: slugSong,
      status: "active",
      deleted: false,
    })

    const topic = await Topic.findOne({
      _id: song.topicId,
      status: "active",
      deleted: false,
    }).select("title");

    const singer = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    }).select("fullName");

    const favoriteSong = await FavoriteSong.findOne({
      userId: "",
      songId: song.id,});

      song["isFavorite"] = favoriteSong ? true : false;

    res.render("client/pages/songs/detail.pug", {
      pageTitle: song.title,
      song: song,
      singer: singer,
      topic: topic,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};

// [PATCH] /songs/like/:type/:idSong
export const like = async (req: Request, res: Response) => {
  try {
    const idSong : string = req.params.idSong;
    const type : string = req.params.type;

    
    const song = await Song.findOne({
      _id: idSong,
      status: "active",
      deleted: false,
    }).select("like");
    
    let likeNew = song.like;

    if(type === "like") {
      likeNew += 1;
    } else {
      likeNew -= 1;
    }

    await Song.updateOne({
      _id: idSong,
      status: "active",
      deleted: false,
    }, {
      like: likeNew,
    });

    res.json({
      code: 200,
      message: "Success",
      like: likeNew,
    })
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};

// [PATCH] /songs/favorite/:type/:idSong
export const favorite = async (req: Request, res: Response) => {
  try {
    const idSong : string = req.params.idSong;
    const type : string = req.params.type;

    
    
    if(type === "yes") {
      const existRecord = await FavoriteSong.findOne({
        userId: "",
        songId: idSong,
      });

      if(!existRecord) {
        const record = new FavoriteSong({
          userId: "",
          songId: idSong,
        });

        record.save();
      }
    } else {
      await FavoriteSong.deleteOne({
        userId: "",
        songId: idSong,
      });
    }

    res.json({
      code: 200,
      message: "Success"
    })
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};

// [PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  try {
    const idSong : string = req.params.idSong;
    
    const song = await Song.findOne({
      _id: idSong,
      status: "active",
      deleted: false,
    }).select("listen");

    const listenNew : number = song.listen + 1;

    await Song.updateOne({
      _id: idSong,
      status: "active",
      deleted: false,
    }, {
      listen: listenNew,
    });

    res.json({
      code: 200,
      message: "Success",
      listen: listenNew,
    })
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};
