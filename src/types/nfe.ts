
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
  valorFrete?: number;
  status: "Autorizada" | "Cancelada" | "Denegada";
  tributos?: NFeTributos;
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

export interface NFeProduto {
  id: string;
  codigo: string;
  descricao: string;
  ncm: string;
  cfop: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  impostos: {
    icms: {
      cst: string;
      baseCalculo: number;
      aliquota: number;
      valor: number;
    };
    pis: {
      cst: string;
      baseCalculo: number;
      aliquota: number;
      valor: number;
    };
    cofins: {
      cst: string;
      baseCalculo: number;
      aliquota: number;
      valor: number;
    };
    ipi?: {
      cst: string;
      baseCalculo: number;
      aliquota: number;
      valor: number;
    };
    icmsst?: {
      baseCalculo: number;
      aliquota: number;
      valor: number;
    };
  };
}

export interface NFeTributos {
  icms: {
    baseCalculo: number;
    aliquotaMedia: number;
    valor: number;
  };
  pis: {
    baseCalculo: number;
    aliquota: number;
    valor: number;
  };
  cofins: {
    baseCalculo: number;
    aliquota: number;
    valor: number;
  };
  ipi?: {
    baseCalculo: number;
    aliquota: number;
    valor: number;
  };
  icmsst?: {
    baseCalculo: number;
    aliquota: number;
    valor: number;
  };
}
