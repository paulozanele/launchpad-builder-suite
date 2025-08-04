import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Clock, Mail, MessageSquare, CreditCard, Bell, Shield } from "lucide-react";
import { Layout } from "@/components/Layout";

const Configuracoes = () => {
  const [profileData, setProfileData] = useState({
    nome: "João Silva",
    email: "joao@exemplo.com",
    telefone: "(11) 99999-9999",
    tipoServico: "Eletricista",
    endereco: "São Paulo, SP",
    bio: "Eletricista com 10 anos de experiência em instalações residenciais e comerciais."
  });

  const [horariosDisponiveis, setHorariosDisponiveis] = useState({
    segunda: { ativo: true, inicio: "08:00", fim: "18:00" },
    terca: { ativo: true, inicio: "08:00", fim: "18:00" },
    quarta: { ativo: true, inicio: "08:00", fim: "18:00" },
    quinta: { ativo: true, inicio: "08:00", fim: "18:00" },
    sexta: { ativo: true, inicio: "08:00", fim: "18:00" },
    sabado: { ativo: true, inicio: "08:00", fim: "14:00" },
    domingo: { ativo: false, inicio: "08:00", fim: "18:00" }
  });

  const [mensagensAutomaticas, setMensagensAutomaticas] = useState({
    confirmacaoAgendamento: "Olá! Seu agendamento foi confirmado para {data} às {hora}. Nos vemos em breve!",
    lembreteAgendamento: "Lembrete: você tem um agendamento marcado para amanhã às {hora}.",
    agradecimentoServico: "Obrigado por confiar em nossos serviços! Ficamos à disposição para futuras necessidades."
  });

  const [notificacoes, setNotificacoes] = useState({
    emailNovoAgendamento: true,
    emailPagamentoRecebido: true,
    whatsappLembrete: true,
    emailRelatorioSemanal: false
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Salvar dados do perfil
    console.log("Perfil salvo:", profileData);
  };

  const handleSaveHorarios = () => {
    // Salvar horários
    console.log("Horários salvos:", horariosDisponiveis);
  };

  const handleSaveMensagens = () => {
    // Salvar mensagens
    console.log("Mensagens salvas:", mensagensAutomaticas);
  };

  const diasSemana = [
    { key: 'segunda', label: 'Segunda-feira' },
    { key: 'terca', label: 'Terça-feira' },
    { key: 'quarta', label: 'Quarta-feira' },
    { key: 'quinta', label: 'Quinta-feira' },
    { key: 'sexta', label: 'Sexta-feira' },
    { key: 'sabado', label: 'Sábado' },
    { key: 'domingo', label: 'Domingo' }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie suas configurações e preferências</p>
        </div>

        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="horarios">Horários</TabsTrigger>
            <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="plano">Plano</TabsTrigger>
          </TabsList>

          {/* Perfil */}
          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Dados do Perfil</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input
                        id="nome"
                        value={profileData.nome}
                        onChange={(e) => setProfileData({...profileData, nome: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={profileData.telefone}
                        onChange={(e) => setProfileData({...profileData, telefone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipoServico">Tipo de Serviço</Label>
                      <Input
                        id="tipoServico"
                        value={profileData.tipoServico}
                        onChange={(e) => setProfileData({...profileData, tipoServico: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço/Região de Atuação</Label>
                    <Input
                      id="endereco"
                      value={profileData.endereco}
                      onChange={(e) => setProfileData({...profileData, endereco: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Descrição dos Serviços</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Descreva seus serviços e experiência"
                    />
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Salvar Perfil
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Horários */}
          <TabsContent value="horarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Horários Disponíveis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {diasSemana.map(dia => (
                  <div key={dia.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={horariosDisponiveis[dia.key as keyof typeof horariosDisponiveis].ativo}
                        onCheckedChange={(checked) => 
                          setHorariosDisponiveis({
                            ...horariosDisponiveis,
                            [dia.key]: { ...horariosDisponiveis[dia.key as keyof typeof horariosDisponiveis], ativo: checked }
                          })
                        }
                      />
                      <span className="font-medium w-24">{dia.label}</span>
                    </div>
                    {horariosDisponiveis[dia.key as keyof typeof horariosDisponiveis].ativo && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={horariosDisponiveis[dia.key as keyof typeof horariosDisponiveis].inicio}
                          onChange={(e) => 
                            setHorariosDisponiveis({
                              ...horariosDisponiveis,
                              [dia.key]: { ...horariosDisponiveis[dia.key as keyof typeof horariosDisponiveis], inicio: e.target.value }
                            })
                          }
                          className="w-24"
                        />
                        <span>até</span>
                        <Input
                          type="time"
                          value={horariosDisponiveis[dia.key as keyof typeof horariosDisponiveis].fim}
                          onChange={(e) => 
                            setHorariosDisponiveis({
                              ...horariosDisponiveis,
                              [dia.key]: { ...horariosDisponiveis[dia.key as keyof typeof horariosDisponiveis], fim: e.target.value }
                            })
                          }
                          className="w-24"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <Button onClick={handleSaveHorarios} className="bg-blue-600 hover:bg-blue-700">
                  Salvar Horários
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mensagens */}
          <TabsContent value="mensagens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Mensagens Automáticas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="confirmacao">Confirmação de Agendamento</Label>
                  <Textarea
                    id="confirmacao"
                    value={mensagensAutomaticas.confirmacaoAgendamento}
                    onChange={(e) => setMensagensAutomaticas({
                      ...mensagensAutomaticas,
                      confirmacaoAgendamento: e.target.value
                    })}
                  />
                  <p className="text-sm text-gray-600">
                    Variáveis disponíveis: {"{data}"}, {"{hora}"}, {"{cliente}"}, {"{servico}"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lembrete">Lembrete de Agendamento</Label>
                  <Textarea
                    id="lembrete"
                    value={mensagensAutomaticas.lembreteAgendamento}
                    onChange={(e) => setMensagensAutomaticas({
                      ...mensagensAutomaticas,
                      lembreteAgendamento: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agradecimento">Agradecimento Pós-Serviço</Label>
                  <Textarea
                    id="agradecimento"
                    value={mensagensAutomaticas.agradecimentoServico}
                    onChange={(e) => setMensagensAutomaticas({
                      ...mensagensAutomaticas,
                      agradecimentoServico: e.target.value
                    })}
                  />
                </div>
                <Button onClick={handleSaveMensagens} className="bg-blue-600 hover:bg-blue-700">
                  Salvar Mensagens
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificações */}
          <TabsContent value="notificacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Preferências de Notificação</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">E-mail para novos agendamentos</h3>
                    <p className="text-sm text-gray-600">Receba um e-mail sempre que um cliente agendar</p>
                  </div>
                  <Switch
                    checked={notificacoes.emailNovoAgendamento}
                    onCheckedChange={(checked) => 
                      setNotificacoes({...notificacoes, emailNovoAgendamento: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">E-mail para pagamentos recebidos</h3>
                    <p className="text-sm text-gray-600">Notificação quando receber um pagamento</p>
                  </div>
                  <Switch
                    checked={notificacoes.emailPagamentoRecebido}
                    onCheckedChange={(checked) => 
                      setNotificacoes({...notificacoes, emailPagamentoRecebido: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">WhatsApp lembretes</h3>
                    <p className="text-sm text-gray-600">Enviar lembretes automáticos via WhatsApp</p>
                  </div>
                  <Switch
                    checked={notificacoes.whatsappLembrete}
                    onCheckedChange={(checked) => 
                      setNotificacoes({...notificacoes, whatsappLembrete: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Relatório semanal por e-mail</h3>
                    <p className="text-sm text-gray-600">Resumo semanal de agendamentos e faturamento</p>
                  </div>
                  <Switch
                    checked={notificacoes.emailRelatorioSemanal}
                    onCheckedChange={(checked) => 
                      setNotificacoes({...notificacoes, emailRelatorioSemanal: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plano */}
          <TabsContent value="plano" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Seu Plano Atual</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Plano ServicePro</h3>
                      <p className="text-gray-600">Teste gratuito - 5 dias restantes</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium">Agendamentos este mês</h4>
                      <p className="text-2xl font-bold text-blue-600">12 / 200</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Próxima cobrança</h4>
                      <p className="text-2xl font-bold">R$ 39,00</p>
                      <p className="text-sm text-gray-600">em 20/01/2024</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Funcionalidades incluídas:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Até 200 agendamentos/mês</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Clientes ilimitados</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Orçamentos digitais</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Integração Stripe</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Notificações WhatsApp</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Suporte por e-mail</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Continuar com o Plano
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Cancelar Assinatura
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Segurança da Conta</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full">
                      Exportar Dados
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Excluir Conta
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Configuracoes;