import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, DollarSign, CheckCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    // Simular login bem-sucedido
    localStorage.setItem('servicepro_user', JSON.stringify({
      id: '1',
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      tipo_servico: 'Eletricista'
    }));
    console.log('Navigating to dashboard'); // Debug log
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">ServicePro</span>
        </div>
        <Button variant="outline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Criar Conta' : 'Entrar'}
        </Button>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Marketing */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Gerencie seu negócio de serviços com
                <span className="text-blue-600"> simplicidade</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Agenda, clientes, orçamentos e pagamentos em uma única plataforma.
                Ideal para eletricistas, manicures, consultores e outros prestadores de serviços.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">Agenda Inteligente</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">Gestão de Clientes</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">Controle Financeiro</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">Orçamentos Digitais</span>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">💳 Plano Único</h3>
              <p className="text-gray-600">R$ 39/mês - até 200 agendamentos</p>
              <p className="text-sm text-blue-600 font-medium">7 dias grátis para testar</p>
            </div>
          </div>

          {/* Right Side - Login/Register Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>{isLogin ? 'Entrar' : 'Criar Conta'}</CardTitle>
                <CardDescription>
                  {isLogin 
                    ? 'Acesse sua conta ServicePro' 
                    : 'Comece seu teste gratuito de 7 dias'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuth} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input id="nome" placeholder="Seu nome" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipo_servico">Tipo de serviço</Label>
                        <Input id="tipo_servico" placeholder="Ex: Eletricista, Manicure..." required />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    {isLogin ? 'Entrar' : 'Começar Teste Grátis'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
