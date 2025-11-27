
import { NFe, ReportIssue } from "../types/nfe";

const API_URL = "http://localhost:8000/api/v1";

interface BackendNFe {
  id: string;
  numero: string;
  chave: string;
  valor: number;
  status: string;
  emitente: string;
  destinatario: string;
  empresa_id: string;
  created_at: string;
  updated_at: string;
}

export const fetchNFes = async (): Promise<NFe[]> => {
  try {
    const response = await fetch(`${API_URL}/nfe/`);
    if (!response.ok) {
      throw new Error("Failed to fetch NFes");
    }
    const data: BackendNFe[] = await response.json();

    return data.map((item) => ({
      id: item.id,
      numero: item.numero,
      chave: item.chave,
      dataEmissao: new Date(item.created_at).toISOString().split('T')[0], // Using created_at as emission date for now
      cnpjEmitente: "", // Not in backend yet
      nomeEmitente: item.emitente,
      cnpjDestinatario: "", // Not in backend yet
      nomeDestinatario: item.destinatario,
      valor: item.valor,
      status: item.status as "Autorizada" | "Cancelada" | "Denegada",
      relatorios: { // Default values
        sistema: true,
        sped: false,
        efd: false,
        ciap: false,
        livrosFiscais: false,
      }
    }));
  } catch (error) {
    console.error("Error fetching NFes:", error);
    return [];
  }
};

// Mock data for report issues (kept as per plan to focus on NFe first)
const mockReportIssues: ReportIssue[] = [
  {
    id: "1",
    tipo: "Faltante",
    notaId: "1",
    numeroNota: "000000001",
    descricao: "Nota presente no sistema mas ausente no CIAP",
    origem: "sistema",
    dataCriacao: "2023-05-15",
    status: "Aberto"
  },
  // ... (keeping some examples)
];

export const fetchReportIssues = (): Promise<ReportIssue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReportIssues);
    }, 500);
  });
};

export const formatCNPJ = (cnpj: string): string => {
  if (!cnpj) return "";
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
