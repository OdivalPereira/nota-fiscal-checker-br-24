
import { NFe } from "../types/nfe";

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
      sped: false,
      efd: false,
      ciap: false,
      livrosFiscais: false,
    },
  },
];

export const fetchNFes = (): Promise<NFe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNFes);
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
