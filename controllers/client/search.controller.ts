import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singers.model";
import { convertToSlug } from "../../helpers/convert-to-slug";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  try {
    const keyword: string = `${req.query.keyword}`;
    let songs = [];

    if (req.query.keyword) {
      const keywordRegrex = new RegExp(keyword, "i");

      const slug = convertToSlug(keyword);
      const keywordSlugRegrex = new RegExp(slug, "i");

      songs = await Song.find({
        $or: [
          {
            title: keywordRegrex,
          },
          {
            slug: keywordSlugRegrex,
          },
        ],
      });
    }

    if (songs.length > 0) {
      for (const song of songs) {
        const singer = await Singer.findOne({
          _id: song.singerId,
          deleted: false,
        });
        song["infoSinger"] = singer;
      }
    }

    res.render("client/pages/searchs/result", {
      pageTitle: `Kết quả tìm kiếm cho: ${keyword}`,
      keyword,
      songs,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
};
