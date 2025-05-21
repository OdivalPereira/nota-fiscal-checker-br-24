
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileMinus, FilePlus } from "lucide-react";
import { formatCurrency } from "@/services/nfeService";

interface TaxSummary {
  system: number;
  sped: number;
  efd: number;
  xml: number;
  percentage?: {
    spedVsSystem: number;
    efdVsSystem: number;
    xmlVsSystem: number;
  };
}

interface FiscalSummaryProps {
  totalNFes: {
    total: number;
    authorized: number;
    cancelled: number;
    denied: number;
  };
  icms: TaxSummary;
  pisCofins: TaxSummary;
  ipi: TaxSummary;
  isLoading?: boolean;
}

export const FiscalSummary = ({ 
  totalNFes, 
  icms, 
  pisCofins, 
  ipi, 
  isLoading = false 
}: FiscalSummaryProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="py-4">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent className="py-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getComparisonColor = (percentage: number) => {
    if (percentage >= 98) return "text-nfe-success";
    if (percentage >= 90) return "text-amber-500";
    return "text-nfe-error";
  };

  const renderComparisonText = (source: string, percentage?: number) => {
    if (percentage === undefined) return null;
    
    const color = getComparisonColor(percentage);
    
    return (
      <span className={color}>
        {source}: {percentage}%
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium text-nfe-slate">Total de NFes</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">{totalNFes.total}</div>
          <p className="text-xs text-nfe-slate mt-1">
            <span className="text-nfe-success">{totalNFes.authorized} autorizadas</span> • 
            <span className="text-nfe-error ml-1">{totalNFes.cancelled} canceladas</span>
            {totalNFes.denied > 0 && (
              <span className="text-nfe-warning ml-1">• {totalNFes.denied} denegadas</span>
            )}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-nfe-slate">ICMS Total</CardTitle>
          <FileMinus className="h-4 w-4 text-nfe-slate" />
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">{formatCurrency(icms.system)}</div>
          <div className="flex flex-col text-xs mt-1">
            <p className="text-nfe-slate">Sistema: {formatCurrency(icms.system)}</p>
            <div className="flex flex-wrap gap-x-2">
              {renderComparisonText("SPED", icms.percentage?.spedVsSystem)}
              {renderComparisonText("EFD", icms.percentage?.efdVsSystem)}
              {renderComparisonText("XML", icms.percentage?.xmlVsSystem)}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-nfe-slate">PIS/COFINS</CardTitle>
          <FileMinus className="h-4 w-4 text-nfe-slate" />
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">{formatCurrency(pisCofins.system)}</div>
          <div className="flex flex-col text-xs mt-1">
            <p className="text-nfe-slate">Sistema: {formatCurrency(pisCofins.system)}</p>
            <div className="flex flex-wrap gap-x-2">
              {renderComparisonText("SPED", pisCofins.percentage?.spedVsSystem)}
              {renderComparisonText("EFD", pisCofins.percentage?.efdVsSystem)}
              {renderComparisonText("XML", pisCofins.percentage?.xmlVsSystem)}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-nfe-slate">IPI</CardTitle>
          <FilePlus className="h-4 w-4 text-nfe-slate" />
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">{formatCurrency(ipi.system)}</div>
          <div className="flex flex-col text-xs mt-1">
            <p className="text-nfe-slate">Sistema: {formatCurrency(ipi.system)}</p>
            <div className="flex flex-wrap gap-x-2">
              {renderComparisonText("SPED", ipi.percentage?.spedVsSystem)}
              {renderComparisonText("EFD", ipi.percentage?.efdVsSystem)}
              {renderComparisonText("XML", ipi.percentage?.xmlVsSystem)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
