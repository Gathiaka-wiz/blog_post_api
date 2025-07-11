import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text:{ type:String , required: true },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post :{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', CommentSchema);