const mongoose = require('mongoose');
const Post = require('../../src/models/postModel.js');

describe('Post Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('should create a new post', async () => {
        const postData = {
            title: 'Test Post',
            content: 'This is a test post',
            author: 'John Doe',
        };
        const post = new Post(postData);
        const savedPost = await post.save();
        expect(savedPost._id).toBeDefined();
        expect(savedPost.title).toBe(postData.title);
        expect(savedPost.content).toBe(postData.content);
        expect(savedPost.author).toBe(postData.author);
    });

    test('should not create a post without a title', async () => {
        const postData = {
            content: 'This is a test post',
            author: 'John Doe',
        };
        const post = new Post(postData);
        let error;
        try {
            const savedPost = await post.save();
            error = savedPost;
        } catch (err) {
            error = err;
        }
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.title).toBeDefined();
    });
});