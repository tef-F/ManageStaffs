const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Blog = new Schema(
    {
        name: { type: String, default: 'Title' },
        description: { type: String, default: 'Description' },
        date: { type: String, default: 'date' },
        author: { type: String, default: 'Mỹ Duyên' },
        content: { type: String },
        slug: { type: String, slug: 'name', unique: 'true' },
        img: { type: String, default: './img/avatars/5.png' },
    },
    { timestamps: true },
);

//? Add plugin
mongoose.plugin(slug);
Blog.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Blog', Blog);
