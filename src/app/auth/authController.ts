import express, { Request, Response } from "express";
import User from "../users/model";
import bcrypt from "bcrypt";
import APIError from "../../@utils/errors";
import ResponseMessage from "../../@utils/response";

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  return res.json(req.body);
};

export const register = async (req: Request, res: Response) => {
  const { name, lastName } = req.body;
  const userName = `${name.toLowerCase()}${lastName.toLowerCase()}`;

  const userCheck = await User.findOne({ userName });

  if (userCheck) {
    throw new APIError("Kullanıcı zaten mevcut", 401);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const userSave = new User(Object.assign({}, req.body, { userName }));

  await userSave
    .save()
    .then((data_res) => {
      return new ResponseMessage(data_res, "Kayıt Başarıyla Eklendi").created(
        res
      );
    })
    .catch((err) => {
      throw new APIError("Kullanıcı Kayıt Edilemedi",400)
    });
};
