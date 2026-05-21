"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takedownWorker = void 0;
const bullmq_1 = require("bullmq");
const axios_1 = __importDefault(require("axios"));
const queue_1 = require("./queue");
const validators_1 = require("./validators");
exports.takedownWorker = new bullmq_1.Worker('takedown-jobs', async (job) => {
    // Simulate HTTP external call to Meta API using jsonplaceholder
    const response = await axios_1.default.get('https://jsonplaceholder.typicode.com/posts/1', {
        timeout: 5000,
    });
    // Ensure the response is successful
    if (response.status >= 200 && response.status < 300) {
        return { success: true, message: 'Takedown processed successfully' };
    }
    else {
        throw new Error(`External API failed with status ${response.status}`);
    }
}, {
    connection: queue_1.redisConnection,
    concurrency: 5,
});
exports.takedownWorker.on('completed', (job) => {
    console.log(`Job with id ${job.id} has been completed`);
});
exports.takedownWorker.on('failed', (job, err) => {
    console.log(`Job with id ${job?.id} has failed with ${err.message}`);
});
//# sourceMappingURL=worker.js.map