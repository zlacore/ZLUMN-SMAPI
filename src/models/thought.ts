import { Schema, Document, model, Types } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: [];
}

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        }, 
        createdAt: {
            type: Date,
            default: Date.now()
        }

    }
)

const thoughtSchema = new Schema<IThought>({

    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String
    },
    reactions:
        [reactionSchema]
})


thoughtSchema.virtual('reactionCount')
.get(function (this: IThought) {
    return this.reactions.length
})


const Thought = model('Thought', thoughtSchema)

export default Thought
