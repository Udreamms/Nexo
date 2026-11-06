"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyUfSync = exports.onLeadCreated = void 0;
const app_1 = require("firebase-admin/app");
(0, app_1.initializeApp)();
var onLeadCreated_1 = require("./triggers/onLeadCreated");
Object.defineProperty(exports, "onLeadCreated", { enumerable: true, get: function () { return onLeadCreated_1.onLeadCreated; } });
var dailyUfSync_1 = require("./scheduled/dailyUfSync");
Object.defineProperty(exports, "dailyUfSync", { enumerable: true, get: function () { return dailyUfSync_1.dailyUfSync; } });
//# sourceMappingURL=index.js.map