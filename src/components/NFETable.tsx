
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "./StatusBadge";
import { NFe, ReportType, reportLabels } from "@/types/nfe";
import { formatCNPJ, formatCurrency } from "@/services/nfeService";

interface NFETableProps {
  nfes: NFe[];
}

export const NFETable = ({ nfes }: NFETableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter NFes based on search term
  const filteredNFEs = nfes.filter((nfe) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      nfe.numero.toLowerCase().includes(searchLower) ||
      nfe.chave.toLowerCase().includes(searchLower) ||
      nfe.nomeEmitente.toLowerCase().includes(searchLower) ||
      nfe.nomeDestinatario.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-nfe-blue">Notas Fiscais Eletrônicas</h2>
        <div className="w-72">
          <Input
            placeholder="Buscar por número, chave ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-nfe-light">
              <TableRow>
                <TableHead className="w-[120px]">Número</TableHead>
                <TableHead>Emitente</TableHead>
                <TableHead>Destinatário</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                {Object.keys(reportLabels).map((report) => (
                  <TableHead key={report} className="text-center">
                    {reportLabels[report as ReportType]}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNFEs.length > 0 ? (
                filteredNFEs.map((nfe) => (
                  <TableRow key={nfe.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{nfe.numero}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{nfe.nomeEmitente}</span>
                        <span className="text-xs text-gray-500">{formatCNPJ(nfe.cnpjEmitente)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{nfe.nomeDestinatario}</span>
                        <span className="text-xs text-gray-500">{formatCNPJ(nfe.cnpjDestinatario)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(nfe.valor)}
                    </TableCell>
                    <TableCell>{nfe.dataEmissao}</TableCell>
                    <TableCell>
                      <StatusBadge status={nfe.status} />
                    </TableCell>
                    {Object.keys(reportLabels).map((report) => (
                      <TableCell key={report} className="text-center">
                        <StatusBadge 
                          status={nfe.relatorios[report as ReportType]} 
                          className="w-20"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7 + Object.keys(reportLabels).length} className="text-center py-6 text-gray-500">
                    Nenhuma nota fiscal encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
