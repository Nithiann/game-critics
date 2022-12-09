/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/api.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_controller_1 = __webpack_require__("./apps/api/src/app/user/user.controller.ts");
const user_schema_1 = __webpack_require__("./apps/api/src/app/user/user.schema.ts");
const user_service_1 = __webpack_require__("./apps/api/src/app/user/user.service.ts");
const game_service_1 = __webpack_require__("./apps/api/src/app/game/game.service.ts");
const game_controller_1 = __webpack_require__("./apps/api/src/app/game/game.controller.ts");
const game_schema_1 = __webpack_require__("./apps/api/src/app/game/game.schema.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
const identity_schema_1 = __webpack_require__("./apps/api/src/app/auth/identity.schema.ts");
const reviews_service_1 = __webpack_require__("./apps/api/src/app/reviews/reviews.service.ts");
const reviews_schema_1 = __webpack_require__("./apps/api/src/app/reviews/reviews.schema.ts");
let ApiModule = class ApiModule {
};
ApiModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: game_schema_1.Game.name, schema: game_schema_1.GameSchema },
                { name: identity_schema_1.Identity.name, schema: identity_schema_1.IdentitySchema },
                { name: reviews_schema_1.Review.name, schema: reviews_schema_1.reviewSchema }
            ]),
        ],
        controllers: [user_controller_1.UserController, game_controller_1.GameController],
        providers: [user_service_1.UserService, game_service_1.GameService, auth_service_1.AuthService, reviews_service_1.ReviewsService],
        exports: [auth_service_1.AuthService],
    })
], ApiModule);
exports.ApiModule = ApiModule;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const serve_static_1 = __webpack_require__("@nestjs/serve-static"); // <- INSERT LINE
const path_1 = __webpack_require__("path"); // <- INSERT LINE
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const auth_module_1 = __webpack_require__("./apps/api/src/app/auth/auth.module.ts");
const api_module_1 = __webpack_require__("./apps/api/src/app/api.module.ts");
const core_1 = __webpack_require__("@nestjs/core");
const token_middleware_1 = __webpack_require__("./apps/api/src/app/auth/token.middleware.ts");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(token_middleware_1.TokenMiddleware);
    }
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(environment_1.environment.mongodb_uri),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'game-critics'),
                exclude: ['/api*'],
            }),
            auth_module_1.AuthModule,
            api_module_1.ApiModule,
            core_1.RouterModule.register([
                {
                    path: 'auth',
                    module: auth_module_1.AuthModule
                },
                {
                    path: 'api',
                    module: api_module_1.ApiModule
                }
            ])
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const api_interfaces_1 = __webpack_require__("./libs/api-interfaces/src/index.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(userCredits) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authService.registerUser(userCredits.email, userCredits.password);
                return {
                    id: yield this.authService.createUser(userCredits.email, userCredits.displayName, userCredits.firstName, userCredits.lastName, userCredits.age)
                };
            }
            catch (e) {
                common_1.Logger.error(e);
                throw new common_1.HttpException('Data invalid', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    login(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    token: yield this.authService.generateToken(credentials.email, credentials.password)
                };
            }
            catch (e) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof api_interfaces_1.userRegistration !== "undefined" && api_interfaces_1.userRegistration) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof api_interfaces_1.credentialsForm !== "undefined" && api_interfaces_1.credentialsForm) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "login", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./apps/api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./apps/api/src/app/user/user.schema.ts");
const identity_schema_1 = __webpack_require__("./apps/api/src/app/auth/identity.schema.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
const auth_controller_1 = __webpack_require__("./apps/api/src/app/auth/auth.controller.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: identity_schema_1.Identity.name, schema: identity_schema_1.IdentitySchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/api/src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const bcrypt_1 = __webpack_require__("bcrypt");
const jsonwebtoken_1 = __webpack_require__("jsonwebtoken");
const mongoose_2 = __webpack_require__("mongoose");
const user_schema_1 = __webpack_require__("./apps/api/src/app/user/user.schema.ts");
const identity_schema_1 = __webpack_require__("./apps/api/src/app/auth/identity.schema.ts");
let AuthService = class AuthService {
    constructor(identityModel, userModel) {
        this.identityModel = identityModel;
        this.userModel = userModel;
    }
    verifyToken(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const beared = token.replace("Bearer ", "");
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.verify)(beared, process.env.JWT_SECRET, (err, payload) => {
                    if (err)
                        reject(err);
                    else
                        resolve(payload);
                });
            });
        });
    }
    createUser(email, displayName, firstName, lastName, age) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = new this.userModel({ email, displayName, firstName, lastName, age });
            yield user.save();
            return user.id;
        });
    }
    registerUser(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const generatedHash = yield (0, bcrypt_1.hash)(password, parseInt(process.env.SALT_ROUNDS, 10));
            const identity = new this.identityModel({ email, hash: generatedHash });
            yield identity.save();
        });
    }
    generateToken(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const identity = yield this.identityModel.findOne({ email });
            if (!identity || !(yield (0, bcrypt_1.compare)(password, identity.hash)))
                throw new Error("user not authorized");
            const user = yield this.userModel.findOne({ email: email });
            return new Promise((res, rej) => {
                (0, jsonwebtoken_1.sign)({
                    role: user.role,
                    id: user._id,
                    email: user.email
                }, process.env.JWT_SECRET, (err, token) => {
                    if (err)
                        rej(err);
                    else
                        res(token);
                });
            });
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(identity_schema_1.Identity.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/api/src/app/auth/identity.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdentitySchema = exports.Identity = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let Identity = class Identity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "hash", void 0);
Identity = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Identity);
exports.Identity = Identity;
exports.IdentitySchema = mongoose_1.SchemaFactory.createForClass(Identity);


