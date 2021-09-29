module.exports = (sequelize, Sequelize) => {
    const PriceCase = sequelize.define("pricecases", {
        modelId: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.JSON,
        },
        price: {
            type: Sequelize.INTEGER
        }
    });
    //{ modelId: "A1428" ,state: { state_body: 'comme_neuf', state_screen: 'bonne_état', simBlocked: 1, storage: 64 } , price: 10 }
    return PriceCase;
  };