const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "roles", deps: []
 * createTable() => "meetings", deps: []
 * createTable() => "teams", deps: []
 * createTable() => "users", deps: [teams]
 * createTable() => "topics", deps: [meetings]
 * createTable() => "participants", deps: [meetings]
 * createTable() => "user_roles", deps: [roles, users]
 *
 */

const info = {
  revision: 1,
  name: "updateDb",
  created: "2022-03-28T10:21:36.515Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "roles",
      {
        id: { type: Sequelize.INTEGER, field: "id", primaryKey: true },
        name: { type: Sequelize.STRING, field: "name" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "meetings",
      {
        id: { type: Sequelize.UUID, field: "id", primaryKey: true },
        started_at: { type: Sequelize.STRING, field: "started_at" },
        title: { type: Sequelize.STRING, field: "title" },
        meeting_date: { type: Sequelize.DATE, field: "meeting_date" },
        duration: { type: Sequelize.INTEGER, field: "duration" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "teams",
      {
        id: { type: Sequelize.UUID, field: "id", primaryKey: true },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.BOOLEAN, field: "description" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        username: { type: Sequelize.STRING, field: "username" },
        email: { type: Sequelize.STRING, field: "email" },
        password: { type: Sequelize.STRING, field: "password" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        teamId: {
          type: Sequelize.UUID,
          field: "teamId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "teams", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "topics",
      {
        id: { type: Sequelize.UUID, field: "id", primaryKey: true },
        title: { type: Sequelize.STRING, field: "title" },
        details: { type: Sequelize.STRING, field: "details" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        meetingId: {
          type: Sequelize.UUID,
          field: "meetingId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "meetings", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "participants",
      {
        id: { type: Sequelize.UUID, field: "id", primaryKey: true },
        userName: { type: Sequelize.STRING, field: "userName" },
        meeting_date: { type: Sequelize.DATE, field: "meeting_date" },
        started_at: { type: Sequelize.STRING, field: "started_at" },
        ended_at: { type: Sequelize.STRING, field: "ended_at" },
        isGuest: { type: Sequelize.BOOLEAN, field: "isGuest" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        meetingId: {
          type: Sequelize.UUID,
          field: "meetingId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "meetings", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_roles",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        roleId: {
          type: Sequelize.INTEGER,
          field: "roleId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "roles", key: "id" },
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["roles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["meetings", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["topics", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["participants", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["teams", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_roles", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
