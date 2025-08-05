import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, FileText, Send, Eye, Edit, Trash2, Calendar, DollarSign } from "lucide-react";
import { Layout } from "@/components/Layout";

const Orcamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data para orçamentos
  const orcamentos = [
    {
      id: 1,
      numero: "ORC-001",
      cliente: "Maria Silva",
      descricao: "Instalação elétrica completa",
      valor: 1500,
      prazo: "2024-01-20",
      status: "enviado",
      dataCriacao: "2024-01-10",
      observacoes: "Incluir material elétrico"
    },
    {
      id: 2,
      numero: "ORC-002",
      cliente: "João Santos",
      descricao: "Manutenção preventiva",
      valor: 450,
      prazo: "2024-01-18",
      status: "aprovado",
      dataCriacao: "2024-01-08",
      observacoes: "Cliente solicitou urgência"
    },
    {
      id: 3,
      numero: "ORC-003",
      cliente: "Ana Costa",
      descricao: "Consulta técnica",
      valor: 200,
      prazo: "2024-01-25",
      status: "rascunho",
      dataCriacao: "2024-01-12",
      observacoes: ""
    }
  ];

  const handleNovoOrcamento = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    // Aqui adicionaria o novo orçamento ao estado
  };

  const filteredOrcamentos = orcamentos.filter(orcamento =>
    orcamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orcamento.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orcamento.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'bg-green-100 text-green-800';
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      case 'rejeitado':
        return 'bg-red-100 text-red-800';
      case 'rascunho':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'Aprovado';
      case 'enviado':
        return 'Enviado';
      case 'rejeitado':
        return 'Rejeitado';
      case 'rascunho':
        return 'Rascunho';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orçamentos</h1>
            <p className="text-gray-600">Crie e gerencie seus orçamentos</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Orçamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Novo Orçamento</DialogTitle>
                <DialogDescription>
                  Crie um novo orçamento para seu cliente
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNovoOrcamento} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="prazo">Prazo de Validade</Label>
                    <Input id="prazo" type="date" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição do Serviço</Label>
                  <Textarea id="descricao" placeholder="Descreva o serviço a ser realizado" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor (R$)</Label>
                    <Input id="valor" type="number" step="0.01" placeholder="0,00" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prazo_execucao">Prazo de Execução</Label>
                    <Input id="prazo_execucao" placeholder="Ex: 5 dias úteis" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea id="observacoes" placeholder="Observações adicionais" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="button" variant="outline">
                    Salvar Rascunho
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Criar e Enviar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por cliente, número ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total de Orçamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{orcamentos.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Aprovados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {orcamentos.filter(o => o.status === 'aprovado').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {orcamentos.filter(o => o.status === 'enviado').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                R$ {orcamentos.reduce((total, o) => total + o.valor, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de orçamentos */}
        <div className="grid gap-6">
          {filteredOrcamentos.map((orcamento) => (
            <Card key={orcamento.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{orcamento.numero}</h3>
                      <Badge className={getStatusColor(orcamento.status)}>
                        {getStatusLabel(orcamento.status)}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{orcamento.cliente}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log('Visualizar orçamento:', orcamento.numero)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log('Editar orçamento:', orcamento.numero)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log('Enviar orçamento:', orcamento.numero)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log('Excluir orçamento:', orcamento.numero)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-700">{orcamento.descricao}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        R$ {orcamento.valor.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Válido até: {orcamento.prazo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Criado em: {orcamento.dataCriacao}</span>
                    </div>
                  </div>

                  {orcamento.observacoes && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 text-sm">{orcamento.observacoes}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  {orcamento.status === 'rascunho' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Orçamento
                    </Button>
                  )}
                  {orcamento.status === 'aprovado' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Agendar Serviço
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => console.log('Gerar PDF do orçamento:', orcamento.numero)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Gerar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrcamentos.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'Nenhum orçamento encontrado' : 'Nenhum orçamento criado'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Tente buscar com outros termos' 
                  : 'Comece criando seu primeiro orçamento'
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Orçamento
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Orcamentos;