/***/ }),

/***/ "./apps/api/src/app/auth/token.middleware.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenMiddleware = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
let TokenMiddleware = class TokenMiddleware {
    constructor(authService) {
        this.authService = authService;
    }
    use(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const authHeader = req.header('authorization');
            if (!authHeader) {
                throw new common_1.HttpException('No authorization header', common_1.HttpStatus.UNAUTHORIZED);
            }
            try {
                const token = yield this.authService.verifyToken(authHeader);
                res.locals.token = token;
            }
            catch (e) {
                throw new common_1.HttpException('Token invalid', common_1.HttpStatus.UNAUTHORIZED);
            }
            next();
        });
    }
};
TokenMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], TokenMiddleware);
exports.TokenMiddleware = TokenMiddleware;


/***/ }),

/***/ "./apps/api/src/app/game/game.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameController = void 0;
const tslib_1 = __webpack_require__("tslib");
const api_interfaces_1 = __webpack_require__("./libs/api-interfaces/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
const reviews_service_1 = __webpack_require__("./apps/api/src/app/reviews/reviews.service.ts");
const game_service_1 = __webpack_require__("./apps/api/src/app/game/game.service.ts");
let GameController = class GameController {
    constructor(gameService, reviewService, authService) {
        this.gameService = gameService;
        this.reviewService = reviewService;
        this.authService = authService;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameService.getAll();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameService.getOne(id);
        });
    }
    createGame(gameInfo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.gameService.createGame(gameInfo);
            }
            catch (e) {
                common_1.Logger.error(e);
                throw new common_1.HttpException('Data invalid', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    updateSelf(id, updatedUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameService.updateOne(id, updatedUser);
        });
    }
    deleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameService.deleteById(id);
        });
    }
    addReviewToGame(gameId, review, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.verifyToken(token);
            review.user_ref = user.id;
            const reviewId = yield this.reviewService.createReview(review);
            return this.gameService.addReviewToGame(gameId, reviewId);
        });
    }
    removeReviewFromGame(gameId, reviewId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameService.removeReviewFromGame(gameId, reviewId);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], GameController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], GameController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof api_interfaces_1.gameRegistration !== "undefined" && api_interfaces_1.gameRegistration) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], GameController.prototype, "createGame", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_h = typeof api_interfaces_1.updateGameInfo !== "undefined" && api_interfaces_1.updateGameInfo) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], GameController.prototype, "updateSelf", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GameController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/review'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Headers)('Authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_k = typeof api_interfaces_1.reviewRegistration !== "undefined" && api_interfaces_1.reviewRegistration) === "function" ? _k : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GameController.prototype, "addReviewToGame", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id/review'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], GameController.prototype, "removeReviewFromGame", null);
GameController = tslib_1.__decorate([
    (0, common_1.Controller)('game'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof game_service_1.GameService !== "undefined" && game_service_1.GameService) === "function" ? _a : Object, typeof (_b = typeof reviews_service_1.ReviewsService !== "undefined" && reviews_service_1.ReviewsService) === "function" ? _b : Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _c : Object])
], GameController);
exports.GameController = GameController;


/***/ }),

/***/ "./apps/api/src/app/game/game.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameSchema = exports.Game = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Game = class Game {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "image", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", Array)
], Game.prototype, "genre", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", Number)
], Game.prototype, "score", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'reviews' }),
    tslib_1.__metadata("design:type", Array)
], Game.prototype, "reviews", void 0);
Game = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Game);
exports.Game = Game;
exports.GameSchema = mongoose_1.SchemaFactory.createForClass(Game);
mongoose_2.default.model('games', exports.GameSchema);


/***/ }),

/***/ "./apps/api/src/app/game/game.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const game_schema_1 = __webpack_require__("./apps/api/src/app/game/game.schema.ts");
let GameService = class GameService {
    constructor(gameModel) {
        this.gameModel = gameModel;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameModel.find().exec();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.gameModel.findOne({ _id: id })
                .populate('reviews');
        });
    }
    createGame(gameInfo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const game = new this.gameModel(gameInfo);
            yield game.save();
            return game._id;
        });
    }
    updateOne(id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameModel.findByIdAndUpdate({ _id: id }, body);
        });
    }
    deleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameModel.findByIdAndDelete({ _id: id });
        });
    }
    addReviewToGame(gameId, reviewId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameModel.findByIdAndUpdate(gameId, { $push: { reviews: reviewId } });
        });
    }
    removeReviewFromGame(gameId, reviewId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.gameModel.findByIdAndUpdate(gameId, { $pull: { reviews: reviewId } });
        });
    }
};
GameService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(game_schema_1.Game.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], GameService);
exports.GameService = GameService;


