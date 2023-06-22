import express, { Request, Response } from 'express';
import { Account } from '../utils/interfaces';
import { accounts } from '../data/accounts';
import { generateAccountId } from '../utils/idGenerator';

export const createAccount = async (req: Request, res: Response) => {
  const { name, password, phone, email } = req.body;

  try {
    const newAccount: Account = {
      id: generateAccountId(),
      name,
      password,
      phone,
      email,
    };

    const account = accounts.find(
      (acc) => acc.name === name && acc.email === email
    );

    if (!name || !password || !phone || !email) {
      res.status(400).json({
        success: false,
        message: 'Please fill in all required fields',
      });
      return;
    } else if (name === account?.name) {
      res
        .status(409)
        .json({ success: false, message: 'Username is already in use' });
      return;
    } else if (email === account?.email) {
      res
        .status(409)
        .json({ success: false, message: 'Email is already in use' });
      return;
    }

    accounts.push(newAccount);

    res.status(201).json({
      success: true,
      data: newAccount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Unable to create new account',
    });
  }
};

export const getAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const account = accounts.find((acc) => acc.id === id);

    if (account) {
      res.status(200).json({
        success: true,
        data: account,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Unable to find account with id of: '${id}'`,
      });
    }
  } catch (err) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: accounts,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, address, phone, email } = req.body;

  try {
    const account = accounts.find((acc) => acc.id === id);

    if (account) {
      account.name = name || account.name;
      account.password = address || account.password;
      account.phone = phone || account.phone;
      account.email = email || account.email;

      res.status(200).json({
        success: true,
        data: account,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Unable to update account with id of: '${id}'`,
      });
    }
  } catch (err) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const index = accounts.findIndex((acc) => acc.id === id);

    if (index !== -1) {
      const deletedAccount = accounts.splice(index, 1)[0];
      res.status(200).json({
        success: true,
        message: `Account with id of: '${deletedAccount.id}' has been deleted`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Unable to delete account with id of: '${id}'`,
      });
    }
  } catch (err) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};
