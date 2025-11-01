export interface GetTaksResponse {
  message: string;
  backData: BackDatum[];
}

interface BackDatum {
  id: string;
  userId: string;
  nombre: string;
  fecha: CreatedAt;
  estado: boolean;
  created_at: CreatedAt;
  updated_at: CreatedAt;
}

interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}
