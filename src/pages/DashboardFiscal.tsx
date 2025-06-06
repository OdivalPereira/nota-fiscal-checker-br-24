
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  PieChart 
} from "lucide-react";
import { NFETable } from "@/components/NFETable";
import { fetchNFes } from "@/services/nfeService";
import { FiscalSummary } from "@/components/FiscalSummary";

const DashboardFiscal = () => {
  const [activeTab, setActiveTab] = useState("resumo");
  
  const { data: nfes, isLoading } = useQuery({
    queryKey: ["nfes"],
    queryFn: fetchNFes,
  });

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
      </Tabs>
    </div>
  );
};

export default DashboardFiscal;
