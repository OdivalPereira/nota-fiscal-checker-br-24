
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { NFe } from "@/types/nfe";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatCNPJ, fetchNFes } from "@/services/nfeService";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

const AnaliseDetalhada = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: nfes, isLoading } = useQuery({
    queryKey: ["nfes"],
    queryFn: fetchNFes
  });
  
  const nfe = nfes?.find(nfe => nfe.id === id);
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-nfe-royal border-r-transparent"></div>
          <p className="mt-2 text-nfe-slate">Carregando dados...</p>
        </div>
      </PageLayout>
    );
  }

  if (!nfe) {
    return (
      <PageLayout>
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold">Nota fiscal não encontrada</h2>
          <p className="mt-2">A nota fiscal solicitada não foi localizada no sistema.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/analise")}
          >
            Voltar para a lista
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="sm"
          className="mr-2"
          onClick={() => navigate("/analise")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-nfe-blue">
          Análise da Nota Fiscal - {nfe.numero}
        </h1>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Emitente</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-base font-bold text-nfe-blue">{nfe.nomeEmitente}</div>
              <div className="text-sm text-nfe-slate">CNPJ: {formatCNPJ(nfe.cnpjEmitente)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Destinatário</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-base font-bold text-nfe-blue">{nfe.nomeDestinatario}</div>
              <div className="text-sm text-nfe-slate">CNPJ: {formatCNPJ(nfe.cnpjDestinatario)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Valor Total</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-base font-bold text-nfe-blue">{formatCurrency(nfe.valor)}</div>
              <div className="text-sm text-nfe-slate">Data: {nfe.dataEmissao}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tributacao" className="w-full">
          <TabsList className="mb-6 bg-white">
            <TabsTrigger value="tributacao">Tributação</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="consistencia">Consistência</TabsTrigger>
            <TabsTrigger value="documentos">Documentos Relacionados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tributacao">
            <Card>
              <CardHeader>
                <CardTitle>Tributação da Nota Fiscal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-nfe-blue">ICMS</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader className="bg-nfe-light">
                          <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Base de Cálculo</TableCell>
                            <TableCell className="text-right">{formatCurrency(nfe.valor * 0.82)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Alíquota</TableCell>
                            <TableCell className="text-right">18%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Valor ICMS</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(nfe.valor * 0.82 * 0.18)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-nfe-blue">PIS</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader className="bg-nfe-light">
                          <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Base de Cálculo</TableCell>
                            <TableCell className="text-right">{formatCurrency(nfe.valor)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Alíquota</TableCell>
                            <TableCell className="text-right">1.65%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Valor PIS</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(nfe.valor * 0.0165)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-nfe-blue">COFINS</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader className="bg-nfe-light">
                          <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Base de Cálculo</TableCell>
                            <TableCell className="text-right">{formatCurrency(nfe.valor)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Alíquota</TableCell>
                            <TableCell className="text-right">7.6%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Valor COFINS</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(nfe.valor * 0.076)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="produtos">
            <Card>
              <CardHeader>
                <CardTitle>Produtos da Nota Fiscal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-nfe-light">
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>NCM</TableHead>
                        <TableHead>CFOP</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Valor Unitário</TableHead>
                        <TableHead className="text-right">Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>001</TableCell>
                        <TableCell>Produto A</TableCell>
                        <TableCell>1234.56.78</TableCell>
                        <TableCell>5102</TableCell>
                        <TableCell className="text-right">10</TableCell>
                        <TableCell className="text-right">{formatCurrency(45.75)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(457.50)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>002</TableCell>
                        <TableCell>Produto B</TableCell>
                        <TableCell>8765.43.21</TableCell>
                        <TableCell>5102</TableCell>
                        <TableCell className="text-right">5</TableCell>
                        <TableCell className="text-right">{formatCurrency(158.65)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(793.25)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consistencia">
            <Card>
              <CardHeader>
                <CardTitle>Consistência nos Relatórios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-nfe-light">
                        <TableRow>
                          <TableHead>Sistema/Relatório</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Sistema</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${nfe.relatorios.sistema ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {nfe.relatorios.sistema ? 'Incluída' : 'Ausente'}
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>SPED Fiscal</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${nfe.relatorios.sped ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {nfe.relatorios.sped ? 'Incluída' : 'Ausente'}
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>EFD-Contribuições</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${nfe.relatorios.efd ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {nfe.relatorios.efd ? 'Incluída' : 'Ausente'}
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>CIAP</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${nfe.relatorios.ciap ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {nfe.relatorios.ciap ? 'Incluída' : 'Ausente'}
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Livros Fiscais</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${nfe.relatorios.livrosFiscais ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {nfe.relatorios.livrosFiscais ? 'Incluída' : 'Ausente'}
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-nfe-blue mb-4">Resumo da Análise</h3>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${nfe.relatorios.sistema && nfe.relatorios.sped && nfe.relatorios.efd && nfe.relatorios.ciap && nfe.relatorios.livrosFiscais ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <h4 className="font-medium">
                          {nfe.relatorios.sistema && nfe.relatorios.sped && nfe.relatorios.efd && nfe.relatorios.ciap && nfe.relatorios.livrosFiscais ? 'Nota consistente em todos os relatórios' : 'Inconsistências detectadas'}
                        </h4>
                        <p className="text-sm mt-1">
                          {nfe.relatorios.sistema && nfe.relatorios.sped && nfe.relatorios.efd && nfe.relatorios.ciap && nfe.relatorios.livrosFiscais ? 
                            'A nota fiscal está presente em todos os sistemas e relatórios necessários.' : 
                            'A nota fiscal apresenta divergências entre os sistemas e relatórios.'}
                        </p>
                      </div>
                      
                      {(!nfe.relatorios.sistema || !nfe.relatorios.sped || !nfe.relatorios.efd || !nfe.relatorios.ciap || !nfe.relatorios.livrosFiscais) && (
                        <div className="p-4 bg-white border rounded-lg">
                          <h4 className="font-medium">Ações recomendadas</h4>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            {!nfe.relatorios.sistema && <li>Verificar lançamento da nota no sistema</li>}
                            {!nfe.relatorios.sped && <li>Incluir nota no SPED Fiscal antes da transmissão</li>}
                            {!nfe.relatorios.efd && <li>Verificar critérios de inclusão na EFD-Contribuições</li>}
                            {!nfe.relatorios.ciap && <li>Avaliar necessidade de inclusão no CIAP</li>}
                            {!nfe.relatorios.livrosFiscais && <li>Atualizar livros fiscais</li>}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documentos">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Relacionados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-nfe-slate py-6">
                  Nenhum documento relacionado encontrado para esta nota fiscal.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sistema de Análise de NF-e • Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
};

// Now, let's implement the list page for all invoices
const Analise = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: nfes, isLoading } = useQuery({
    queryKey: ["nfes"],
    queryFn: fetchNFes
  });

  const handleRowClick = (id: string) => {
    navigate(`/analise/${id}`);
  };
  
  // Filter NFes based on search term
  const filteredNFEs = nfes?.filter((nfe) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      nfe.numero.toLowerCase().includes(searchLower) ||
      nfe.chave.toLowerCase().includes(searchLower) ||
      nfe.nomeEmitente.toLowerCase().includes(searchLower) ||
      nfe.nomeDestinatario.toLowerCase().includes(searchLower)
    );
  }) || [];

  return (
    <PageLayout>
        <h1 className="text-2xl font-bold text-nfe-blue mb-6">Análise de Notas Fiscais Eletrônicas</h1>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Buscar por número, chave ou nome..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nfe-royal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                Filtros avançados
              </Button>
              <Button>
                Nova análise
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-nfe-royal border-r-transparent"></div>
              <p className="mt-2 text-nfe-slate">Carregando notas fiscais...</p>
            </div>
          ) : filteredNFEs.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-nfe-light">
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Emitente</TableHead>
                      <TableHead>Destinatário</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Consistência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNFEs.map((nfe) => {
                      // Calculate consistency percentage
                      const reportStatus = [
                        nfe.relatorios.sistema,
                        nfe.relatorios.sped,
                        nfe.relatorios.efd,
                        nfe.relatorios.ciap,
                        nfe.relatorios.livrosFiscais
                      ];
                      
                      const consistencyPercentage = Math.round(
                        (reportStatus.filter(Boolean).length / reportStatus.length) * 100
                      );
                      
                      const getConsistencyClass = () => {
                        if (consistencyPercentage === 100) return "bg-green-100 text-green-800";
                        if (consistencyPercentage >= 80) return "bg-yellow-100 text-yellow-800";
                        if (consistencyPercentage >= 50) return "bg-orange-100 text-orange-800";
                        return "bg-red-100 text-red-800";
                      };
                      
                      return (
                        <TableRow 
                          key={nfe.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRowClick(nfe.id)}
                        >
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
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              nfe.status === "Autorizada" ? "bg-green-100 text-green-800" :
                              nfe.status === "Cancelada" ? "bg-red-100 text-red-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {nfe.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConsistencyClass()}`}>
                              {consistencyPercentage}%
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <p className="text-nfe-slate">Nenhuma nota fiscal encontrada com os critérios de busca.</p>
            </div>
          )}
        </div>
    </PageLayout>
  );
};

export default Analise;
