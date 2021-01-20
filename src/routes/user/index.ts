import { Router } from "express";
import { createUserController } from "../../useCases/user/create";
import { updateUserController } from "../../useCases/user/update";
import { listUserController } from "../../useCases/user/list";

const userRouter = Router();

userRouter.post("/users", (req, res) => {
  return createUserController.handle(req, res);
});

userRouter.get("/users", (req, res) => {
  return listUserController.handle(req, res);
});

userRouter.put("/users/:id", (req, res) => {
  return updateUserController.handle(req, res);
});

export { userRouter };
