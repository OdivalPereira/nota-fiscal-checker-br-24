
import { Link, useLocation } from "react-router-dom";
import {
  FileText,
  LayoutDashboard,
  Users,
  Monitor,
  BanknoteIcon,
} from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const location = useLocation();
  const path = location.pathname;

  const menuItems = [
    { 
      path: "/", 
      label: "Dashboard Geral", 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      path: "/fiscal", 
      label: "Dashboard Fiscal", 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      path: "/contabil", 
      label: "Dashboard Contábil", 
      icon: <BanknoteIcon className="w-5 h-5" /> 
    },
    { 
      path: "/dp", 
      label: "Departamento Pessoal", 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      path: "/monitor", 
      label: "Monitor do Sistema", 
      icon: <Monitor className="w-5 h-5" /> 
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarComponent>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <LayoutDashboard className="h-6 w-6 text-nfe-royal" />
              <h1 className="text-lg font-semibold text-nfe-blue">Sistema Integrado</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={path === item.path}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarComponent>
        
        <div className="flex flex-1 flex-col">
          <div className="flex items-center h-16 px-6 border-b">
            <SidebarTrigger />
            <span className="ml-4 text-lg font-medium">Sistema Integrado</span>
          </div>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
