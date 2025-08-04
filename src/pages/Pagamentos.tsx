import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, DollarSign, CreditCard, Smartphone, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Layout } from "@/components/Layout";

const Pagamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data para pagamentos
  const pagamentos = [
    {
      id: 1,
      cliente: "Maria Silva",
      descricao: "Instalação elétrica completa",
      valor: 1500,
      metodo: "cartao",
      status: "pago",
      dataPagamento: "2024-01-10",
      dataVencimento: "2024-01-10",
      observacoes: "Pagamento via Stripe"
    },
    {
      id: 2,
      cliente: "João Santos",
      descricao: "Manutenção preventiva",
      valor: 450,
      metodo: "pix",
      status: "pago",
      dataPagamento: "2024-01-08",
      dataVencimento: "2024-01-08",
      observacoes: "PIX instantâneo"
    },
    {
      id: 3,
      cliente: "Ana Costa",
      descricao: "Consulta técnica",
      valor: 200,
      metodo: "cartao",
      status: "pendente",
      dataPagamento: null,
      dataVencimento: "2024-01-20",
      observacoes: "Aguardando aprovação do orçamento"
    },
    {
      id: 4,
      cliente: "Carlos Oliveira",
      descricao: "Reparo de tomadas",
      valor: 150,
      metodo: "dinheiro",
      status: "atrasado",
      dataPagamento: null,
      dataVencimento: "2024-01-05",
      observacoes: "Cliente solicitou extensão do prazo"
    }
  ];

  const handleNovoRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    // Aqui adicionaria o novo registro ao estado
  };

  const filteredPagamentos = pagamentos.filter(pagamento =>
    pagamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pagamento.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'atrasado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pago':
        return <CheckCircle className="h-4 w-4" />;
      case 'pendente':
        return <Clock className="h-4 w-4" />;
      case 'atrasado':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getMetodoIcon = (metodo: string) => {
    switch (metodo) {
      case 'cartao':
        return <CreditCard className="h-4 w-4" />;
      case 'pix':
        return <Smartphone className="h-4 w-4" />;
      case 'dinheiro':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getMetodoLabel = (metodo: string) => {
    switch (metodo) {
      case 'cartao':
        return 'Cartão';
      case 'pix':
        return 'PIX';
      case 'dinheiro':
        return 'Dinheiro';
      default:
        return metodo;
    }
  };

  const totalRecebido = pagamentos.filter(p => p.status === 'pago').reduce((total, p) => total + p.valor, 0);
  const totalPendente = pagamentos.filter(p => p.status === 'pendente').reduce((total, p) => total + p.valor, 0);
  const totalAtrasado = pagamentos.filter(p => p.status === 'atrasado').reduce((total, p) => total + p.valor, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pagamentos</h1>
            <p className="text-gray-600">Controle seus recebimentos e pendências</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Pagamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Pagamento</DialogTitle>
                <DialogDescription>
                  Registre um novo pagamento recebido
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNovoRegistro} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maria">Maria Silva</SelectItem>
                      <SelectItem value="joao">João Santos</SelectItem>
                      <SelectItem value="ana">Ana Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição do Serviço</Label>
                  <Input id="descricao" placeholder="Descrição do serviço" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor (R$)</Label>
                    <Input id="valor" type="number" step="0.01" placeholder="0,00" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metodo">Método de Pagamento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data_pagamento">Data do Pagamento</Label>
                    <Input id="data_pagamento" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pago">Pago</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Registrar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Recebido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                R$ {totalRecebido.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                R$ {totalPendente.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Em Atraso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                R$ {totalAtrasado.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                R$ {(totalRecebido + totalPendente + totalAtrasado).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por cliente ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuração do Stripe e PIX */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Integração Stripe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Configure sua conta Stripe para receber pagamentos via cartão</p>
              <div className="space-y-2">
                <Label htmlFor="stripe_key">Chave Pública do Stripe</Label>
                <Input id="stripe_key" placeholder="pk_test_..." />
              </div>
              <Button className="w-full">Conectar Stripe</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuração PIX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Adicione seus dados PIX para recebimentos instantâneos</p>
              <div className="space-y-2">
                <Label htmlFor="pix_key">Chave PIX</Label>
                <Input id="pix_key" placeholder="seu@email.com ou CPF/CNPJ" />
              </div>
              <Button className="w-full">Salvar PIX</Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes status */}
        <Tabs defaultValue="todos" className="w-full">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="pago">Recebidos</TabsTrigger>
            <TabsTrigger value="pendente">Pendentes</TabsTrigger>
            <TabsTrigger value="atrasado">Em Atraso</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-4">
            <PagamentosList pagamentos={filteredPagamentos} />
          </TabsContent>
          <TabsContent value="pago" className="space-y-4">
            <PagamentosList pagamentos={filteredPagamentos.filter(p => p.status === 'pago')} />
          </TabsContent>
          <TabsContent value="pendente" className="space-y-4">
            <PagamentosList pagamentos={filteredPagamentos.filter(p => p.status === 'pendente')} />
          </TabsContent>
          <TabsContent value="atrasado" className="space-y-4">
            <PagamentosList pagamentos={filteredPagamentos.filter(p => p.status === 'atrasado')} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const PagamentosList = ({ pagamentos }: { pagamentos: any[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'atrasado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pago':
        return <CheckCircle className="h-4 w-4" />;
      case 'pendente':
        return <Clock className="h-4 w-4" />;
      case 'atrasado':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getMetodoIcon = (metodo: string) => {
    switch (metodo) {
      case 'cartao':
        return <CreditCard className="h-4 w-4" />;
      case 'pix':
        return <Smartphone className="h-4 w-4" />;
      case 'dinheiro':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getMetodoLabel = (metodo: string) => {
    switch (metodo) {
      case 'cartao':
        return 'Cartão';
      case 'pix':
        return 'PIX';
      case 'dinheiro':
        return 'Dinheiro';
      default:
        return metodo;
    }
  };

  return (
    <div className="grid gap-4">
      {pagamentos.map((pagamento) => (
        <Card key={pagamento.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{pagamento.cliente}</h3>
                <p className="text-gray-600">{pagamento.descricao}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  R$ {pagamento.valor.toLocaleString()}
                </div>
                <Badge className={getStatusColor(pagamento.status)}>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(pagamento.status)}
                    <span>{pagamento.status.charAt(0).toUpperCase() + pagamento.status.slice(1)}</span>
                  </span>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                {getMetodoIcon(pagamento.metodo)}
                <span className="text-gray-700">{getMetodoLabel(pagamento.metodo)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Vencimento: {pagamento.dataVencimento}</span>
              </div>
              {pagamento.dataPagamento && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Pago em: {pagamento.dataPagamento}</span>
                </div>
              )}
            </div>

            {pagamento.observacoes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm">{pagamento.observacoes}</p>
              </div>
            )}

            <div className="mt-4 flex justify-end space-x-2">
              {pagamento.status === 'pendente' && (
                <>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Marcar como Pago
                  </Button>
                  <Button variant="outline" size="sm">
                    Enviar Cobrança
                  </Button>
                </>
              )}
              {pagamento.status === 'atrasado' && (
                <>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Marcar como Pago
                  </Button>
                  <Button variant="outline" size="sm">
                    Reagendar
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm">
                Gerar Recibo
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {pagamentos.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pagamento encontrado</h3>
            <p className="text-gray-600">Não há pagamentos nesta categoria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Pagamentos;