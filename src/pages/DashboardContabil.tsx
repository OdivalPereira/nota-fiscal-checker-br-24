
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Table } from "lucide-react";

interface Empresa {
  id: string;
  nome: string;
}

interface DemonstrativoConta {
  codigo: string;
  valor: number;
}

interface Demonstrativo {
  contas: DemonstrativoConta[];
  lucro_liquido: number;
  irpj: number;
  csll: number;
}

const DashboardContabil = () => {
  const [activeTab, setActiveTab] = useState("resumo");
  const [loading, setLoading] = useState(true);
  const [demonstrativo, setDemonstrativo] = useState<Demonstrativo | null>(null);
  const [empresaId, setEmpresaId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/empresas");
        if (response.ok) {
          const data: Empresa[] = await response.json();
          if (data.length > 0) {
            setEmpresaId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };
    fetchEmpresa();
  }, []);

  useEffect(() => {
    if (!empresaId) return;

    const fetchDemonstrativo = async () => {
      try {
        // Hardcoded period for now, ideally should be selectable
        const response = await fetch(`http://localhost:8000/api/v1/empresas/${empresaId}/demonstrativo?periodo=2023-Q1`);
        if (response.ok) {
          const data: Demonstrativo = await response.json();
          setDemonstrativo(data);
        }
      } catch (error) {
        console.error("Erro ao buscar demonstrativo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDemonstrativo();
  }, [empresaId]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const totalCreditos = demonstrativo?.contas.reduce((acc, curr) => curr.valor > 0 ? acc + curr.valor : acc, 0) || 0;
  const totalDebitos = demonstrativo?.contas.reduce((acc, curr) => curr.valor < 0 ? acc + Math.abs(curr.valor) : acc, 0) || 0;

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
            <CardTitle className="text-sm font-medium text-nfe-slate">Total de Contas</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold text-nfe-blue">{demonstrativo?.contas.length || 0}</div>
            <p className="text-xs text-nfe-slate mt-1">
              <span className="text-nfe-success">Contas movimentadas</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-nfe-slate">Total de Entradas</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold text-nfe-blue">{formatCurrency(totalCreditos)}</div>
            <p className="text-xs text-nfe-slate mt-1">
              Receitas e outros créditos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-nfe-slate">Total de Saídas</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold text-nfe-blue">{formatCurrency(totalDebitos)}</div>
            <p className="text-xs text-nfe-slate mt-1">
              Despesas e custos
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
              Visão geral dos dados contábeis do período atual.
            </p>

            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Lucro Líquido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{formatCurrency(demonstrativo?.lucro_liquido || 0)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">IRPJ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{formatCurrency(demonstrativo?.irpj || 0)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">CSLL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{formatCurrency(demonstrativo?.csll || 0)}</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Other tabs kept as placeholders for now */}
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
