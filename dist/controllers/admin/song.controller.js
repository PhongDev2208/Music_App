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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield songs_model_1.default.find({
            deleted: false,
        });
        for (const song of songs) {
            const topic = yield topics_model_1.default.findOne({
                _id: song.topicId,
            });
            const singer = yield singers_model_1.default.findOne({
                _id: song.singerId,
            });
            song["infoTopic"] = topic;
            song["infoSinger"] = singer;
        }
        res.render(`admin/pages/songs/index.pug`, {
            pageTitle: "Danh sách bài hát",
            songs,
        });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topics_model_1.default.find({
            deleted: false,
        });
        const singers = yield singers_model_1.default.find({
            deleted: false,
        });
        res.render(`admin/pages/songs/create.pug`, {
            pageTitle: "Trang tạo bài hát",
            topics,
            singers,
        });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body["avatar"]) {
            req.body["avatar"] = req.body["avatar"][0];
        }
        if (req.body["audio"]) {
            req.body["audio"] = req.body["audio"][0];
        }
        const song = new songs_model_1.default(req.body);
        yield song.save();
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const song = yield songs_model_1.default.findOne({
            _id: id,
            deleted: false,
            status: "active",
        });
        const topics = yield topics_model_1.default.find({
            deleted: false,
        });
        const singers = yield singers_model_1.default.find({
            deleted: false,
        });
        res.render(`admin/pages/songs/edit.pug`, {
            pageTitle: "Trang chỉnh sửa bài hát",
            topics,
            song,
            singers,
        });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (req.body["avatar"]) {
            req.body["avatar"] = req.body["avatar"][0];
        }
        if (req.body["audio"]) {
            req.body["audio"] = req.body["audio"][0];
        }
        yield songs_model_1.default.updateOne({
            _id: id,
            deleted: false,
            status: "active",
        }, req.body);
        res.redirect('back');
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.editPatch = editPatch;
