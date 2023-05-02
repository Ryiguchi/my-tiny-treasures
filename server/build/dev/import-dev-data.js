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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const postData_1 = require("./postData");
const postModel_1 = __importDefault(require("../models/postModel"));
dotenv_1.default.config({ path: './config.env' });
const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
mongoose_1.default.connect(DB).then(() => console.log('DB connection succesful'));
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
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
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postModel_1.default.deleteMany();
        console.log('Data successfully deleted');
    }
    catch (error) {
        console.log(error);
    }
    process.exit();
});
if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}
//  node .\dev\import-dev-data.js --import
