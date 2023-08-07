import upload from '../utils/upload.js';
import UserRoute from './user.route.js';
import ProjectRoute from './project.route.js';
import CommonRoute from './common.route.js';
import AuthController from '../controllers/auth.controller.js';

export default class Route {
  userRoute = new UserRoute();
  commonRoute = new CommonRoute();
  projectRoute = new ProjectRoute();

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
    app.post("/sign-up", upload.single('profileImage'), AuthController.signup);
    app.use("/common", this.commonRoute.router);
    app.use("/users", this.userRoute.router);
    app.use("/projects", this.projectRoute.router);
    app.use(this.noRouteHandler);
  }
}
