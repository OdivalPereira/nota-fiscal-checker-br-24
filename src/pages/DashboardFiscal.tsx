
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Table } from "lucide-react";

const DashboardFiscal = () => {
  const [activeTab, setActiveTab] = useState("resumo");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-nfe-blue">Dashboard Fiscal</h1>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Total de NFes</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">847</div>
              <p className="text-xs text-nfe-slate mt-1">
                <span className="text-nfe-success">792 autorizadas</span> • 
                <span className="text-nfe-error ml-1">55 canceladas</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">ICMS Total</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">R$ 127.832,65</div>
              <p className="text-xs text-nfe-slate mt-1">
                Base de cálculo: R$ 752.425,36
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">PIS/COFINS</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">R$ 62.475,92</div>
              <p className="text-xs text-nfe-slate mt-1">
                Base de cálculo: R$ 798.156,92
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">IPI</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">R$ 43.125,47</div>
              <p className="text-xs text-nfe-slate mt-1">
                Base de cálculo: R$ 431.254,70
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="sped">SPED Fiscal</TabsTrigger>
            <TabsTrigger value="efd">EFD-Contribuições</TabsTrigger>
            <TabsTrigger value="ciap">CIAP</TabsTrigger>
            <TabsTrigger value="obrigacoes">Obrigações Acessórias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumo" className="bg-white border rounded-lg p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-nfe-blue">Resumo Fiscal</h2>
              <p className="text-gray-700">
                Visão geral dos dados fiscais do período atual. Utilize as abas para acessar relatórios específicos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Impostos por CFOP</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <Table className="h-24 w-24 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Evolução de Créditos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <Table className="h-24 w-24 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sped" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">SPED Fiscal</h2>
            <p className="text-gray-700 mb-4">Análise dos registros do SPED Fiscal.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados do SPED Fiscal</p>
            </div>
          </TabsContent>
          
          <TabsContent value="efd" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">EFD-Contribuições</h2>
            <p className="text-gray-700 mb-4">Análise dos registros de PIS/COFINS.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados de EFD-Contribuições</p>
            </div>
          </TabsContent>
          
          <TabsContent value="ciap" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">CIAP</h2>
            <p className="text-gray-700 mb-4">Controle de crédito de ICMS do Ativo Permanente.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados do CIAP</p>
            </div>
          </TabsContent>
          
          <TabsContent value="obrigacoes" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Obrigações Acessórias</h2>
            <p className="text-gray-700 mb-4">Status de entrega das obrigações fiscais.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados das Obrigações Acessórias</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sistema Integrado • Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
};

export default DashboardFiscal;
