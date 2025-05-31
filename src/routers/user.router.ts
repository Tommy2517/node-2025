import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", commonMiddleware.isIdValidate("id"), userController.getById);
router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValidate("id"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateById,
);
router.delete(
  "/:id",
  // authMiddleware.checkAccessToken,
  commonMiddleware.isIdValidate("id"),
  userController.deleteById,
);

router.patch(
  "/:id/block",
  authMiddleware.checkAccessToken,
  commonMiddleware.isAdmin,
  userController.blockUser,
);
router.patch(
  "/:id/unblock",
  authMiddleware.checkAccessToken,
  commonMiddleware.isAdmin,
  userController.unBlockUser,
);

export const userRouter = router;
