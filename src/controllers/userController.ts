import { Request, Response, NextFunction } from "express";
import { Users } from "../../data/users";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";

// * ใช้งาน any กับ error เพราะว่าต้องการให้ ทั้งหมด ที่เป็น error

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(StatusCodes.OK).json(Users);
  } catch (error: any) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const user = Users.find((user) => user.id === id);

    if (!user) {
      throw createError(StatusCodes.NOT_FOUND, "User not found");
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

  try {
    // validation
    if (!name || !email) {
      throw createError(StatusCodes.BAD_REQUEST, "Name and email are required");
    }

    const newUser = {
      id: Users.length + 1,
      name,
      email,
      createdAt: new Date(),
    };

    Users.push(newUser);

    res.status(StatusCodes.CREATED).json(newUser);
  } catch (error: any) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  try {
    if (!id || typeof id !== "number") {
      throw createError(StatusCodes.BAD_REQUEST, "ID is required");
    }

    const user = Users.find((user) => user.id === id);

    if (!user) {
      throw createError(StatusCodes.NOT_FOUND, "User not found");
    } else {
      user.name = name;
      user.email = email;
      user.createdAt = new Date();
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    if (!id) {
      throw createError(StatusCodes.BAD_REQUEST, "ID is required");
    }

    const User = Users.find((user) => user.id === id);

    if (!User) {
      throw createError(StatusCodes.NOT_FOUND, "User not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: `User ${id} deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};
