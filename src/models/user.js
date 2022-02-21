const { DataTypes } = require('sequelize');
const sequelize = require('../services/utils/database');
const bcrypt = require("bcrypt");
const Customer = require('./customer');

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'This email is already taken'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'Invalid email'
            },
        }
    },
    email_verified_at: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 6],
                msg: "Password should be at least 6 characters"
            }
        }
    },

},
    {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        },
        instanceMethods: {
            validPassword: (password) => {
                return bcrypt.compareSync(password, this.password);
            }
        }
    }
);

module.exports = User;