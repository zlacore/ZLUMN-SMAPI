import { Router } from "express";
const router = Router()
import {
    getUsers,
    getOneUser,
    postUser,
    updateUser,
    deleteUser,
    addFriend,
    unfriend
} from '../../controllers/userController.js';


// Get all Users
// Get ONE User
// Post User
router.route('/')
    .get(getUsers)
    .post(postUser)

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser)
    .get(getOneUser)


router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(unfriend)



export { router as userRouter }
