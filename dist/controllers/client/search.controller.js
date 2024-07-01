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
exports.result = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const convert_to_slug_1 = require("../../helpers/convert-to-slug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = `${req.query.keyword}`;
        let songs = [];
        if (req.query.keyword) {
            const keywordRegrex = new RegExp(keyword, "i");
            const slug = (0, convert_to_slug_1.convertToSlug)(keyword);
            const keywordSlugRegrex = new RegExp(slug, "i");
            songs = yield songs_model_1.default.find({
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
                const singer = yield singers_model_1.default.findOne({
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
    }
    catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});
exports.result = result;
