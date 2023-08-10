// import needed variables
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

// declare and import data
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');
const userData = require('./userData.json');

// seed database function
const seedDatabase = async () => {
    // sync sequelize
    await sequelize.sync({ force: true });

    // seed user data
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // seed blog data
    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    // seed comment data
    await Comment.bulkCreate(commentData, {
        returning: true,
    });

    process.exit(0);
};

// call the function
seedDatabase();