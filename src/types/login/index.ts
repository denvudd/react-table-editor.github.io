export enum LoginErrorEnum {
  InvalidCredentials = "Invalid credentials.",
  InvalidData = "Invalid input data.",
}

export interface LoginSuccessResponse {
  message: string;
}

export interface LoginSuccessResponse {
  error: LoginErrorEnum;
}
