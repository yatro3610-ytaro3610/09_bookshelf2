import express from 'express';
import { body } from "express-validator";
import { registBook, updateBook, getAllBooks, getBookById, deleteBook } from '../controllers/books.mjs';
import { requestErrorHandler } from '../helpers/helper.mjs';
const router = express.Router();

// /api/books
router.get('/',  requestErrorHandler(getAllBooks));

router.get('/:id',  requestErrorHandler(getBookById));

router.delete('/:id',  requestErrorHandler(deleteBook));

router.post(
    '/',
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('comment').notEmpty(),
    body('rating').notEmpty().isInt({min: 1, max: 5}),
    requestErrorHandler(registBook)
);

router.patch(
    '/:id',
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('comment').optional().notEmpty(),
    body('rating').optional().notEmpty().isInt({min: 1, max: 5}),
    requestErrorHandler(updateBook)
);

export default router;

