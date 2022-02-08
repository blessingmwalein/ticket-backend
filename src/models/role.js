const { DataTypes } = require('sequelize');
const sequelize = require('../services/utils/database');

const Role = sequelize.define('role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Role;