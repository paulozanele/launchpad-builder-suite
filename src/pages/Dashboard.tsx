import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Clock, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('servicepro_user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  // Mock data
  const stats = {
    proximosAgendamentos: 5,
    faturamentoMes: 3450,
    clientesAtivos: 23,
    agendamentosHoje: 3
  };

  const proximosAgendamentos = [
    { id: 1, cliente: "Maria Silva", servico: "Instalação elétrica", horario: "14:00", data: "Hoje" },
    { id: 2, cliente: "João Santos", servico: "Manutenção", horario: "16:30", data: "Hoje" },
    { id: 3, cliente: "Ana Costa", servico: "Orçamento", horario: "09:00", data: "Amanhã" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo, {user.nome}!</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.agendamentosHoje}</div>
              <p className="text-xs text-muted-foreground">+2 em relação a ontem</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento do Mês</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.faturamentoMes.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clientesAtivos}</div>
              <p className="text-xs text-muted-foreground">+3 novos este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximos Agendamentos</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.proximosAgendamentos}</div>
              <p className="text-xs text-muted-foreground">Nos próximos 7 dias</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
              <CardDescription>Seus compromissos para hoje e amanhã</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {proximosAgendamentos.map((agendamento) => (
                <div key={agendamento.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{agendamento.cliente}</p>
                    <p className="text-sm text-gray-600">{agendamento.servico}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{agendamento.horario}</p>
                    <p className="text-sm text-gray-600">{agendamento.data}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate('/agenda')}>
                Ver Agenda Completa
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Performance deste mês</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Faturamento</span>
                <span className="font-bold text-green-600">R$ 3.450,00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pendente</span>
                <span className="font-bold text-orange-600">R$ 890,00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Meta do Mês</span>
                <span className="font-bold text-blue-600">R$ 5.000,00</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '69%' }}></div>
              </div>
              <p className="text-sm text-gray-600">69% da meta atingida</p>
              <Button variant="outline" className="w-full" onClick={() => navigate('/pagamentos')}>
                Ver Detalhes Financeiros
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;