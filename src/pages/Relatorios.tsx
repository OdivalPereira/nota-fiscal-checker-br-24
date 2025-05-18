
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportIssue, ReportType, reportLabels } from "@/types/nfe";
import { fetchReportIssues } from "@/services/nfeService";

const statusLabels = {
  "Aberto": "Pendente",
  "EmAnalise": "Em análise",
  "Resolvido": "Resolvido"
};

const tipoLabels = {
  "Duplicada": "Nota Duplicada",
  "Faltante": "Nota Faltante",
  "ValorDivergente": "Valor Divergente"
};

const Relatorios = () => {
  const [reportIssues, setReportIssues] = useState<ReportIssue[]>([]);
  const [filter, setFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useState(() => {
    const loadData = async () => {
      try {
        const data = await fetchReportIssues();
        setReportIssues(data);
      } catch (error) {
        console.error("Erro ao carregar problemas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrar as inconsistências com base no filtro atual e no termo de busca
  const filteredIssues = reportIssues.filter((issue) => {
    const matchesTipo = filter === "todos" || issue.tipo === filter;
    const matchesSearch = searchTerm === "" || 
      issue.numeroNota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTipo && matchesSearch;
  });

  // Contar as inconsistências por tipo
  const counts = {
    total: reportIssues.length,
    duplicadas: reportIssues.filter(i => i.tipo === "Duplicada").length,
    faltantes: reportIssues.filter(i => i.tipo === "Faltante").length,
    divergentes: reportIssues.filter(i => i.tipo === "ValorDivergente").length,
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Aberto":
        return "bg-nfe-error/10 text-nfe-error";
      case "EmAnalise":
        return "bg-nfe-warning/10 text-nfe-warning";
      case "Resolvido":
        return "bg-nfe-success/10 text-nfe-success";
      default:
        return "bg-nfe-slate/10 text-nfe-slate";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-nfe-blue mb-6">Relatórios de Inconsistências</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Total</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">{counts.total}</div>
              <p className="text-xs text-nfe-slate mt-1">Inconsistências encontradas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Notas Duplicadas</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-royal">{counts.duplicadas}</div>
              <p className="text-xs text-nfe-slate mt-1">Documentos em duplicidade</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Notas Faltantes</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-error">{counts.faltantes}</div>
              <p className="text-xs text-nfe-slate mt-1">Documentos não encontrados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Valores Divergentes</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-warning">{counts.divergentes}</div>
              <p className="text-xs text-nfe-slate mt-1">Documentos com valores diferentes</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="inconsistencias">
          <TabsList className="mb-6 bg-white">
            <TabsTrigger value="inconsistencias">Inconsistências</TabsTrigger>
            <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inconsistencias" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="Duplicada">Duplicadas</SelectItem>
                    <SelectItem value="Faltante">Faltantes</SelectItem>
                    <SelectItem value="ValorDivergente">Valores Divergentes</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-nfe-slate hidden sm:inline">
                  {filteredIssues.length} resultados encontrados
                </span>
              </div>
              <div className="w-full sm:w-auto">
                <Input
                  placeholder="Buscar por número ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sm:w-72"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-nfe-royal border-r-transparent"></div>
                <p className="mt-2 text-nfe-slate">Carregando dados...</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-nfe-light">
                      <TableRow>
                        <TableHead className="w-[120px]">Nota</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Origem/Destino</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIssues.length > 0 ? (
                        filteredIssues.map((issue) => (
                          <TableRow key={issue.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{issue.numeroNota}</TableCell>
                            <TableCell>
                              <span>{tipoLabels[issue.tipo]}</span>
                            </TableCell>
                            <TableCell>{issue.descricao}</TableCell>
                            <TableCell>
                              {issue.tipo === "ValorDivergente" ? (
                                <div className="flex flex-col">
                                  <span className="text-sm">{reportLabels[issue.origem]} → {reportLabels[issue.destino!]}</span>
                                  <span className="text-xs text-nfe-error">
                                    Diferença: {((issue.valorReal || 0) - (issue.valor || 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </span>
                                </div>
                              ) : (
                                <span>{reportLabels[issue.origem]}</span>
                              )}
                            </TableCell>
                            <TableCell>{issue.dataCriacao}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(issue.status)}`}
                              >
                                {statusLabels[issue.status]}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                                Analisar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            Nenhuma inconsistência encontrada
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="diagnostico">
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="text-lg font-semibold text-nfe-blue mb-4">Diagnóstico de Problemas</h2>
              <p className="text-gray-700 mb-6">
                Esta área oferece ferramentas para diagnosticar problemas nos documentos fiscais, 
                identificando inconsistências entre diferentes sistemas e relatórios.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-nfe-royal text-lg">Análise de Divergências</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Identificação de valores divergentes entre o sistema e os relatórios fiscais.
                    </p>
                    <Button className="w-full">Executar Análise</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-nfe-royal text-lg">Verificação de Duplicidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Identificação de documentos duplicados entre sistemas e relatórios.
                    </p>
                    <Button className="w-full">Verificar Duplicidades</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-nfe-royal text-lg">Documentos Faltantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Identificação de notas presentes no sistema mas ausentes nos relatórios fiscais.
                    </p>
                    <Button className="w-full">Localizar Faltantes</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
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

export default Relatorios;
