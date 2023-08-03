import UserRoute from './user.route.js';
// import AuthRoute from './auth.route.js'
import AuthController from '../controllers/auth.controller.js';

export default class Route {
  userRoute = new UserRoute();
  // authRoute = new AuthRoute();

  constructor(app) {
    this.configBaseRoute(app);
  }

  homeRouteHandler(req, res, next) {
    res.json({
      message: "Welcome to Kindly API."
    });
  }

  noRouteHandler(req, res, next) {
    res.json({
      message: "No route found"
    });
  }

  configBaseRoute(app) {
    app.get("/", this.homeRouteHandler);
    app.post("/login", AuthController.login);
    app.use("/users", this.userRoute.router);
    app.use(this.noRouteHandler);
  }
}
