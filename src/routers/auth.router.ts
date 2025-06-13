import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { TokenValidator } from "../validators/token.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(UserValidator.create),
  authController.signUp,
);
router.post("/sign-in", authController.signIn);
router.post(
  "/refresh",
  commonMiddleware.isBodyValid(TokenValidator.refreshToken),
  authMiddleware.checkRefreshToken,
  authController.refresh,
);
router.get("/me", authMiddleware.checkAccessToken, authController.me);

router.patch("/activate/:token", authController.activate);

router.post("/recovery", authController.recoveryPasswordRequest);
router.patch(
  "/recovery/:token",
  commonMiddleware.isBodyValid(AuthValidator.validatePassword),
  authController.recoveryPassword,
);
export const authRouter = router;
