"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const jobs_1 = __importDefault(require("./routes/jobs"));
require("./worker"); // Initialize the BullMQ worker
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/webhook', webhook_1.default);
app.use('/jobs', jobs_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map