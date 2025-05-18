
export interface NFe {
  id: string;
  numero: string;
  chave: string;
  dataEmissao: string;
  cnpjEmitente: string;
  nomeEmitente: string;
  cnpjDestinatario: string;
  nomeDestinatario: string;
  valor: number;
  status: "Autorizada" | "Cancelada" | "Denegada";
  relatorios: ReportStatus;
}

export interface ReportStatus {
  sped: boolean;
  efd: boolean;
  ciap: boolean;
  livrosFiscais: boolean;
}

export type ReportType = keyof ReportStatus;

export const reportLabels: Record<ReportType, string> = {
  sped: "SPED Fiscal",
  efd: "EFD-Contribuições",
  ciap: "CIAP",
  livrosFiscais: "Livros Fiscais",
};
