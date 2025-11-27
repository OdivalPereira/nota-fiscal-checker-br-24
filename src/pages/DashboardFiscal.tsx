
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, 
  Filter, 
  Receipt, 
  Calculator, 
  BookOpen, 
  ClipboardCheck, 
  Calendar, 
  LayoutGrid, 
  BarChart3,
  LineChart,
  PieChart,
  Download,
  TrendingUp
} from "lucide-react";
import { NFETable } from "@/components/NFETable";
import { fetchNFes } from "@/services/nfeService";
import { FiscalSummary } from "@/components/FiscalSummary";

const DashboardFiscal = () => {
  const [activeTab, setActiveTab] = useState("resumo");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [reportGenerated, setReportGenerated] = useState(false);
  
  const { data: nfes, isLoading } = useQuery({
    queryKey: ["nfes"],
    queryFn: fetchNFes,
  });

  const months = [
    { value: "2024-01", label: "Janeiro 2024" },
    { value: "2024-02", label: "Fevereiro 2024" },
    { value: "2024-03", label: "Março 2024" },
    { value: "2024-04", label: "Abril 2024" },
    { value: "2024-05", label: "Maio 2024" },
    { value: "2024-06", label: "Junho 2024" },
    { value: "2024-07", label: "Julho 2024" },
    { value: "2024-08", label: "Agosto 2024" },
    { value: "2024-09", label: "Setembro 2024" },
    { value: "2024-10", label: "Outubro 2024" },
    { value: "2024-11", label: "Novembro 2024" },
    { value: "2024-12", label: "Dezembro 2024" },
  ];

  const toggleMonth = (month: string) => {
    setSelectedMonths(prev =>
      prev.includes(month)
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };

  const generateReport = () => {
    if (selectedMonths.length === 0) {
      alert("Selecione pelo menos um mês para gerar o relatório.");
      return;
    }
    setReportGenerated(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Dados simulados de faturamento por mês
  const billingData: { [key: string]: number } = {
    "2024-01": 450000,
    "2024-02": 520000,
    "2024-03": 480000,
    "2024-04": 510000,
    "2024-05": 495000,
    "2024-06": 530000,
    "2024-07": 545000,
    "2024-08": 502000,
    "2024-09": 518000,
    "2024-10": 535000,
    "2024-11": 550000,
    "2024-12": 580000,
  };

  // Dados simulados para os comparativos de impostos e NFes
  const fiscalSummaryData = {
    totalNFes: {
      system: {
        total: 847,
        authorized: 792,
        cancelled: 55,
        denied: 0
      },
      sped: {
        total: 846,
        authorized: 791,
        cancelled: 55,
        denied: 0
      },
      efd: {
        total: 845,
        authorized: 790,
        cancelled: 55,
        denied: 0
      },
      xml: {
        total: 847,
        authorized: 792,
        cancelled: 55,
        denied: 0
      }
    },
    icms: {
      system: 127832.65,
      sped: 127452.33,
      efd: 127832.65,
      xml: 127832.65
    },
    pisCofins: {
      system: 62475.92,
      sped: 62475.92,
      efd: 61890.41,
      xml: 62475.92
    },
    ipi: {
      system: 43125.47,
      sped: 43125.47,
      efd: 43125.47,
      xml: 42975.22
    }
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-nfe-blue flex items-center gap-2">
          <Receipt className="h-6 w-6" />
          Dashboard Fiscal
        </h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Período
          </Button>
        </div>
      </div>
      
      <FiscalSummary 
        totalNFes={fiscalSummaryData.totalNFes}
        icms={fiscalSummaryData.icms}
        pisCofins={fiscalSummaryData.pisCofins}
        ipi={fiscalSummaryData.ipi}
        isLoading={isLoading}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white border shadow-sm w-full justify-start overflow-x-auto">
          <TabsTrigger value="resumo" className="flex items-center gap-1">
            <Calculator className="h-4 w-4" />
            Resumo
          </TabsTrigger>
          <TabsTrigger value="notas" className="flex items-center gap-1">
            <Receipt className="h-4 w-4" />
            Notas Fiscais
          </TabsTrigger>
          <TabsTrigger value="sped" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            SPED Fiscal
          </TabsTrigger>
          <TabsTrigger value="efd" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            EFD-Contribuições
          </TabsTrigger>
          <TabsTrigger value="ciap" className="flex items-center gap-1">
            <ClipboardCheck className="h-4 w-4" />
            CIAP
          </TabsTrigger>
          <TabsTrigger value="obrigacoes" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Obrigações Acessórias
          </TabsTrigger>
          <TabsTrigger value="faturamento" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Relatório de Faturamento
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumo" className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-nfe-blue flex items-center gap-2">
              <Calculator className="h-5 w-5" /> 
              Resumo Fiscal
            </h2>
            <p className="text-gray-700">
              Visão geral dos dados fiscais do período atual. Utilize as abas para acessar relatórios específicos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="py-3 border-b">
                  <CardTitle className="text-sm flex items-center gap-1">
                    <BarChart3 className="h-4 w-4 text-nfe-royal" />
                    Impostos por CFOP
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <PieChart className="h-24 w-24 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="py-3 border-b">
                  <CardTitle className="text-sm flex items-center gap-1">
                    <LineChart className="h-4 w-4 text-nfe-royal" />
                    Evolução de Créditos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <LineChart className="h-24 w-24 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notas" className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-nfe-blue mb-4 flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Notas Fiscais
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-nfe-royal border-r-transparent"></div>
              <p className="ml-3 text-gray-500">Carregando notas fiscais...</p>
            </div>
          ) : (
            <NFETable nfes={nfes || []} />
          )}
        </TabsContent>
        
        <TabsContent value="sped" className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-nfe-blue flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SPED Fiscal
          </h2>
          <p className="text-gray-700 mb-4">Análise dos registros do SPED Fiscal.</p>
          <div className="h-96 border rounded flex items-center justify-center bg-gray-50">
            <FileText className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 ml-3">Dados do SPED Fiscal</p>
          </div>
        </TabsContent>
        
        <TabsContent value="efd" className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-nfe-blue flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            EFD-Contribuições
          </h2>
          <p className="text-gray-700 mb-4">Análise dos registros de PIS/COFINS.</p>
          <div className="h-96 border rounded flex items-center justify-center bg-gray-50">
            <BookOpen className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 ml-3">Dados de EFD-Contribuições</p>
          </div>
        </TabsContent>
        
        <TabsContent value="ciap" className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-nfe-blue flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            CIAP
          </h2>
          <p className="text-gray-700 mb-4">Controle de crédito de ICMS do Ativo Permanente.</p>
          <div className="h-96 border rounded flex items-center justify-center bg-gray-50">
            <ClipboardCheck className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 ml-3">Dados do CIAP</p>
          </div>
        </TabsContent>
        
        <TabsContent value="obrigacoes" className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-nfe-blue flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Obrigações Acessórias
          </h2>
          <p className="text-gray-700 mb-4">Status de entrega das obrigações fiscais.</p>
          <div className="h-96 border rounded flex items-center justify-center bg-gray-50">
            <Calendar className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 ml-3">Dados das Obrigações Acessórias</p>
          </div>
        </TabsContent>

        <TabsContent value="faturamento" className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-nfe-blue flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5" />
            Relatório de Faturamento
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border shadow-sm">
              <CardHeader className="py-3 border-b">
                <CardTitle className="text-sm">Selecione os Meses</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {months.map((month) => (
                    <div key={month.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={month.value}
                        checked={selectedMonths.includes(month.value)}
                        onCheckedChange={() => toggleMonth(month.value)}
                      />
                      <Label
                        htmlFor={month.value}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {month.label}
                      </Label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button 
                    onClick={generateReport} 
                    className="w-full"
                    disabled={selectedMonths.length === 0}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                  {selectedMonths.length > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedMonths([]);
                        setReportGenerated(false);
                      }}
                      className="w-full"
                    >
                      Limpar Seleção
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              {!reportGenerated ? (
                <Card className="border shadow-sm">
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <TrendingUp className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Nenhum Relatório Gerado
                      </h3>
                      <p className="text-gray-500">
                        Selecione os meses desejados e clique em "Gerar Relatório" para visualizar os dados de faturamento.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border shadow-sm">
                  <CardHeader className="py-3 border-b">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">
                        Relatório de Faturamento - {selectedMonths.length} mês(es) selecionado(s)
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Exportar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader className="bg-gray-50">
                          <TableRow>
                            <TableHead>Mês</TableHead>
                            <TableHead className="text-right">Faturamento</TableHead>
                            <TableHead className="text-right">Variação</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedMonths.sort().map((monthValue, index) => {
                            const month = months.find(m => m.value === monthValue);
                            const billing = billingData[monthValue];
                            const previousMonth = selectedMonths.sort()[index - 1];
                            const previousBilling = previousMonth ? billingData[previousMonth] : null;
                            const variation = previousBilling 
                              ? ((billing - previousBilling) / previousBilling * 100).toFixed(2)
                              : null;
                            
                            return (
                              <TableRow key={monthValue}>
                                <TableCell className="font-medium">{month?.label}</TableCell>
                                <TableCell className="text-right">{formatCurrency(billing)}</TableCell>
                                <TableCell className="text-right">
                                  {variation ? (
                                    <span className={parseFloat(variation) >= 0 ? 'text-green-600' : 'text-red-600'}>
                                      {parseFloat(variation) >= 0 ? '+' : ''}{variation}%
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          <TableRow className="bg-gray-50 font-semibold">
                            <TableCell>Total</TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(
                                selectedMonths.reduce((sum, month) => sum + billingData[month], 0)
                              )}
                            </TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border">
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600 mb-1">Faturamento Médio</p>
                          <p className="text-xl font-bold text-nfe-blue">
                            {formatCurrency(
                              selectedMonths.reduce((sum, month) => sum + billingData[month], 0) / selectedMonths.length
                            )}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border">
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600 mb-1">Maior Faturamento</p>
                          <p className="text-xl font-bold text-green-600">
                            {formatCurrency(
                              Math.max(...selectedMonths.map(month => billingData[month]))
                            )}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border">
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600 mb-1">Menor Faturamento</p>
                          <p className="text-xl font-bold text-orange-600">
                            {formatCurrency(
                              Math.min(...selectedMonths.map(month => billingData[month]))
                            )}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardFiscal;
