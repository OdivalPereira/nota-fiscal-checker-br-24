
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Table } from "lucide-react";

const MonitorSistema = () => {
  const [activeTab, setActiveTab] = useState("geral");

  return (
    <PageLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-nfe-blue">Monitor do Sistema</h1>
          
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
              <CardTitle className="text-sm font-medium text-nfe-slate">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-success">Online</div>
              <p className="text-xs text-nfe-slate mt-1">
                Uptime: 99,98% nos últimos 30 dias
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">CPU</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">24%</div>
              <p className="text-xs text-nfe-slate mt-1">
                Pico: 78% às 10:45
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-nfe-royal h-2.5 rounded-full"
                  style={{ width: "24%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Memória</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">41%</div>
              <p className="text-xs text-nfe-slate mt-1">
                8.2 GB / 20 GB usados
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-nfe-royal h-2.5 rounded-full"
                  style={{ width: "41%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">Armazenamento</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold text-nfe-blue">63%</div>
              <p className="text-xs text-nfe-slate mt-1">
                756 GB / 1.2 TB usados
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-nfe-royal h-2.5 rounded-full"
                  style={{ width: "63%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="logs">Logs do Sistema</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários Ativos</TabsTrigger>
            <TabsTrigger value="processos">Processos</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral" className="bg-white border rounded-lg p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-nfe-blue">Visão Geral do Sistema</h2>
              <p className="text-gray-700">
                Informações sobre o status e desempenho do sistema. Utilize as abas para acessar informações específicas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Uso de Recursos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <Table className="h-24 w-24 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Serviços Ativos</CardTitle>
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
          
          <TabsContent value="logs" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Logs do Sistema</h2>
            <p className="text-gray-700 mb-4">Registro de eventos e erros do sistema.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados dos Logs do Sistema</p>
            </div>
          </TabsContent>
          
          <TabsContent value="usuarios" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Usuários Ativos</h2>
            <p className="text-gray-700 mb-4">Lista de usuários conectados ao sistema.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados dos Usuários Ativos</p>
            </div>
          </TabsContent>
          
          <TabsContent value="processos" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Processos</h2>
            <p className="text-gray-700 mb-4">Processos em execução no sistema.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados dos Processos</p>
            </div>
          </TabsContent>
          
          <TabsContent value="backups" className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-nfe-blue">Backups</h2>
            <p className="text-gray-700 mb-4">Status dos backups do sistema.</p>
            <div className="h-96 border rounded flex items-center justify-center">
              <p className="text-gray-500">Dados dos Backups</p>
            </div>
          </TabsContent>
        </Tabs>
    </PageLayout>
  );
};

export default MonitorSistema;
