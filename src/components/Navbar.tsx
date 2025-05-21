
import { FileText, LayoutDashboard, Calculator, Receipt, BookOpen, Users, Monitor, BriefcaseIcon } from "lucide-react";
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
          <BriefcaseIcon className="h-6 w-6 text-nfe-royal" />
          <h1 className="text-lg font-semibold text-nfe-blue">Sistema Integrado</h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={getNavLinkClass("/")}>
                <div className="flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard Geral
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={path.includes("/contabil") ? "text-nfe-royal" : ""}>
                <div className="flex items-center gap-1">
                  <Calculator className="h-4 w-4" />
                  Contábil
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link 
                    to="/contabil" 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                  >
                    <Calculator className="h-4 w-4" />
                    Dashboard Contábil
                  </Link>
                  <Link 
                    to="/relatorios" 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                  >
                    <BookOpen className="h-4 w-4" />
                    Relatórios Contábeis
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={path.includes("/fiscal") || path.includes("/analise") ? "text-nfe-royal" : ""}>
                <div className="flex items-center gap-1">
                  <Receipt className="h-4 w-4" />
                  Fiscal
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link 
                    to="/fiscal" 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                  >
                    <Receipt className="h-4 w-4" />
                    Dashboard Fiscal
                  </Link>
                  <Link 
                    to="/analise" 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                  >
                    <FileText className="h-4 w-4" />
                    Análise de Notas
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dp" className={getNavLinkClass("/dp")}>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Departamento Pessoal
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/monitor" className={getNavLinkClass("/monitor")}>
                <div className="flex items-center gap-1">
                  <Monitor className="h-4 w-4" />
                  Monitor do Sistema
                </div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
