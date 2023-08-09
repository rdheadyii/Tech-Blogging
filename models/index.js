// import models
const User = require('./User');
const Blog = reruire('./Blog');
const Comment = require('./Comment');

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