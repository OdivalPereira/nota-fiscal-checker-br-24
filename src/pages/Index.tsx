
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Table } from "lucide-react";
import { fetchNFes } from "@/services/nfeService";
import { NFe } from "@/types/nfe";

const Index = () => {
  const [nfes, setNfes] = useState<NFe[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("resumo");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchNFes();
        setNfes(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-nfe-blue">Dashboard Geral</h1>

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
            <CardTitle className="text-sm font-medium text-nfe-slate">Contábil</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold text-nfe-blue">1.254</div>
            <p className="text-xs text-nfe-slate mt-1">
              <span className="text-nfe-success">986 ativos</span> •
              <span className="text-nfe-error ml-1">268 pendentes</span>
            </p>
            <Button variant="link" size="sm" className="mt-2 p-0" asChild>
              <a href="/contabil">Ver dashboard</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-nfe-slate">Fiscal</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold text-nfe-blue">{nfes.length}</div>
            <p className="text-xs text-nfe-slate mt-1">
              <span className="text-nfe-success">{nfes.filter(n => n.status === 'Autorizada').length} autorizadas</span> •
              <span className="text-nfe-error ml-1">{nfes.filter(n => n.status === 'Cancelada').length} canceladas</span>
            </p>
            <Button variant="link" size="sm" className="mt-2 p-0" asChild>
              <a href="/fiscal">Ver dashboard</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-nfe-slate">Departamento Pessoal</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold text-nfe-blue">87</div>
            <p className="text-xs text-nfe-slate mt-1">
              <span className="text-nfe-success">82 ativos</span> •
              <span className="text-nfe-error ml-1">5 em férias</span>
            </p>
            <Button variant="link" size="sm" className="mt-2 p-0" asChild>
              <a href="/dp">Ver dashboard</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-nfe-slate">Sistema</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold text-nfe-success">Online</div>
            <p className="text-xs text-nfe-slate mt-1">
              Uptime: 99,98% nos últimos 30 dias
            </p>
            <Button variant="link" size="sm" className="mt-2 p-0" asChild>
              <a href="/monitor">Ver monitor</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
          <TabsTrigger value="contabil">Contábil</TabsTrigger>
          <TabsTrigger value="dp">Departamento Pessoal</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="bg-white border rounded-lg p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-nfe-blue">Resumo Geral</h2>
            <p className="text-gray-700">
              Visão consolidada de todas as áreas do sistema. Utilize as abas para acessar visões específicas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Indicadores Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <Table className="h-24 w-24 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Desempenho por Área</CardTitle>
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

        <TabsContent value="fiscal" className="bg-white border rounded-lg p-6">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-nfe-royal border-r-transparent"></div>
              <p className="mt-2 text-nfe-slate">Carregando dados...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-nfe-blue">Visão Geral Fiscal</h2>
              <p className="text-gray-700 mb-4">Resumo das principais informações fiscais.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">NFes por Status</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Autorizadas</span>
                        <span className="text-sm font-medium">{nfes.filter(nfe => nfe.status === "Autorizada").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Canceladas</span>
                        <span className="text-sm font-medium">{nfes.filter(nfe => nfe.status === "Cancelada").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Denegadas</span>
                        <span className="text-sm font-medium">{nfes.filter(nfe => nfe.status === "Denegada").length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="contabil" className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-nfe-blue">Visão Geral Contábil</h2>
          <p className="text-gray-700 mb-4">Resumo das principais informações contábeis.</p>
          <div className="h-64 border rounded flex items-center justify-center">
            <p className="text-gray-500">Dados Contábeis Resumidos</p>
          </div>
        </TabsContent>

        <TabsContent value="dp" className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-nfe-blue">Visão Geral Departamento Pessoal</h2>
          <p className="text-gray-700 mb-4">Resumo das principais informações de departamento pessoal.</p>
          <div className="h-64 border rounded flex items-center justify-center">
            <p className="text-gray-500">Dados Resumidos de Departamento Pessoal</p>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Index;
