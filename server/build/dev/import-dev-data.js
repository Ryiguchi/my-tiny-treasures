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
// import * as fs from 'fs';
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const postData_1 = require("./postData");
const userData_1 = require("./userData");
const postModel_1 = __importDefault(require("../models/postModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
dotenv_1.default.config({ path: './config.env' });
const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
mongoose_1.default.connect(DB).then(() => console.log('DB connection succesful'));
// function sortById(arr: { title: number }[]): { title: number }[] {
//   return arr.sort((a, b) => a.title - b.title);
// }
const importPost = () => __awaiter(void 0, void 0, void 0, function* () {
    // sortById(posts);
    try {
        yield postModel_1.default.create(postData_1.posts);
        console.log('Data successfully loaded');
    }
    catch (error) {
        console.log('💥💥');
        console.log(error);
    }
    process.exit();
});
const importUser = () => __awaiter(void 0, void 0, void 0, function* () {
    // sortById(posts);
    try {
        yield userModel_1.default.create(userData_1.users);
        console.log('Data successfully loaded');
    }
    catch (error) {
        console.log('💥💥');
        console.log(error);
    }
    process.exit();
});
const deletePost = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postModel_1.default.deleteMany();
        console.log('Data successfully deleted');
    }
    catch (error) {
        console.log(error);
    }
    process.exit();
});
const deleteUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.deleteMany();
        console.log('Data successfully deleted');
    }
    catch (error) {
        console.log(error);
    }
    process.exit();
});
if (process.argv[2] === '--import-post') {
    importPost();
}
else if (process.argv[2] === '--delete-post') {
    deletePost();
}
else if (process.argv[2] === '--import-user') {
    importUser();
}
else if (process.argv[2] === '--delete-user') {
    deleteUser();
}
//  node build\dev\import-dev-data.js --import-post
//  node build\dev\import-dev-data.js --delete-post
//  node build\dev\import-dev-data.js --import-user
//  node build\dev\import-dev-data.js --delete-user
