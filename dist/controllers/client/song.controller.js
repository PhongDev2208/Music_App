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
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugTopic = req.params.slugTopic;
        const topic = yield topics_model_1.default.findOne({
            slug: slugTopic,
            status: "active",
            deleted: false,
        });
        const songs = yield songs_model_1.default.find({
            topicId: topic.id,
            status: "active",
            deleted: false,
        }).select("title avatar like singerId slug");
        for (const song of songs) {
            const infoSinger = yield singers_model_1.default.findOne({
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
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const song = yield songs_model_1.default.findOne({
            slug: slugSong,
            status: "active",
            deleted: false,
        });
        const topic = yield topics_model_1.default.findOne({
            _id: song.topicId,
            status: "active",
            deleted: false,
        }).select("title");
        const singer = yield singers_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false,
        }).select("fullName");
        const favoriteSong = yield favorite_song_model_1.default.findOne({
            userId: "",
            songId: song.id,
        });
        song["isFavorite"] = favoriteSong ? true : false;
        res.render("client/pages/songs/detail.pug", {
            pageTitle: song.title,
            song: song,
            singer: singer,
            topic: topic,
        });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const type = req.params.type;
        const song = yield songs_model_1.default.findOne({
            _id: idSong,
            status: "active",
            deleted: false,
        }).select("like");
        let likeNew = song.like;
        if (type === "like") {
            likeNew += 1;
        }
        else {
            likeNew -= 1;
        }
        yield songs_model_1.default.updateOne({
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
        });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const type = req.params.type;
        if (type === "yes") {
            const existRecord = yield favorite_song_model_1.default.findOne({
                userId: "",
                songId: idSong,
            });
            if (!existRecord) {
                const record = new favorite_song_model_1.default({
                    userId: "",
                    songId: idSong,
                });
                record.save();
            }
        }
        else {
            yield favorite_song_model_1.default.deleteOne({
                userId: "",
                songId: idSong,
            });
        }
        res.json({
            code: 200,
            message: "Success"
        });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const song = yield songs_model_1.default.findOne({
            _id: idSong,
            status: "active",
            deleted: false,
        }).select("listen");
        const listenNew = song.listen + 1;
        yield songs_model_1.default.updateOne({
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
        });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.listen = listen;
