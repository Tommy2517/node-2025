import joi from "joi";

export class TokenValidator {
  private static refresh = joi.string().trim();

  public static refreshToken = joi.object({
    refreshToken: this.refresh.required(),
  });
}
