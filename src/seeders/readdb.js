
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);

const DrinkModel = require('../Models/drink');
const UserModel = require('../Models/user')

var db = {};

var config = require('../../config')

let sequelize = new Sequelize(config.DB.DATABASE, config.DB.USER, config.DB.PASSWORD, { dialect: "mysql" });

const Drink = DrinkModel(sequelize, Sequelize);
const User = UserModel(sequelize,Sequelize)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = {db,
  Drink,
  User
};
