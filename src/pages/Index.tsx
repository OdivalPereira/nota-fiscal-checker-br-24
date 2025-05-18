
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { NFETable } from "@/components/NFETable";
import { NFESummary } from "@/components/NFESummary";
import { FileUpload } from "@/components/FileUpload";
import { fetchNFes } from "@/services/nfeService";
import { NFe } from "@/types/nfe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [nfes, setNfes] = useState<NFe[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-nfe-blue mb-6">Dashboard de Análise de NF-e</h1>
        
        <Tabs defaultValue="analise">
          <TabsList className="mb-6 bg-white">
            <TabsTrigger value="analise">Análise de Documentos</TabsTrigger>
            <TabsTrigger value="upload">Upload de Arquivos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analise" className="space-y-6">
            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-nfe-royal border-r-transparent"></div>
                <p className="mt-2 text-nfe-slate">Carregando dados...</p>
              </div>
            ) : (
              <>
                <NFESummary nfes={nfes} />
                <NFETable nfes={nfes} />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="upload">
            <FileUpload />
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="text-lg font-semibold text-nfe-blue mb-4">Instruções de Upload</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Os arquivos devem estar no formato XML padrão da NF-e (modelo 55)</li>
                <li>É possível carregar múltiplos arquivos simultaneamente</li>
                <li>O sistema analisará automaticamente os documentos após o upload</li>
                <li>O tamanho máximo por arquivo é de 5MB</li>
                <li>Certifique-se que os arquivos estão assinados digitalmente</li>
              </ul>
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

export default Index;
