const { DataTypes } = require('sequelize');
const sequelize = require('../services/utils/database');
const User = require('./user');

const Admin = sequelize.define('admin', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });


module.exports = Admin;