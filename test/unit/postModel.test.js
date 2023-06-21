const mongoose = require('mongoose');
const Post = require('../../src/models/postModel.js');
const environment = require('../../src/config/environment');

describe('Post model', () => {
    beforeAll(async () => {
        await mongoose.connect(environment.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return the post object without the password field', async () => {
        const post = await Post.create({
            title: 'Post title',
            body: 'Post body',

        });

        expect(post.toJSON()).not.toHaveProperty('password');
    });

    it('should return the post object without the password field when using the find method', async () => {
        const post = await Post.create({
            title: 'Post title',
            body: 'Post body',
        });

        const foundPost = await Post.findOne({ title: 'Post title' });
        expect(foundPost.toJSON()).not.toHaveProperty('password');
    });
});
