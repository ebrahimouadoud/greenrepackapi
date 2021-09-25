module.exports = (sequelize, Sequelize) => {
    const ProductsCard = sequelize.define("products_card", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        produitId: {
            type: Sequelize.INTEGER
        },
        cardId: {
            type: Sequelize.INTEGER
        },
    });

    return ProductsCard;
};
