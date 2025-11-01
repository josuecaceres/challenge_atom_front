export interface RegisterResponse {
  message: string;
  backData: BackData;
}

interface BackData {
  id: string;
  nombre: string;
  email: string;
  token: string;
}
