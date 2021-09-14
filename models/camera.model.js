module.exports = (sequelize, Sequelize) => {
    const CameraConectee = sequelize.define("cameraConectee", {
      serie: {
        type: Sequelize.STRING
      }
    });
  
    return CameraConectee;
  };
  