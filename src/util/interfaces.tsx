export interface ISchedule {
  dia: String;
  hora: String;
  aula: String;
  local: String;
}

export interface User {
  RA: string;
  email: string;
  senha: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

export interface AuthState {
  token: string;
  user: User;
//   refreshToken?: string;
}
