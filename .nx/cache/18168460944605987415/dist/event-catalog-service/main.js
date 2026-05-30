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
const venues_module_1 = __webpack_require__(19);
const shows_module_1 = __webpack_require__(23);
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
            events_module_1.EventsModule,
            venues_module_1.VenuesModule,
            shows_module_1.ShowsModule
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
const typeorm_1 = __webpack_require__(7);
const event_entity_1 = __webpack_require__(10);
const event_show_entity_1 = __webpack_require__(13);
const venues_entity_1 = __webpack_require__(14);
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([event_entity_1.EventEntity, venues_entity_1.VenuesEntity, event_show_entity_1.EventShowEntity]),
        ],
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
    constructor(evenRepo, venueRepo, showRepo) {
        this.evenRepo = evenRepo;
        this.venueRepo = venueRepo;
        this.showRepo = showRepo;
    }
    async registerEvent(eventData) {
        try {
            const event = await this.evenRepo.create({
                name: eventData.event_name,
                type: eventData.event_type,
                description: eventData.description,
                organizer_id: eventData.organizer_id
            });
            await this.evenRepo.save(event);
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                return err;
            throw new Error(`Error while registering the event ${eventData.event_name}: ${err.message}`);
        }
    }
    async updateEventStatus(status, event_id) {
        try {
            const event = await this.evenRepo.findOne({
                where: {
                    id: event_id
                }
            });
            if (!event)
                throw common_1.NotFoundException;
            event.status = status;
            await this.evenRepo.save(event);
            return { message: 'event status has been updated successfully' };
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                return common_1.HttpException;
            throw new Error(`Error while updating the status of the event: ${err.message}`);
        }
    }
    async getEvents(filterData) {
        console.log("Filter data received at the service: ", filterData);
        // console.log("Events After Join: ", events)
        // console.log(filterData.id)
        try {
            const query = this.evenRepo.createQueryBuilder('events')
                .leftJoinAndSelect('events.shows', 'shows')
                .leftJoinAndSelect('shows.venue', 'venues')
                .select([
                'events.id', //  include main entity ID
                'events.name',
                'events.type',
                'events.status',
                'events.organizer_id',
                'shows.id', // include joined entity ID
                'shows.totalSeats',
                'shows.availableSeats',
                'shows.status',
                'shows.basePrice',
                'venues.id', // include deeply joined entity ID
                'venues.name',
                'venues.city',
                'venues.address',
            ]);
            if (filterData?.event_name) {
                query.andWhere('events.name = :name', { name: filterData.event_name });
            }
            if (filterData?.event_type) {
                query.andWhere('events.type = :type', { type: filterData.event_type });
            }
            if (filterData?.event_status) {
                query.andWhere('events.status = :status', { status: filterData.event_status });
            }
            if (filterData?.id) {
                query.andWhere('events.id = :id', { id: filterData.id });
            }
            if (filterData?.organizer_id) {
                query.andWhere('events.organizer_id = :organizer_id', { organizer_id: filterData.organizer_id });
            }
            if (filterData?.event_location) {
                query.andWhere('venues.city = :location', { location: filterData.event_location });
            }
            query.orderBy('events.createdAt', 'ASC');
            const events = await query.getMany();
            // const events = await this.evenRepo.find({
            //     ...filter,
            //     order: {
            //         createdAt: 'ASC'
            //     }
            // })
            // if(filterData.sortByDate){
            //     events.sort()
            // }
            return events;
        }
        catch (err) {
            return this.handleErr(err, 'Error while fetching the events');
        }
    }
    handleErr(err, custom_msg) {
        if (err instanceof common_1.HttpException)
            return err;
        throw new Error(custom_msg + " " + err.message);
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(event_entity_1.EventEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(venues_entity_1.VenuesEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(event_show_entity_1.EventShowEntity)),
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
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: constants_1.EventType,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof constants_1.EventType !== "undefined" && constants_1.EventType) === "function" ? _a : Object)
], EventEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: constants_1.EventStatus,
        default: constants_1.EventStatus.DRAFT,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof constants_1.EventStatus !== "undefined" && constants_1.EventStatus) === "function" ? _b : Object)
], EventEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "banner_url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], EventEntity.prototype, "organizer_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], EventEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
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
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], EventShowEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.EventEntity, (event) => event.shows),
    tslib_1.__metadata("design:type", typeof (_a = typeof event_entity_1.EventEntity !== "undefined" && event_entity_1.EventEntity) === "function" ? _a : Object)
], EventShowEntity.prototype, "event", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => venues_entity_1.VenuesEntity, (venueEntity) => venueEntity.shows),
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
    (0, typeorm_1.Entity)('shows')
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
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
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
    (0, typeorm_1.Column)({
        name: 'pin_code'
    }),
    tslib_1.__metadata("design:type", Number)
], VenuesEntity.prototype, "pinCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at'
    }),
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


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const events_service_1 = __webpack_require__(9);
const register_event_dto_1 = __webpack_require__(16);
const fetch_event_filter_dto_1 = __webpack_require__(18);
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    sayHI() {
        return "hi";
    }
    async registerEvent(eventData) {
        return await this.eventsService.registerEvent(eventData);
    }
    async getEvents(filterData) {
        console.log("Filter @Controller: ", filterData);
        return await this.eventsService.getEvents(filterData);
    }
};
exports.EventsController = EventsController;
tslib_1.__decorate([
    (0, common_1.Get)('test'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "sayHI", null);
tslib_1.__decorate([
    (0, common_1.Post)('register-event'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof register_event_dto_1.RegisterEventDto !== "undefined" && register_event_dto_1.RegisterEventDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "registerEvent", null);
tslib_1.__decorate([
    (0, common_1.Get)('get-events'),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof fetch_event_filter_dto_1.FetchEventFilterDto !== "undefined" && fetch_event_filter_dto_1.FetchEventFilterDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "getEvents", null);
exports.EventsController = EventsController = tslib_1.__decorate([
    (0, common_1.Controller)('events'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof events_service_1.EventsService !== "undefined" && events_service_1.EventsService) === "function" ? _a : Object])
], EventsController);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterEventDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(17);
const constants_1 = __webpack_require__(12);
class RegisterEventDto {
}
exports.RegisterEventDto = RegisterEventDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], RegisterEventDto.prototype, "event_name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof constants_1.EventType !== "undefined" && constants_1.EventType) === "function" ? _a : Object)
], RegisterEventDto.prototype, "event_type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], RegisterEventDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], RegisterEventDto.prototype, "organizer_id", void 0);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FetchEventFilterDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(17);
const constants_1 = __webpack_require__(12);
class FetchEventFilterDto {
}
exports.FetchEventFilterDto = FetchEventFilterDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], FetchEventFilterDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], FetchEventFilterDto.prototype, "event_name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof constants_1.EventType !== "undefined" && constants_1.EventType) === "function" ? _a : Object)
], FetchEventFilterDto.prototype, "event_type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof constants_1.EventStatus !== "undefined" && constants_1.EventStatus) === "function" ? _b : Object)
], FetchEventFilterDto.prototype, "event_status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], FetchEventFilterDto.prototype, "organizer_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], FetchEventFilterDto.prototype, "sortByDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], FetchEventFilterDto.prototype, "event_location", void 0);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenuesModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const venues_service_1 = __webpack_require__(20);
const venues_controller_1 = __webpack_require__(21);
const typeorm_1 = __webpack_require__(7);
const venues_entity_1 = __webpack_require__(14);
let VenuesModule = class VenuesModule {
};
exports.VenuesModule = VenuesModule;
exports.VenuesModule = VenuesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([venues_entity_1.VenuesEntity])
        ],
        controllers: [venues_controller_1.VenuesController],
        providers: [venues_service_1.VenuesService],
    })
], VenuesModule);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenuesService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const venues_entity_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(11);
let VenuesService = class VenuesService {
    constructor(venueRepo) {
        this.venueRepo = venueRepo;
    }
    async registerVenue(venueData) {
        try {
            const venue = await this.venueRepo.create({
                name: venueData.venue_name,
                city: venueData.city_name,
                address: venueData.venue_address,
                capacity: venueData.capacity,
                pinCode: venueData.pin_code,
            });
            await this.venueRepo.save(venue);
            return { message: `${venueData.venue_name} has been registered successfuly` };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                return err;
            }
            throw new Error('Error while registering an Venue ' + err.message);
        }
    }
    async deleteVenue(venue_id) {
        try {
            const venue = await this.venueRepo.findOne({
                where: { id: venue_id }
            });
            await this.venueRepo.delete(venue);
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                return err;
            throw new Error(`getting error while deleting the venue: ${err.message}`);
        }
    }
    async getAllVenues() {
        try {
            const allVenues = await this.venueRepo.find();
            return allVenues;
        }
        catch (err) {
            throw new Error(`Error while fetching all venues: ${err.message}`);
        }
    }
};
exports.VenuesService = VenuesService;
exports.VenuesService = VenuesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(venues_entity_1.VenuesEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], VenuesService);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenuesController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const venues_service_1 = __webpack_require__(20);
const register_venue_dto_1 = __webpack_require__(22);
let VenuesController = class VenuesController {
    constructor(venuesService) {
        this.venuesService = venuesService;
    }
    async registerVenue(venueData) {
        return await this.venuesService.registerVenue(venueData);
    }
    async deleteVenue(venue_id) {
        return await this.venuesService.deleteVenue(venue_id);
    }
    async getAllVenues() {
        return await this.venuesService.getAllVenues();
    }
};
exports.VenuesController = VenuesController;
tslib_1.__decorate([
    (0, common_1.Post)('register-venue'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof register_venue_dto_1.RegisterVenueDto !== "undefined" && register_venue_dto_1.RegisterVenueDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuesController.prototype, "registerVenue", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/delete-venue/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuesController.prototype, "deleteVenue", null);
tslib_1.__decorate([
    (0, common_1.Get)('all-venues'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VenuesController.prototype, "getAllVenues", null);
exports.VenuesController = VenuesController = tslib_1.__decorate([
    (0, common_1.Controller)('venues'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof venues_service_1.VenuesService !== "undefined" && venues_service_1.VenuesService) === "function" ? _a : Object])
], VenuesController);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterVenueDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(17);
class RegisterVenueDto {
}
exports.RegisterVenueDto = RegisterVenueDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], RegisterVenueDto.prototype, "venue_name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], RegisterVenueDto.prototype, "city_name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], RegisterVenueDto.prototype, "venue_address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        maxLength: 6,
        minLength: 6
    }),
    tslib_1.__metadata("design:type", Number)
], RegisterVenueDto.prototype, "pin_code", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], RegisterVenueDto.prototype, "capacity", void 0);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const shows_service_1 = __webpack_require__(24);
const shows_controller_1 = __webpack_require__(25);
const typeorm_1 = __webpack_require__(7);
const event_entity_1 = __webpack_require__(10);
const event_show_entity_1 = __webpack_require__(13);
const venues_entity_1 = __webpack_require__(14);
let ShowsModule = class ShowsModule {
};
exports.ShowsModule = ShowsModule;
exports.ShowsModule = ShowsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([venues_entity_1.VenuesEntity, event_entity_1.EventEntity, event_show_entity_1.EventShowEntity])
        ],
        controllers: [shows_controller_1.ShowsController],
        providers: [shows_service_1.ShowsService],
    })
], ShowsModule);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const event_show_entity_1 = __webpack_require__(13);
const typeorm_2 = __webpack_require__(11);
const event_entity_1 = __webpack_require__(10);
const venues_entity_1 = __webpack_require__(14);
let ShowsService = class ShowsService {
    constructor(showRepository, eventRepository, venueRepository, dataSource) {
        this.showRepository = showRepository;
        this.eventRepository = eventRepository;
        this.venueRepository = venueRepository;
        this.dataSource = dataSource;
    }
    async registerShow(showData) {
        try {
            const event = await this.eventRepository.findOne({
                where: {
                    id: showData.eventId
                }
            });
            if (!event) {
                throw new common_1.NotFoundException('Event not found');
            }
            const venue = await this.venueRepository.findOne({
                where: {
                    id: showData.venueId
                }
            });
            if (!venue) {
                throw new common_1.NotFoundException('Venue not found');
            }
            const show = this.showRepository.create({
                event,
                venue,
                totalSeats: showData.totalSeats,
                availableSeats: showData.totalSeats,
                specialNotes: showData.specialNotes,
                basePrice: showData.basePrice,
                startTime: showData.startTime,
                endTime: showData.endTime,
            });
            await this.showRepository.save(show);
        }
        catch (err) {
            // this.handleErr(err, 'Error while registering the show')
            if (err instanceof common_1.HttpException)
                return err;
            throw new Error('Error while registering the show' + " " + err.message);
        }
    }
    async getShowsForEvent(filterData) {
    }
    handleErr(err, custom_msg) {
        if (err instanceof common_1.HttpException)
            return err;
        throw new Error(custom_msg + " " + err.message);
    }
};
exports.ShowsService = ShowsService;
exports.ShowsService = ShowsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(event_show_entity_1.EventShowEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(event_entity_1.EventEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(venues_entity_1.VenuesEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _d : Object])
], ShowsService);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const shows_service_1 = __webpack_require__(24);
const register_show_dto_1 = __webpack_require__(26);
const show_filter_dto_1 = __webpack_require__(27);
let ShowsController = class ShowsController {
    constructor(showsService) {
        this.showsService = showsService;
    }
    async registerShow(showData) {
        return await this.showsService.registerShow(showData);
    }
    async getShowsForEvent(filterData) {
        return await this.showsService.getShowsForEvent(filterData);
    }
};
exports.ShowsController = ShowsController;
tslib_1.__decorate([
    (0, common_1.Post)('register-show'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof register_show_dto_1.RegisterShowDto !== "undefined" && register_show_dto_1.RegisterShowDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShowsController.prototype, "registerShow", null);
tslib_1.__decorate([
    (0, common_1.Get)('get-shows'),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof show_filter_dto_1.ShowsFilterDto !== "undefined" && show_filter_dto_1.ShowsFilterDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShowsController.prototype, "getShowsForEvent", null);
exports.ShowsController = ShowsController = tslib_1.__decorate([
    (0, common_1.Controller)('shows'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof shows_service_1.ShowsService !== "undefined" && shows_service_1.ShowsService) === "function" ? _a : Object])
], ShowsController);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterShowDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(17);
class RegisterShowDto {
}
exports.RegisterShowDto = RegisterShowDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({}),
    tslib_1.__metadata("design:type", String)
], RegisterShowDto.prototype, "eventId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({}),
    tslib_1.__metadata("design:type", String)
], RegisterShowDto.prototype, "venueId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({}),
    tslib_1.__metadata("design:type", Number)
], RegisterShowDto.prototype, "basePrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({}),
    tslib_1.__metadata("design:type", Number)
], RegisterShowDto.prototype, "totalSeats", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], RegisterShowDto.prototype, "specialNotes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({}),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RegisterShowDto.prototype, "startTime", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({}),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], RegisterShowDto.prototype, "endTime", void 0);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowsFilterDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(17);
const constants_1 = __webpack_require__(12);
class ShowsFilterDto {
}
exports.ShowsFilterDto = ShowsFilterDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], ShowsFilterDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], ShowsFilterDto.prototype, "city", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof constants_1.EventType !== "undefined" && constants_1.EventType) === "function" ? _a : Object)
], ShowsFilterDto.prototype, "event_type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], ShowsFilterDto.prototype, "event_id", void 0);


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
const swagger_1 = __webpack_require__(17);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Auth Service APIs')
        .setDescription('Supporting Services for authentication and authorization used for HoldMySeat')
        .setVersion('1.0')
        .addServer('/api')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map