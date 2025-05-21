
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileMinus, FilePlus, FileText } from "lucide-react";
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

interface NFECount {
  total: number;
  authorized: number;
  cancelled: number;
  denied: number;
}

interface FiscalSummaryProps {
  totalNFes: {
    system: NFECount;
    sped?: NFECount;
    efd?: NFECount;
    xml?: NFECount;
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

  const getComparisonColor = (value1: number, value2: number) => {
    if (value1 === value2) return "text-nfe-success";
    const diff = Math.abs((value1 - value2) / value2 * 100);
    if (diff <= 2) return "text-amber-500";
    return "text-nfe-error";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium text-nfe-slate">Total de NFes</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">
            {totalNFes.system.total}
          </div>
          <div className="text-xs text-nfe-slate mt-1">
            <div className="flex flex-col space-y-1">
              <div>
                <span className="font-semibold">Sistema: </span>
                <span className="text-nfe-success">{totalNFes.system.authorized} autorizadas</span> • 
                <span className="text-nfe-error ml-1">{totalNFes.system.cancelled} canceladas</span>
                {totalNFes.system.denied > 0 && (
                  <span className="text-nfe-warning ml-1">• {totalNFes.system.denied} denegadas</span>
                )}
              </div>
              
              {totalNFes.sped && (
                <div>
                  <span className="font-semibold">SPED: </span>
                  <span className={getComparisonColor(totalNFes.sped.authorized, totalNFes.system.authorized)}>
                    {totalNFes.sped.authorized} autorizadas
                  </span> • 
                  <span className={getComparisonColor(totalNFes.sped.cancelled, totalNFes.system.cancelled) + " ml-1"}>
                    {totalNFes.sped.cancelled} canceladas
                  </span>
                  {totalNFes.sped.denied > 0 && (
                    <span className={getComparisonColor(totalNFes.sped.denied, totalNFes.system.denied) + " ml-1"}>
                      • {totalNFes.sped.denied} denegadas
                    </span>
                  )}
                </div>
              )}
              
              {totalNFes.efd && (
                <div>
                  <span className="font-semibold">EFD: </span>
                  <span className={getComparisonColor(totalNFes.efd.authorized, totalNFes.system.authorized)}>
                    {totalNFes.efd.authorized} autorizadas
                  </span> • 
                  <span className={getComparisonColor(totalNFes.efd.cancelled, totalNFes.system.cancelled) + " ml-1"}>
                    {totalNFes.efd.cancelled} canceladas
                  </span>
                  {totalNFes.efd.denied > 0 && (
                    <span className={getComparisonColor(totalNFes.efd.denied, totalNFes.system.denied) + " ml-1"}>
                      • {totalNFes.efd.denied} denegadas
                    </span>
                  )}
                </div>
              )}
              
              {totalNFes.xml && (
                <div>
                  <span className="font-semibold">XML: </span>
                  <span className={getComparisonColor(totalNFes.xml.authorized, totalNFes.system.authorized)}>
                    {totalNFes.xml.authorized} autorizadas
                  </span> • 
                  <span className={getComparisonColor(totalNFes.xml.cancelled, totalNFes.system.cancelled) + " ml-1"}>
                    {totalNFes.xml.cancelled} canceladas
                  </span>
                  {totalNFes.xml.denied > 0 && (
                    <span className={getComparisonColor(totalNFes.xml.denied, totalNFes.system.denied) + " ml-1"}>
                      • {totalNFes.xml.denied} denegadas
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-nfe-slate">ICMS Total</CardTitle>
          <FileMinus className="h-4 w-4 text-nfe-slate" />
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">{formatCurrency(icms.system)}</div>
          <div className="flex flex-col text-xs mt-1 space-y-1">
            <div>
              <span className="font-semibold">Sistema: </span>
              <span className="text-nfe-slate">{formatCurrency(icms.system)}</span>
            </div>
            <div>
              <span className="font-semibold">SPED: </span>
              <span className={getComparisonColor(icms.sped, icms.system)}>
                {formatCurrency(icms.sped)}
              </span>
            </div>
            <div>
              <span className="font-semibold">EFD: </span>
              <span className={getComparisonColor(icms.efd, icms.system)}>
                {formatCurrency(icms.efd)}
              </span>
            </div>
            <div>
              <span className="font-semibold">XML: </span>
              <span className={getComparisonColor(icms.xml, icms.system)}>
                {formatCurrency(icms.xml)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-nfe-slate">PIS/COFINS</CardTitle>
          <FileText className="h-4 w-4 text-nfe-slate" />
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">{formatCurrency(pisCofins.system)}</div>
          <div className="flex flex-col text-xs mt-1 space-y-1">
            <div>
              <span className="font-semibold">Sistema: </span>
              <span className="text-nfe-slate">{formatCurrency(pisCofins.system)}</span>
            </div>
            <div>
              <span className="font-semibold">SPED: </span>
              <span className={getComparisonColor(pisCofins.sped, pisCofins.system)}>
                {formatCurrency(pisCofins.sped)}
              </span>
            </div>
            <div>
              <span className="font-semibold">EFD: </span>
              <span className={getComparisonColor(pisCofins.efd, pisCofins.system)}>
                {formatCurrency(pisCofins.efd)}
              </span>
            </div>
            <div>
              <span className="font-semibold">XML: </span>
              <span className={getComparisonColor(pisCofins.xml, pisCofins.system)}>
                {formatCurrency(pisCofins.xml)}
              </span>
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
          <div className="flex flex-col text-xs mt-1 space-y-1">
            <div>
              <span className="font-semibold">Sistema: </span>
              <span className="text-nfe-slate">{formatCurrency(ipi.system)}</span>
            </div>
            <div>
              <span className="font-semibold">SPED: </span>
              <span className={getComparisonColor(ipi.sped, ipi.system)}>
                {formatCurrency(ipi.sped)}
              </span>
            </div>
            <div>
              <span className="font-semibold">EFD: </span>
              <span className={getComparisonColor(ipi.efd, ipi.system)}>
                {formatCurrency(ipi.efd)}
              </span>
            </div>
            <div>
              <span className="font-semibold">XML: </span>
              <span className={getComparisonColor(ipi.xml, ipi.system)}>
                {formatCurrency(ipi.xml)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