/***/ }),

/***/ "./apps/api/src/app/reviews/reviews.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reviewSchema = exports.Review = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Review = class Review {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'users' }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "user_ref", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Review.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Review.prototype, "modified_at", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Review.prototype, "game_score", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Review.prototype, "review_score", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'comments' }),
    tslib_1.__metadata("design:type", Array)
], Review.prototype, "comments", void 0);
Review = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Review);
exports.Review = Review;
exports.reviewSchema = mongoose_1.SchemaFactory.createForClass(Review);
mongoose_2.default.model('reviews', exports.reviewSchema);


/***/ }),

/***/ "./apps/api/src/app/reviews/reviews.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const reviews_schema_1 = __webpack_require__("./apps/api/src/app/reviews/reviews.schema.ts");
let ReviewsService = class ReviewsService {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewModel.find().exec();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewModel.findOne({ _id: id }).exec();
        });
    }
    createReview(reviewInfo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const review = new this.reviewModel(reviewInfo);
            yield review.save();
            return review._id;
        });
    }
    updateOne(id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewModel.findByIdAndUpdate({ _id: id }, body);
        });
    }
    deleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewModel.findByIdAndDelete({ _id: id });
        });
    }
    addCommentToReview(reviewId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewModel.findByIdAndUpdate(reviewId, { $push: { comments: commentId } });
        });
    }
    removeCommentFromReview(reviewId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewModel.findByIdAndUpdate(reviewId, { $pull: { comments: commentId } });
        });
    }
};
ReviewsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(reviews_schema_1.Review.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ReviewsService);
exports.ReviewsService = ReviewsService;


/***/ }),

/***/ "./apps/api/src/app/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_service_1 = __webpack_require__("./apps/api/src/app/user/user.service.ts");
const api_interfaces_1 = __webpack_require__("./libs/api-interfaces/src/index.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.getAll();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.getOne(id);
        });
    }
    updateSelf(id, updatedUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.updateSelf(id, updatedUser);
        });
    }
    deleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.deleteById(id);
        });
    }
    register(userCredits) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authService.registerUser(userCredits.email, userCredits.password);
                return {
                    id: yield this.authService.createUser(userCredits.email, userCredits.displayName, userCredits.firstName, userCredits.lastName, userCredits.age)
                };
            }
            catch (e) {
                common_1.Logger.error(e);
                throw new common_1.HttpException('Data invalid', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    login(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    token: yield this.authService.generateToken(credentials.email, credentials.password)
                };
            }
            catch (e) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof api_interfaces_1.updateUserInfo !== "undefined" && api_interfaces_1.updateUserInfo) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "updateSelf", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof api_interfaces_1.userRegistration !== "undefined" && api_interfaces_1.userRegistration) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof api_interfaces_1.credentialsForm !== "undefined" && api_interfaces_1.credentialsForm) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "login", null);
UserController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./apps/api/src/app/user/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const uuid_1 = __webpack_require__("uuid");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["user"] = 0] = "user";
    UserRole[UserRole["reviewer"] = 1] = "reviewer";
    UserRole[UserRole["admin"] = 2] = "admin";
})(UserRole || (UserRole = {}));
let User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4, index: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                const re = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}/;
                return re.test(v);
            }
        }
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "age", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: UserRole.user
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "user_score", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
mongoose_2.default.model('users', exports.UserSchema);


/***/ }),

/***/ "./apps/api/src/app/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const user_schema_1 = __webpack_require__("./apps/api/src/app/user/user.schema.ts");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.find().exec();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ _id: id }).exec();
        });
    }
    updateSelf(id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.findByIdAndUpdate({ _id: id }, body);
        });
    }
    deleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.findByIdAndDelete({ _id: id });
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./apps/api/src/environments/environment.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false,
    mongodb_uri: `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
};


/***/ }),

/***/ "./libs/api-interfaces/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/api-interfaces.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/user-interfaces.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/game-interfaces.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/review-interfaces.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/auth-interfaces.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/id.type.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/comment-interfaces.ts"), exports);


/***/ }),

/***/ "./libs/api-interfaces/src/lib/api-interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/auth-interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/comment-interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/game-interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/id.type.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/review-interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/user-interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var userRole;
(function (userRole) {
    userRole[userRole["user"] = 0] = "user";
    userRole[userRole["reviewer"] = 1] = "reviewer";
    userRole[userRole["admin"] = 2] = "admin";
})(userRole || (userRole = {}));


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        console.log(environment_1.environment.mongodb_uri);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map