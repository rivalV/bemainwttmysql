"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            userId: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
                field: "user_id",
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "user_name",
                unique: {
                    name: "userName",
                    msg: "Username has been used",
                },
            },
            userEmail: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "user_email",
                unique: {
                    name: "userEmail",
                    msg: "Email has been registered",
                },
                validate: {
                    isEmail: {
                        msg: "Email must be valid value",
                    },
                },
            },
            userPassword: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "user_password",
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
              field: 'created_at',
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
              field: 'updated_at',
            },
            deletedAt: {
              type: Sequelize.DATE,
              field: 'deleted_at',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};