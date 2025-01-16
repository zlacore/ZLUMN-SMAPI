import User from "../models/user.js";
import { Request, Response } from 'express'
import { Types } from "mongoose";

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (err) {
        res.status(500).json('Error getting users!')
    }
}

export const getOneUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ _id: req.params.id })
            res.json(user)
        } catch (err) {
            res.status(500).json('Error getting user!')
        }
    }

export const postUser = async (req: Request, res: Response) => {
        try {
            const user = await User.create({
                username: req.body.username,
                email: req.body.email
            }
            )
            res.json(user)
        } catch (err) {
            res.status(500).json('Error posting user!')
        }
    }

export const updateUser = async (req: Request, res: Response) => {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.id },
                    {
                        username: req.body.username,
                        email: req.body.email
                    }
                )
            res.json(updatedUser)
        } catch (err) {
            console.log(err)
            res.status(500).json('Error updating user!')
        }
    }

export const deleteUser = async (req: Request, res: Response) => {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.id })
            res.json(deletedUser)
        } catch (err) {
            res.status(500).json('Error deleting user!')
        }
    }

export const addFriend = async (req: Request, res: Response) => {
    try {   
        const newFriend = await User.findByIdAndUpdate({_id: req.params.userId},
        { $push: { friends: new Types.ObjectId(req.params.friendId) }}
        )
        res.json(newFriend)
    } catch (error) {
        console.log(error)
        res.status(500).json('You have no friends, HA!')
    }
}

export const unfriend = async (req: Request, res: Response) => {
    try {
        const unfriended = await User.findByIdAndUpdate({_id: req.params.userId}, 
            {$pull: {friends: new Types.ObjectId(req.params.friendId) }}
        )
        res.json(unfriended)
    } catch (error) {
        res.status(500).json('You cannot unadd them!')
    }
}