const authService = require("../authmiddelwares/AuthService");
const ProjectController = require("../Controller/project.controller");
const { ProjectValidator } = require("../authmiddelwares");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/projects/all", [authService.verifyToken], ProjectController.allProjects);
    app.get("/api/projects/pending/count", [authService.verifyToken, authService.isManagerOrAdmin], ProjectController.pendingProjectsCount);
    app.get("/api/projects/pending", [authService.verifyToken, authService.isManagerOrAdmin], ProjectController.pendingProjects);

    app.post("/api/projects/create", [authService.verifyToken, authService.isAssociation, ProjectValidator.checkRequired], ProjectController.createProject);

    app.put("/api/projects/validate/:id", [authService.verifyToken, authService.isManagerOrAdmin], ProjectController.validateProject);

    app.put("/api/projects/refuse/:id", [authService.verifyToken, authService.isManagerOrAdmin], ProjectController.refuseProject);

    app.put("/api/projects/:id", [authService.verifyToken, ProjectValidator.checkRequired], ProjectController.updateProject);

    app.put("/api/projects/donate/:id", [authService.verifyToken], ProjectController.donateProject);



};