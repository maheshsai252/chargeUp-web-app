const { verifyRegistartionPermission } = require("../middlewares");
const controller = require("../controllers/registration.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/registration/create",
    [
        verifyRegistartionPermission.checkRegistrationCreation
    ],
    controller.createRegistration
  );

//   app.put("/api/registration/edit",  [
//     verifyRegistartionPermission.checkUserCanUpdateRegistration
//   ],
//   controll);

  app.post("/api/registartionsByEvent/", controller.getAllRegistrationsOfEvent);
  app.post("/api/registartionsByUser/", controller.getAllRegistrationsOfUser);
  app.post("/api/registartion/", controller.getRegistartionByID);
  app.post("/api/registration/delete", [verifyRegistartionPermission.checkUserCanUpdateRegistration], controller.deleteRegistration);
};