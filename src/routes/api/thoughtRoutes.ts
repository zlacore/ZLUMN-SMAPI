import { Router } from "express";
const router = Router()
import {
    getThoughts,
    getOneThought,
    postThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} from '../../controllers/thoughtController.js';


// Get all thoughts
// Get ONE thought
// Post thought
router.route('/')
    .get(getThoughts)
    .post(postThought)

router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions')
    .put(postReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)



export { router as thoughtRouter }