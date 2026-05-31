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
const seats_module_1 = __webpack_require__(8);
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
            seats_module_1.SeatsModule
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
exports.SeatsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const seats_service_1 = __webpack_require__(9);
const seats_controller_1 = __webpack_require__(13);
const typeorm_1 = __webpack_require__(7);
const show_seats_entity_1 = __webpack_require__(11);
let SeatsModule = class SeatsModule {
};
exports.SeatsModule = SeatsModule;
exports.SeatsModule = SeatsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([show_seats_entity_1.ShowSeatsEntity])
        ],
        controllers: [seats_controller_1.SeatsController],
        providers: [seats_service_1.SeatsService],
    })
], SeatsModule);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeatsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(10);
const show_seats_entity_1 = __webpack_require__(11);
let SeatsService = class SeatsService {
    constructor(seatRepo, dataSoure) {
        this.seatRepo = seatRepo;
        this.dataSoure = dataSoure;
    }
    async initializeSeats(seatInitPayload) {
        const seatsToCreate = [];
        seatInitPayload.seats.forEach(seat => {
            const showSeat = this.seatRepo.create({
                venue_seat_id: seat.venue_seat_id
            });
            seatsToCreate.push(showSeat);
        });
        if (seatsToCreate.length === 0)
            return;
        await this.dataSoure.transaction(async (txManager) => {
            const txSeatRepo = txManager.getRepository(show_seats_entity_1.ShowSeatsEntity);
            // Save with 'chunk' configuration to protect database memory boundaries
            await txSeatRepo.save(seatsToCreate, { chunk: 500 });
        });
    }
    async getShowHeatMap(showId) {
        const shows = await this.seatRepo.find({
            where: { show_id: showId }
        });
        return shows;
    }
    async editStatusSeat(editSeatPayload) {
        try {
            const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000);
            await this.dataSoure.transaction(async (transectionManager) => {
                const txSeatRepo = transectionManager.getRepository(show_seats_entity_1.ShowSeatsEntity);
                await txSeatRepo.update({ id: (0, typeorm_2.In)(editSeatPayload.seatIds) }, { status: editSeatPayload.newStatus,
                    hold_by: editSeatPayload.userId,
                    hold_until: fiveMinutesFromNow
                });
            });
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                return err;
            throw new Error('Error while holding seats ' + err.message);
        }
    }
};
exports.SeatsService = SeatsService;
exports.SeatsService = SeatsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(show_seats_entity_1.ShowSeatsEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object])
], SeatsService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowSeatsEntity = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(10);
const seats_status_enum_1 = __webpack_require__(12);
let ShowSeatsEntity = class ShowSeatsEntity {
};
exports.ShowSeatsEntity = ShowSeatsEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], ShowSeatsEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('uuid'),
    tslib_1.__metadata("design:type", String)
], ShowSeatsEntity.prototype, "show_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: seats_status_enum_1.SeatStatusEnum,
        default: seats_status_enum_1.SeatStatusEnum.AVAILABLE
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof seats_status_enum_1.SeatStatusEnum !== "undefined" && seats_status_enum_1.SeatStatusEnum) === "function" ? _a : Object)
], ShowSeatsEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('uuid'),
    tslib_1.__metadata("design:type", String)
], ShowSeatsEntity.prototype, "venue_seat_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: null,
        nullable: true,
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], ShowSeatsEntity.prototype, "hold_by", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: null,
        nullable: true,
        type: 'date',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ShowSeatsEntity.prototype, "hold_until", void 0);
exports.ShowSeatsEntity = ShowSeatsEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('seats')
], ShowSeatsEntity);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeatStatusEnum = void 0;
// This enum is used to represent the status of a seat
var SeatStatusEnum;
(function (SeatStatusEnum) {
    SeatStatusEnum["AVAILABLE"] = "available";
    SeatStatusEnum["HELD"] = "held";
    SeatStatusEnum["BOOKED"] = "booked";
})(SeatStatusEnum || (exports.SeatStatusEnum = SeatStatusEnum = {}));


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeatsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const seats_service_1 = __webpack_require__(9);
const seats_init_dto_1 = __webpack_require__(14);
const seats_status_update_dto_1 = __webpack_require__(16);
let SeatsController = class SeatsController {
    constructor(seatsService) {
        this.seatsService = seatsService;
    }
    async initializeSeats(seatInitPayload) {
        return await this.seatsService.initializeSeats(seatInitPayload);
    }
    // Get Seat HeatMap
    async getShowHeatMap(showId) {
        return await this.seatsService.getShowHeatMap(showId);
    }
    async holdSeats(seatHoldPayload) {
        return await this.seatsService.editStatusSeat(seatHoldPayload);
    }
};
exports.SeatsController = SeatsController;
tslib_1.__decorate([
    (0, common_1.Post)('init-seats'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof seats_init_dto_1.SeatInitDto !== "undefined" && seats_init_dto_1.SeatInitDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeatsController.prototype, "initializeSeats", null);
tslib_1.__decorate([
    (0, common_1.Get)('show/:showId/seats'),
    tslib_1.__param(0, (0, common_1.Param)('showId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SeatsController.prototype, "getShowHeatMap", null);
tslib_1.__decorate([
    (0, common_1.Post)('hold-seats'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof seats_status_update_dto_1.SeatsStatusUpdateDto !== "undefined" && seats_status_update_dto_1.SeatsStatusUpdateDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeatsController.prototype, "holdSeats", null);
exports.SeatsController = SeatsController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof seats_service_1.SeatsService !== "undefined" && seats_service_1.SeatsService) === "function" ? _a : Object])
], SeatsController);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeatInitDto = exports.SeatEntityDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(15);
class SeatEntityDto {
}
exports.SeatEntityDto = SeatEntityDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], SeatEntityDto.prototype, "venue_seat_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], SeatEntityDto.prototype, "hold_by", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], SeatEntityDto.prototype, "hold_until", void 0);
class SeatInitDto {
}
exports.SeatInitDto = SeatInitDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], SeatInitDto.prototype, "show_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true
    }),
    tslib_1.__metadata("design:type", Array)
], SeatInitDto.prototype, "seats", void 0);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeatsStatusUpdateDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(15);
const seats_status_enum_1 = __webpack_require__(12);
class SeatsStatusUpdateDto {
}
exports.SeatsStatusUpdateDto = SeatsStatusUpdateDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], SeatsStatusUpdateDto.prototype, "showId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], SeatsStatusUpdateDto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({}),
    tslib_1.__metadata("design:type", typeof (_a = typeof seats_status_enum_1.SeatStatusEnum !== "undefined" && seats_status_enum_1.SeatStatusEnum) === "function" ? _a : Object)
], SeatsStatusUpdateDto.prototype, "newStatus", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        default: []
    }),
    tslib_1.__metadata("design:type", Array)
], SeatsStatusUpdateDto.prototype, "seatIds", void 0);


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
const swagger_1 = __webpack_require__(15);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Inventory Service APIs')
        .setDescription('Supporting Services for Seat inventory management used for HoldMySeat')
        .setVersion('1.0')
        .addServer('/api-docs')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map