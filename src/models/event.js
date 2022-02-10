const { DataTypes } = require('sequelize');
const sequelize = require('../services/utils/database');

const Venue = sequelize.define('venue', {
    event_category_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    event_date_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payement_date_time: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    prices: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true,
    }
},
    {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Venue;