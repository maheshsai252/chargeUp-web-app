const { verifyEventPermission } = require("../middlewares");
const controller = require("../controllers/event.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/event/create",
    [
        verifyEventPermission.checkEventCreation,
    ],
    controller.createEvent
  );

  app.put("/api/event/edit",  [
    verifyEventPermission.checkUserCanUpdateEvent
  ],
  controller.updateEvent);
  app.post("/api/events/checkNameTag", controller.checkNameTag);
  app.get("/api/events", controller.getAllEvents);

  app.post("/api/events/search", controller.searchEvent);
  app.post("/api/event/filterByTags", controller.filterByTags);
  app.post("/api/events-popular/", controller.getPopularEvents);
  app.post("/api/events-nearby/", controller.getNearbyEvents);
  app.post("/api/events-popularnearby/", controller.getNearbyTrendingEvents);
  app.post("/api/events-filterByCategory/", controller.filterEventsByCategory);
  app.post("/api/events-filterByPrice/", controller.filterEventsByPrice);
  app.post("/api/events-fromOrganiser/", controller.filterEventsOfOrganiser);
  app.post("/api/pair-users/", controller.pairing);

  // ToDo: 1. filter by categories, 2. filter by price 3. events by organiser 4. similar events like an event

  app.post("/api/event/", controller.getEventByNameTag);
  app.delete("/api/event/delete", [verifyEventPermission.checkUserCanUpdateEvent], controller.deleteEvent);
};