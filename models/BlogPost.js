import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes:{ type:mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
        content: { type: String, required: true },
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('BlogPost', BlogPostSchema);