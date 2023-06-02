const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");


const ReactionSchema = new Schema(
    {
    reactionId: {
        // type is ObjectId in Mongoose
        type: Schema.Types.ObjectId,
        // By default the object is a new ObjectId
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (timestamp) => dateFormat(timestamp),
    },
    },
    {
    toJSON: {
        getters: true,
    },
    id: false,
    }
);

const ThoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        // Getter method that formats the timestamp on the query
        get: (timestamp) => dateFormat(timestamp),
    },

    username: {
        type: String,
        required: true,
    },
    
    // adding the reactions after having initialized
    reactions: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;