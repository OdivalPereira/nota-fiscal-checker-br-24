
import { NFe, ReportIssue } from "../types/nfe";

// Mock data for demonstration purposes
const mockNFes: NFe[] = [
  {
    id: "1",
    numero: "000000001",
    chave: "35210706009856000184550010000000011879048156",
    dataEmissao: "2023-05-10",
    cnpjEmitente: "06.009.856/0001-84",
    nomeEmitente: "EMPRESA TESTE LTDA",
    cnpjDestinatario: "08.123.456/0001-78",
    nomeDestinatario: "CLIENTE LTDA",
    valor: 1250.75,
    status: "Autorizada",
    relatorios: {
      sistema: true,
      sped: true,
      efd: true,
      ciap: false,
      livrosFiscais: true,
    },
  },
  {
    id: "2",
    numero: "000000002",
    chave: "35210706009856000184550010000000021879048157",
    dataEmissao: "2023-05-12",
    cnpjEmitente: "06.009.856/0001-84",
    nomeEmitente: "EMPRESA TESTE LTDA",
    cnpjDestinatario: "09.876.543/0001-21",
    nomeDestinatario: "OUTRO CLIENTE ME",
    valor: 3450.00,
    status: "Autorizada",
    relatorios: {
      sistema: true,
      sped: true,
      efd: false,
      ciap: true,
      livrosFiscais: true,
    },
  },
  {
    id: "3",
    numero: "000000003",
    chave: "35210706009856000184550010000000031879048158",
    dataEmissao: "2023-05-15",
    cnpjEmitente: "06.009.856/0001-84",
    nomeEmitente: "EMPRESA TESTE LTDA",
    cnpjDestinatario: "10.111.222/0001-33",
    nomeDestinatario: "DISTRIBUIDORA XYZ LTDA",
    valor: 567.90,
    status: "Cancelada",
    relatorios: {
      sistema: true,
      sped: false,
      efd: false,
      ciap: false,
      livrosFiscais: false,
    },
  },
  {
    id: "4",
    numero: "000000004",
    chave: "35210706009856000184550010000000041879048159",
    dataEmissao: "2023-05-18",
    cnpjEmitente: "06.009.856/0001-84",
    nomeEmitente: "EMPRESA TESTE LTDA",
    cnpjDestinatario: "12.345.678/0001-90",
    nomeDestinatario: "INDÚSTRIA ABC S.A.",
    valor: 12789.55,
    status: "Autorizada",
    relatorios: {
      sistema: true,
      sped: true,
      efd: true,
      ciap: true,
      livrosFiscais: false,
    },
  },
  {
    id: "5",
    numero: "000000005",
    chave: "35210706009856000184550010000000051879048160",
    dataEmissao: "2023-05-20",
    cnpjEmitente: "06.009.856/0001-84",
    nomeEmitente: "EMPRESA TESTE LTDA",
    cnpjDestinatario: "11.222.333/0001-44",
    nomeDestinatario: "COMÉRCIO VAREJO LTDA",
    valor: 789.30,
    status: "Denegada",
    relatorios: {
      sistema: false,
      sped: false,
      efd: false,
      ciap: false,
      livrosFiscais: false,
    },
  },
];

// Mock data para as inconsistências de relatórios
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
  {
    id: "2",
    tipo: "Duplicada",
    notaId: "2",
    numeroNota: "000000002",
    descricao: "Nota duplicada no SPED Fiscal",
    origem: "sped",
    dataCriacao: "2023-05-16",
    status: "EmAnalise"
  },
  {
    id: "3",
    tipo: "ValorDivergente",
    notaId: "4",
    numeroNota: "000000004",
    descricao: "Valor da nota difere entre Sistema e EFD-Contribuições",
    origem: "sistema",
    destino: "efd",
    valor: 12789.55,
    valorReal: 12879.55,
    dataCriacao: "2023-05-19",
    status: "Aberto"
  },
  {
    id: "4",
    tipo: "Faltante",
    notaId: "5",
    numeroNota: "000000005",
    descricao: "Nota não encontrada no Sistema",
    origem: "sped",
    dataCriacao: "2023-05-21",
    status: "Resolvido"
  },
  {
    id: "5",
    tipo: "ValorDivergente",
    notaId: "3",
    numeroNota: "000000003",
    descricao: "Valor divergente entre Sistema e Livros Fiscais",
    origem: "sistema",
    destino: "livrosFiscais",
    valor: 567.90,
    valorReal: 576.90,
    dataCriacao: "2023-05-17",
    status: "Resolvido"
  }
];

export const fetchNFes = (): Promise<NFe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNFes);
    }, 500);
  });
};

export const fetchReportIssues = (): Promise<ReportIssue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReportIssues);
    }, 500);
  });
};

export const formatCNPJ = (cnpj: string): string => {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
