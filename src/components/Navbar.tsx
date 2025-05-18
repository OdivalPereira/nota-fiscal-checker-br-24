
import { FileCheck } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileCheck className="h-6 w-6 text-nfe-royal" />
          <h1 className="text-lg font-semibold text-nfe-blue">Análise de NF-e</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-sm font-medium text-nfe-slate hover:text-nfe-blue">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium text-nfe-royal">
                Análise de Notas
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium text-nfe-slate hover:text-nfe-blue">
                Relatórios
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium text-nfe-slate hover:text-nfe-blue">
                Configurações
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
