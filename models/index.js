// import models
const User = require('./User.js');
const Blog = require('./Blog.js');
const Comment = require('./Comment.js');

// associate models to each other
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// export models
module.exports = {User, Blog, Comment};