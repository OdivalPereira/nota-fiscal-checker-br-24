
import { FileCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

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
              <Link 
                to="/" 
                className={`text-sm font-medium ${path === "/" ? "text-nfe-royal" : "text-nfe-slate hover:text-nfe-blue"}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/analise" 
                className={`text-sm font-medium ${path === "/analise" ? "text-nfe-royal" : "text-nfe-slate hover:text-nfe-blue"}`}
              >
                Análise de Notas
              </Link>
            </li>
            <li>
              <Link
                to="/relatorios" 
                className={`text-sm font-medium ${path === "/relatorios" ? "text-nfe-royal" : "text-nfe-slate hover:text-nfe-blue"}`}
              >
                Relatórios
              </Link>
            </li>
            <li>
              <Link
                to="/configuracoes" 
                className={`text-sm font-medium ${path === "/configuracoes" ? "text-nfe-royal" : "text-nfe-slate hover:text-nfe-blue"}`}
              >
                Configurações
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
