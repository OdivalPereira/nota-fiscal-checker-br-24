
import { FileCheck, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (routePath: string) => {
    return path === routePath;
  };

  const getNavLinkClass = (routePath: string) => {
    return `text-sm font-medium ${
      isActive(routePath)
        ? "text-nfe-royal"
        : "text-nfe-slate hover:text-nfe-blue"
    }`;
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-nfe-royal" />
          <h1 className="text-lg font-semibold text-nfe-blue">Sistema Integrado</h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={getNavLinkClass("/")}>
                Dashboard Geral
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={path.includes("/contabil") ? "text-nfe-royal" : ""}>
                Contábil
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link 
                    to="/contabil" 
                    className="block p-2 hover:bg-gray-50 rounded-md"
                  >
                    Dashboard Contábil
                  </Link>
                  <Link 
                    to="/relatorios" 
                    className="block p-2 hover:bg-gray-50 rounded-md"
                  >
                    Relatórios Contábeis
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={path.includes("/fiscal") || path.includes("/analise") ? "text-nfe-royal" : ""}>
                Fiscal
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link 
                    to="/fiscal" 
                    className="block p-2 hover:bg-gray-50 rounded-md"
                  >
                    Dashboard Fiscal
                  </Link>
                  <Link 
                    to="/analise" 
                    className="block p-2 hover:bg-gray-50 rounded-md"
                  >
                    Análise de Notas
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dp" className={getNavLinkClass("/dp")}>
                Departamento Pessoal
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/monitor" className={getNavLinkClass("/monitor")}>
                Monitor do Sistema
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
