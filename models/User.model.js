import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim:true, Minlength: 6, MaxLength: 50 },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim:true,
        validate: {
            validator: function(v) {
                // Simple email regex for validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export default mongoose.model('User', UserSchema);