import express from 'express';
import {
  createAccount,
  getAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
} from '../controller/accounts';

const router = express.Router();

router.route('/').get(getAllAccounts).post(createAccount);
router.route('/:id').get(getAccount).put(updateAccount).delete(deleteAccount);

export default router;
