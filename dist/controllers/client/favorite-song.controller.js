"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favoriteSongs = yield favorite_song_model_1.default.find({ userId: "" });
        for (const favoriteSong of favoriteSongs) {
            const infoSong = yield songs_model_1.default.findOne({
                _id: favoriteSong.songId,
            });
            const infoSinger = yield singers_model_1.default.findOne({
                _id: infoSong.singerId,
            });
            favoriteSong["infoSong"] = infoSong;
            favoriteSong["infoSinger"] = infoSinger;
        }
        ;
        res.render("client/pages/favorite-songs/index", {
            pageTitle: "Danh sách bài hát yêu thích",
            favoriteSongs,
        });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.index = index;
