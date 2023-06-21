const db = require('../../src/config/database');
const Post = require('../../src/models/postModel');
const app = require('../../src/index');
const environment = require('../../src/config/environment');

describe('Post model', () => {


    beforeAll(async () => {
        await db.connect(
            environment.databaseUrl,
        );
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should create a new post', async () => {
        const post = await Post.create({
            title: 'Test Post',
            content: 'Test Content',
            author: '5e9e2c5b8b40c3b4e8b0b3b4',
        });
        expect(post.title).toEqual('Test Post');
    });


    it('should retrieve all posts', async () => {
        const posts = await Post.find();
        console.log(posts);
        expect(posts.length).toBeGreaterThanOrEqual(0);
    });

});
