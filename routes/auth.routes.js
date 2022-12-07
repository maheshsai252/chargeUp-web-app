const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/create",
    [
      verifySignUp.checkValidate
    ],
    controller.signup
  );

  app.put("/api/user/edit",  [
    verifySignUp.checkUpdate
  ],
  controller.updateUser);

  app.post("/api/user/signin", controller.signin);
  app.post("/api/user/signinWithGoogle", [verifySignUp.checkValidateWithGoogle], controller.signupWithGoogle);
  
  //ToDO: Forgot password

  app.get("/api/user/getAll", controller.getAll);
  app.post("/api/user/", controller.get);
  app.post("/api/user/logout", controller.logOut);
  app.delete("/api/user/delete", [verifySignUp.checkExist], controller.deleteUser);
};