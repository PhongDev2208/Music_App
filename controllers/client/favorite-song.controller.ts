import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singers.model";

// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
  try {
    const favoriteSongs = await FavoriteSong.find({ userId: "" });

    for(const favoriteSong of favoriteSongs) {
      const infoSong = await Song.findOne({
        _id: favoriteSong.songId,
      });

      const infoSinger = await Singer.findOne({
        _id: infoSong.singerId,
      });

      favoriteSong["infoSong"] = infoSong;
      favoriteSong["infoSinger"] = infoSinger;
    };

    res.render("client/pages/favorite-songs/index", {
      pageTitle: "Danh sách bài hát yêu thích",
      favoriteSongs,
    });

  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};
