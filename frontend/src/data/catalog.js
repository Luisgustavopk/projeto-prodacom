import { 
  ShieldCheck, Printer, Layers, Monitor, Fingerprint, Lock, Users, Wifi, 
  Eye, Zap, HardDrive, FileText, Cpu, Radio, Box, Sparkles
} from "lucide-react";

export const catalogData = {
  "relogio-de-ponto": {
    id: "relogio-de-ponto",
    tag: "01 // LINHA TOPDATA // GESTÃO DE JORNADA",
    title: "Relógios de Ponto",
    description: "Equipamentos homologados e certificados que combinam segurança jurídica absoluta com biometria facial, digital e impressão térmica rápida de comprovantes.",
    benefits: [
      { icon: ShieldCheck, title: "Portaria 671 MTE", desc: "Equipamentos em conformidade absoluta com as regras vigentes do Ministério do Trabalho e INMETRO." },
      { icon: Printer, title: "Impressão de Alta Performance", desc: "Bobinas de até 360m que imprimem até 11.000 tickets de ponto por recarga." },
      { icon: Sparkles, title: "Inteligência Artificial", desc: "Reconhecimento facial instantâneo de alta precisão através do Leitor F4." },
      { icon: Wifi, title: "Integração Nativa", desc: "Comunicação TCP/IP e USB para envio imediato de dados ao software de tratamento de ponto." }
    ],
    models: [
      { id: "leitor-facial-f4", num: "01", title: "Leitor Facial F4 Topdata", desc: "Tecnologia de reconhecimento facial binocular (RGB + IR) com detecção de rosto vivo e máscara." },
      { id: "inner-rep-plus", num: "02", title: "Inner REP Plus Biométrico", desc: "Relógio de ponto tradicional de alta durabilidade com opções de leitores biométricos LC e LFD." }
    ],
    addons: [
      { icon: Fingerprint, title: "Módulos Biométricos Customizáveis", desc: "Leitor LFD antifraude de silicone (até 10.000 digitais) ou Módulo LC econômico (até 3.000 digitais)." }
    ]
  },

  "controle-de-acesso": {
    id: "controle-de-acesso",
    tag: "02 // LINHA CONTROL ID // SEGURANÇA INTEGRADA",
    title: "Controle de Acesso",
    description: "Terminais inteligentes e autônomos de alta tecnologia desenvolvidos pela Control iD em português. Design requintado com processamento de ponta para portas, fechaduras e portarias.",
    benefits: [
      { icon: Lock, title: "Ação Autônoma (Stand Alone)", desc: "Gerencia a abertura de portas e retém registros internamente mesmo sem conexão de rede ativa." },
      { icon: Monitor, title: "Interface Amigável", desc: "Telas coloridas touchscreen com menus intuitivos configuráveis em português (PT-BR)." },
      { icon: Users, title: "Grande Capacidade", desc: "Dispositivos prontos para identificar dezenas de milhares de usuários de forma instantânea." },
      { icon: Wifi, title: "Conectividade Ampla", desc: "Suporte a TCP/IP, Wi-Fi integrado, USB e relés de acionamento embutidos." }
    ],
    models: [
      { id: "idface", num: "01", title: "iDFace Control iD", desc: "Controle de acesso facial de alta tecnologia com tela touchscreen de 3.5\" e capacidade para até 10.000 faces." },
      { id: "idface-max", num: "02", title: "iDFace Max", desc: "A evolução do acesso facial. Hardware robusto desenvolvido para fluxos severos e ambientes exigentes." },
      { id: "idlock-bio", num: "03", title: "iDLock Biométrico", desc: "Fechadura digital inteligente de embutir com leitor de impressões digitais, cartão de proximidade e senha." },
      { id: "idlock", num: "04", title: "iDLock Teclado", desc: "Controle de acesso elegante focado em senhas numéricas e cartões RFID de aproximação." }
    ]
  },

  "catracas": {
    id: "catracas",
    tag: "03 // COOPERAÇÃO TOPDATA & CONTROL ID // BARREIRAS FÍSICAS",
    title: "Catracas Eletrônicas",
    description: "Controle físico rigoroso de passagem para portarias corporativas, academias e escolas. Modelos que unem a mecânica robusta da Topdata com os eletrônicos modernos da Control iD.",
    benefits: [
      { icon: ShieldCheck, title: "Mecânica Durável", desc: "Mecanismos de braços em inox projetados para suportar mais de 3.000.000 de giros sem fadiga." },
      { icon: Layers, title: "Urna Coletora Integrada", desc: "Cofre inteligente opcional para recolhimento mecânico e retenção de cartões de visitantes." },
      { icon: Lock, title: "Segurança de Emergência", desc: "Opção de braço articulado (antipânico) que cai automaticamente em caso de queda de energia." },
      { icon: Users, title: "Acessibilidade Universal", desc: "Estruturas adaptadas para permitir a passagem confortável de cadeirantes e pessoas com mobilidade reduzida." }
    ],
    models: [
      { id: "catraca-revolution", num: "01", title: "Catraca Revolution Topdata", desc: "Pedestal em aço carbono com tampo em inox escovado. O melhor custo-benefício para fluxos corporativos." },
      { id: "catraca-box", num: "02", title: "Catraca Box Topdata", desc: "Gabinete reforçado tipo cofre, oferecendo maior barreira física e espaço para múltiplas integrações." },
      { id: "catraca-flap", num: "03", title: "Catraca Flap Premium", desc: "Barreiras motorizadas de vidro retráteis. Abertura por aproximação ultra rápida e visual sofisticado." },
      { id: "idblock-next", num: "04", title: "iDBlock Next Control iD", desc: "Catraca pedestal da Control iD equipada com display touchscreen, leitor biométrico e design ultra moderno." },
      { id: "idblock-pne", num: "05", title: "iDBlock PNE Acessível", desc: "Modelo Control iD em conformidade com as normas de acessibilidade, com braço estendido ou pivotante." }
    ]
  },

  "ronda": {
    id: "ronda",
    tag: "04 // HARDWARE TOPDATA // SUPERVISÃO DE VIGILÂNCIA",
    title: "Bastão de Ronda",
    description: "A ferramenta definitiva para a auditoria de segurança patrimonial. Garanta que seus vigilantes cumpram exatamente as rotas e horários planejados.",
    benefits: [
      { icon: HardDrive, title: "Blindagem de Alumínio", desc: "Corpo super resistente com proteção em borracha. Suporta quedas bruscas e vandalismo." },
      { icon: ShieldCheck, title: "Grau de Proteção IP67", desc: "Totalmente vedado contra poeira e água. Pronto para uso externo em rondas sob chuva severa." },
      { icon: FileText, title: "Registros Invioláveis", desc: "Memória interna flash não-volátil capaz de reter dados e registrar tentativas de impactos e fraudes." },
      { icon: Zap, title: "Bateria de Longa Vida", desc: "Consumo otimizado que garante alta autonomia, operando por longos períodos sem necessidade de recarga." }
    ],
    models: [
      { id: "bastao-viggia", num: "01", title: "Bastão de Ronda Viggia", desc: "O bastão oficial da Topdata. Coleta por iButtons inteligentes por contato e comunicação via cabo USB magnético." }
    ]
  }
};