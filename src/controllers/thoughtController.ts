import Thought from "../models/thought.js";
import User from "../models/user.js";

import { Request, Response } from 'express'
// import { Types } from "mongoose";
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts)
    } catch (err) {
        res.status(500).json('Error getting thoughts!')
    }
}


export const postThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            userId: req.body.userId
        })
        res.json(thought)
        
        //  TODO: Add functionality to push new thought's id to respective user's array
        await User.findOneAndUpdate({ username: req.body.username },
            
            // Code assisted by Github Copilot (I didn't know $push was a thing but my original code looked like User.push(new ObjectId) which did NOT work)
            { $push: { thoughts: thought._id } })
        } catch (err) {
            res.status(500).json('Error posting thought!')
        }
    }
    export const getOneThought = async (req: Request, res: Response) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            res.json(thought)
        } catch (err) {
            res.status(500).json('Error getting thought!')
        }
    }
    
    export const updateThought = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                thoughtText: req.body.thoughtText,
            }
        )
        res.json(updatedThought)
    } catch (err) {
        console.log(err)
        res.status(500).json('Error updating thought!')
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        res.json(deletedThought)
    } catch (err) {

        res.status(500).json('Error deleting thought!')
    }
}

export const postReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $push: { reactions: { reactionBody: req.body.reaction, username: req.body.username }} },
            {new: true}
        )
        res.json(reaction)
    } catch (err) {
        res.status(500).json('Nice reaction fuckface, too bad it sucks and I refuse to post it')
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}})
        res.json(reaction)
    } catch (err) {
        res.status(500).json('How DARE you try to delete this beautiful poetic reaction?')
    }
}

