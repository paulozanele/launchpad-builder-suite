import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Clock, MapPin, User } from "lucide-react";
import { Layout } from "@/components/Layout";

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data para agendamentos
  const agendamentos = [
    {
      id: 1,
      cliente: "Maria Silva",
      servico: "Instalação elétrica",
      horario: "09:00",
      data: "2024-01-15",
      status: "confirmado",
      endereco: "Rua das Flores, 123",
      telefone: "(11) 99999-9999"
    },
    {
      id: 2,
      cliente: "João Santos",
      servico: "Manutenção preventiva",
      horario: "14:00",
      data: "2024-01-15",
      status: "pendente",
      endereco: "Av. Paulista, 456",
      telefone: "(11) 88888-8888"
    },
    {
      id: 3,
      cliente: "Ana Costa",
      servico: "Orçamento",
      horario: "16:30",
      data: "2024-01-15",
      status: "confirmado",
      endereco: "Rua Augusta, 789",
      telefone: "(11) 77777-7777"
    }
  ];

  const handleNovoAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    // Aqui adicionaria o novo agendamento ao estado
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
            <p className="text-gray-600">Gerencie seus agendamentos</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription>
                  Crie um novo agendamento para seu cliente
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNovoAgendamento} className="space-y-4">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <Input id="data" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="horario">Horário</Label>
                    <Input id="horario" type="time" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servico">Serviço</Label>
                  <Input id="servico" placeholder="Descrição do serviço" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea id="observacoes" placeholder="Observações adicionais" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Agendar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendário */}
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Lista de agendamentos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos do Dia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agendamentos.map((agendamento) => (
                  <div key={agendamento.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{agendamento.horario}</span>
                        <Badge className={getStatusColor(agendamento.status)}>
                          {agendamento.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{agendamento.cliente}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{agendamento.telefone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{agendamento.endereco}</span>
                      </div>
                      
                      <p className="text-gray-700 font-medium">{agendamento.servico}</p>
                    </div>
                  </div>
                ))}
                
                {agendamentos.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhum agendamento para este dia</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Link público para agendamento */}
        <Card>
          <CardHeader>
            <CardTitle>Link Público para Agendamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input 
                value="https://servicepro.app/agenda/joao-silva" 
                readOnly 
                className="flex-1"
              />
              <Button variant="outline">
                Copiar Link
              </Button>
              <Button variant="outline">
                Personalizar
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Compartilhe este link com seus clientes para que possam agendar serviços diretamente
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Agenda;