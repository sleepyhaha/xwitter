const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        }
    },
    {
        email: {
            type: String,,
            required: true,
            unique: true,
            match: [/.+@.+/, "Please enter a valid email."]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "Users"
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        
        id: false,
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const Users = model("Users", userSchema)

module.exports = Users