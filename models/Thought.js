const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

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
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;