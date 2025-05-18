
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck } from "lucide-react";
import { toast } from "sonner";

export const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    // In a real app, we would process the uploaded file here
    // For this demo, we'll just show a toast notification
    toast.success("Arquivo recebido! Em uma implementação real, os dados seriam processados.", {
      description: "Esta é apenas uma demonstração, nenhum arquivo foi processado.",
      duration: 5000,
    });
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, we would process the uploaded file here
    // For this demo, we'll just show a toast notification
    toast.success("Arquivo selecionado! Em uma implementação real, os dados seriam processados.", {
      description: "Esta é apenas uma demonstração, nenhum arquivo foi processado.",
      duration: 5000,
    });
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-nfe-royal bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileCheck className="mx-auto h-12 w-12 text-nfe-slate" />
          <h3 className="mt-2 text-lg font-semibold">Carregar arquivo XML de NF-e</h3>
          <p className="mt-1 text-sm text-gray-500">
            Arraste e solte arquivos XML de NF-e aqui ou clique para selecionar arquivos
          </p>
          <div className="mt-4">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".xml"
              onChange={handleFileInput}
              multiple
            />
            <label htmlFor="file-upload">
              <Button
                type="button"
                className="bg-nfe-royal hover:bg-nfe-blue text-white"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Selecionar arquivos
              </Button>
            </label>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Formatos suportados: XML de NF-e (modelo 55)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
