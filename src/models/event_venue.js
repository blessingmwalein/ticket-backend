const { DataTypes } = require('sequelize');
const sequelize = require('../services/utils/database');

const EventVenue = sequelize.define('event_venue', {
    event_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    venue_id: {
        type: DataTypes.NUMBER,
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

module.exports = EventVenue;