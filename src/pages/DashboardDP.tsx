
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Table } from "lucide-react";

const DashboardDP = () => {
  const [activeTab, setActiveTab] = useState("resumo");

  return (
    <PageLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-nfe-blue">Dashboard Departamento Pessoal</h1>
          
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
              <CardTitle className="text-sm font-medium text-nfe-slate">Total de Funcionários</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">87</div>
              <p className="text-xs text-nfe-slate mt-1">
                <span className="text-nfe-success">82 ativos</span> • 
                <span className="text-nfe-error ml-1">5 em férias</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Folha de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">R$ 412.756,42</div>
              <p className="text-xs text-nfe-slate mt-1">
                Média por funcionário: R$ 4.744,33
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Encargos Sociais</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">R$ 165.102,57</div>
              <p className="text-xs text-nfe-slate mt-1">
                FGTS: R$ 32.945,67 • INSS: R$ 132.156,90
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Provisões</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">R$ 82.551,28</div>
              <p className="text-xs text-nfe-slate mt-1">
                13º: R$ 34.396,37 • Férias: R$ 48.154,91
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="folha">Folha de Pagamento</TabsTrigger>
            <TabsTrigger value="ferias">Férias</TabsTrigger>
            <TabsTrigger value="beneficios">Benefícios</TabsTrigger>
            <TabsTrigger value="esocial">e-Social</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumo" className="bg-white border rounded-lg p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-nfe-blue">Resumo Departamento Pessoal</h2>
              <p className="text-gray-700">
                Visão geral dos dados do departamento pessoal do período atual. Utilize as abas para acessar relatórios específicos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Distribuição por Departamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <Table className="h-24 w-24 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Evolução da Folha</CardTitle>
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
          
          <TabsContent value="folha" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Folha de Pagamento</h2>
            <p className="text-gray-700 mb-4">Detalhamento da folha do mês atual.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados da Folha de Pagamento</p>
            </div>
          </TabsContent>
          
          <TabsContent value="ferias" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Férias</h2>
            <p className="text-gray-700 mb-4">Programação e controle de férias.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados de Férias</p>
            </div>
          </TabsContent>
          
          <TabsContent value="beneficios" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Benefícios</h2>
            <p className="text-gray-700 mb-4">Controle de benefícios concedidos.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados de Benefícios</p>
            </div>
          </TabsContent>
          
          <TabsContent value="esocial" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">e-Social</h2>
            <p className="text-gray-700 mb-4">Status de envios ao e-Social.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados do e-Social</p>
            </div>
          </TabsContent>
        </Tabs>
    </PageLayout>
  );
};

export default DashboardDP;
