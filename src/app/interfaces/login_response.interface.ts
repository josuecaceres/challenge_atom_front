export interface LoginResponse {
  message: string;
  backData: BackData;
}

interface BackData {
  token: string;
  user: User;
}

interface User {
  id: string;
  nombre: string;
  email: string;
}
