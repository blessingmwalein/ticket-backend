const { DataTypes } = require('sequelize');
const sequelize = require('../services/utils/database');

const EventCategory = sequelize.define('event_category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
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

module.exports = EventCategory;