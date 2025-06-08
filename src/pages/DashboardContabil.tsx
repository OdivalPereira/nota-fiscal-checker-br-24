
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Table } from "lucide-react";

const DashboardContabil = () => {
  const [activeTab, setActiveTab] = useState("resumo");

  return (
    <PageLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-nfe-blue">Dashboard Contábil</h1>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Total de Lançamentos</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">1.254</div>
              <p className="text-xs text-nfe-slate mt-1">
                <span className="text-nfe-success">986 ativos</span> • 
                <span className="text-nfe-error ml-1">268 pendentes</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Valor Total de Débitos</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">R$ 752.425,36</div>
              <p className="text-xs text-nfe-slate mt-1">
                Último lançamento: 19/05/2025
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Valor Total de Créditos</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">R$ 798.156,92</div>
              <p className="text-xs text-nfe-slate mt-1">
                Último lançamento: 19/05/2025
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="balanco">Balanço Patrimonial</TabsTrigger>
            <TabsTrigger value="dre">DRE</TabsTrigger>
            <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
            <TabsTrigger value="conciliacao">Conciliação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumo" className="bg-white border rounded-lg p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-nfe-blue">Resumo Contábil</h2>
              <p className="text-gray-700">
                Visão geral dos dados contábeis do período atual. Utilize as abas para acessar relatórios específicos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Situação dos Lançamentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <Table className="h-24 w-24 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Evolução Mensal</CardTitle>
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
          
          <TabsContent value="balanco" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Balanço Patrimonial</h2>
            <p className="text-gray-700 mb-4">Relatório de balanço patrimonial completo.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados do Balanço Patrimonial</p>
            </div>
          </TabsContent>
          
          <TabsContent value="dre" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Demonstração de Resultado</h2>
            <p className="text-gray-700 mb-4">Análise de receitas, custos e despesas.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados da DRE</p>
            </div>
          </TabsContent>

          <TabsContent value="fluxo" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Fluxo de Caixa</h2>
            <p className="text-gray-700 mb-4">Análise de entradas e saídas financeiras.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados do Fluxo de Caixa</p>
            </div>
          </TabsContent>

          <TabsContent value="conciliacao" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Conciliação Contábil</h2>
            <p className="text-gray-700 mb-4">Status de conciliação por conta contábil.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados da Conciliação</p>
            </div>
          </TabsContent>
        </Tabs>
    </PageLayout>
  );
};

export default DashboardContabil;
