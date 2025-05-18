
import { NFe, ReportType, reportLabels } from "@/types/nfe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/services/nfeService";

interface NFESummaryProps {
  nfes: NFe[];
}

export const NFESummary = ({ nfes }: NFESummaryProps) => {
  // Calculate summary statistics
  const totalNFEs = nfes.length;
  const totalValue = nfes.reduce((sum, nfe) => sum + nfe.valor, 0);
  
  const authorizedNFEs = nfes.filter(nfe => nfe.status === "Autorizada").length;
  const cancelledNFEs = nfes.filter(nfe => nfe.status === "Cancelada").length;
  const deniedNFEs = nfes.filter(nfe => nfe.status === "Denegada").length;

  // Calculate report statistics
  const reportStats = Object.keys(reportLabels).reduce((acc, report) => {
    const reportType = report as ReportType;
    const includedCount = nfes.filter(nfe => nfe.relatorios[reportType]).length;
    const missingCount = nfes.length - includedCount;
    
    return {
      ...acc,
      [reportType]: {
        included: includedCount,
        missing: missingCount,
        percentage: totalNFEs > 0 ? Math.round((includedCount / totalNFEs) * 100) : 0
      }
    };
  }, {} as Record<ReportType, { included: number; missing: number; percentage: number }>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium text-nfe-slate">Total de Notas Fiscais</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">{totalNFEs}</div>
          <p className="text-xs text-nfe-slate mt-1">
            <span className="text-nfe-success">{authorizedNFEs} autorizadas</span> • 
            <span className="text-nfe-error ml-1">{cancelledNFEs} canceladas</span> • 
            <span className="text-nfe-warning ml-1">{deniedNFEs} denegadas</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium text-nfe-slate">Valor Total</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-2xl font-bold text-nfe-blue">{formatCurrency(totalValue)}</div>
          <p className="text-xs text-nfe-slate mt-1">
            Média por nota: {formatCurrency(totalNFEs > 0 ? totalValue / totalNFEs : 0)}
          </p>
        </CardContent>
      </Card>

      {Object.keys(reportLabels).slice(0, 2).map((report) => {
        const reportType = report as ReportType;
        const stats = reportStats[reportType];
        
        return (
          <Card key={report}>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-nfe-slate">
                {reportLabels[reportType]}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-nfe-blue">{stats.percentage}%</div>
                <div className="text-sm text-nfe-slate">
                  <span className="text-nfe-success">{stats.included} incluídas</span>
                  <span className="mx-1">•</span>
                  <span className="text-nfe-error">{stats.missing} ausentes</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-nfe-royal h-2.5 rounded-full"
                  style={{ width: `${stats.percentage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
