require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DATABASE_URL } = process.env;
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

/* const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
); */
const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/Models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


const {
  Category,
  Course,
  Review,
  User,
  Video,
  Comments,
  ReviewPage,
  Category_Course,
  Orderr
} = sequelize.models;


User.belongsToMany(Course, { through: "User_Course", timestamps: false });
Course.belongsToMany(User, { through: "User_Course", timestamps: false });


Category.belongsToMany(Course, {
  through: "Category_Course",
  timestamps: false,
});
Course.belongsToMany(Category, {
  through: "Category_Course",
  timestamps: false,
});


Course.hasMany(Review);

Review.belongsTo(Course);
User.hasOne(Review);
Review.belongsTo(User);


User.hasOne(ReviewPage);
ReviewPage.belongsTo(User);



Course.hasMany(Video);

Video.belongsTo(Course);


Video.hasMany(Comments);

Comments.belongsTo(Video);

             
User.belongsToMany(Orderr, {through: "User_Order", timestamps: false})
Orderr.belongsToMany(User, {through: "User_Order", timestamps: false})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
