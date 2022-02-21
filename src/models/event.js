const { DataTypes } = require('sequelize');
const sequelize = require('../services/utils/database');

const Event = sequelize.define('event', {
    event_category_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    event_date_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    payment_deadline: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prices: {
        type: DataTypes.JSON,
        allowNull: false,
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

module.exports = Event;