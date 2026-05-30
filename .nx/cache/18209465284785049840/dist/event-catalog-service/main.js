/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const events_module_1 = __webpack_require__(8);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DB_CONNECTION_STRING,
                autoLoadEntities: true,
                synchronize: true,
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            events_module_1.EventsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const events_service_1 = __webpack_require__(9);
const events_controller_1 = __webpack_require__(15);
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [events_controller_1.EventsController],
        providers: [events_service_1.EventsService],
    })
], EventsModule);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const event_entity_1 = __webpack_require__(10);
const typeorm_2 = __webpack_require__(11);
const event_show_entity_1 = __webpack_require__(13);
const venues_entity_1 = __webpack_require__(14);
let EventsService = class EventsService {
    constructor(evenRepo, showRepo, venueRepo) {
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(event_entity_1.EventEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(event_show_entity_1.EventShowEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(venues_entity_1.VenuesEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], EventsService);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEntity = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(11);
const constants_1 = __webpack_require__(12);
const event_show_entity_1 = __webpack_require__(13);
let EventEntity = class EventEntity {
};
exports.EventEntity = EventEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, typeorm_1.Index)(),
    tslib_1.__metadata("design:type", Object)
], EventEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: constants_1.EventType
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof constants_1.EventType !== "undefined" && constants_1.EventType) === "function" ? _a : Object)
], EventEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'text'
    }),
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: constants_1.EventStatus,
        default: constants_1.EventStatus.DRAFT
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof constants_1.EventStatus !== "undefined" && constants_1.EventStatus) === "function" ? _b : Object)
], EventEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Array)
], EventEntity.prototype, "location_cities", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "banner_url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid'
    }),
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "organizer_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at'
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], EventEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at'
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], EventEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => event_show_entity_1.EventShowEntity, (eventShow) => eventShow.event),
    tslib_1.__metadata("design:type", Array)
], EventEntity.prototype, "shows", void 0);
exports.EventEntity = EventEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('events')
], EventEntity);
/*
We only need to explicitly pass the type inside the @Column option whene:

    1. We want a specific subtype (like wanting `text` block or a `uuid` instead of a standard 'varchar')
    2. We are dealing with complex types like 'enum' , 'jsobb'


- The @UpdateDateColumn only updates the timestamp only if we use save funciton while updating the entity

*/ 


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowStatus = exports.EventStatus = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["MOVIE"] = "movie";
    EventType["CONCERT"] = "concert";
    EventType["SPORTS"] = "sports";
    EventType["STANDUP"] = "standup";
})(EventType || (exports.EventType = EventType = {}));
var EventStatus;
(function (EventStatus) {
    EventStatus["DRAFT"] = "draft";
    EventStatus["PUBLISHED"] = "published";
    EventStatus["CANCELLED"] = "cancelled";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
var ShowStatus;
(function (ShowStatus) {
    ShowStatus["CANCELLED"] = "cancelled";
    ShowStatus["RUNNING"] = "running";
    ShowStatus["HOUSEFULL"] = "housefull";
    ShowStatus["PENDING"] = "pending";
})(ShowStatus || (exports.ShowStatus = ShowStatus = {}));


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventShowEntity = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(11);
const event_entity_1 = __webpack_require__(10);
const venues_entity_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(12);
let EventShowEntity = class EventShowEntity {
};
exports.EventShowEntity = EventShowEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], EventShowEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.EventEntity, (event) => event.shows),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof event_entity_1.EventEntity !== "undefined" && event_entity_1.EventEntity) === "function" ? _a : Object)
], EventShowEntity.prototype, "event", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => venues_entity_1.VenuesEntity, (venueEntity) => venueEntity.shows),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof venues_entity_1.VenuesEntity !== "undefined" && venues_entity_1.VenuesEntity) === "function" ? _b : Object)
], EventShowEntity.prototype, "venue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'total_seats',
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], EventShowEntity.prototype, "totalSeats", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'available_seats',
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], EventShowEntity.prototype, "availableSeats", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: constants_1.ShowStatus,
        default: constants_1.ShowStatus.PENDING,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof constants_1.ShowStatus !== "undefined" && constants_1.ShowStatus) === "function" ? _c : Object)
], EventShowEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'special_notes',
        nullable: true,
        type: 'text'
    }),
    tslib_1.__metadata("design:type", String)
], EventShowEntity.prototype, "specialNotes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'base_price'
    }),
    tslib_1.__metadata("design:type", Number)
], EventShowEntity.prototype, "basePrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'start_time'
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], EventShowEntity.prototype, "startTime", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'end_time'
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], EventShowEntity.prototype, "endTime", void 0);
exports.EventShowEntity = EventShowEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('event_show')
], EventShowEntity);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenuesEntity = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(11);
const event_show_entity_1 = __webpack_require__(13);
let VenuesEntity = class VenuesEntity {
};
exports.VenuesEntity = VenuesEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], VenuesEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], VenuesEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], VenuesEntity.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], VenuesEntity.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], VenuesEntity.prototype, "capacity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)('created_at'),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], VenuesEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => event_show_entity_1.EventShowEntity, (eventShow) => eventShow.venue),
    tslib_1.__metadata("design:type", Array)
], VenuesEntity.prototype, "shows", void 0);
exports.VenuesEntity = VenuesEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('venues')
], VenuesEntity);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const events_service_1 = __webpack_require__(9);
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    sayHI() {
        return "hi";
    }
};
exports.EventsController = EventsController;
tslib_1.__decorate([
    (0, common_1.Get)('test'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "sayHI", null);
exports.EventsController = EventsController = tslib_1.__decorate([
    (0, common_1.Controller)('events'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof events_service_1.EventsService !== "undefined" && events_service_1.EventsService) === "function" ? _a : Object])
], EventsController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map