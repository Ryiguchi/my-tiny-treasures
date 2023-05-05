"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.get('/posts/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path_1.default.join(__dirname, '../../public/photos/posts', filename);
    // const contentType = 'image/jpeg';
    // res.set('Content-Type', contentType);
    res.sendFile(filepath);
});
exports.default = router;
