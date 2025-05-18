
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
  sistema: boolean;
  sped: boolean;
  efd: boolean;
  ciap: boolean;
  livrosFiscais: boolean;
}

export type ReportType = keyof ReportStatus;

export const reportLabels: Record<ReportType, string> = {
  sistema: "Sistema",
  sped: "SPED Fiscal",
  efd: "EFD-Contribuições",
  ciap: "CIAP",
  livrosFiscais: "Livros Fiscais",
};

export interface ReportIssue {
  id: string;
  tipo: "Duplicada" | "Faltante" | "ValorDivergente";
  notaId: string;
  numeroNota: string;
  descricao: string;
  origem: ReportType;
  destino?: ReportType;
  valor?: number;
  valorReal?: number;
  dataCriacao: string;
  status: "Aberto" | "EmAnalise" | "Resolvido";
}
