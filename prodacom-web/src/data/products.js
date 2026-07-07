import { ShieldCheck, Fingerprint, Wifi, FileText, Lock, Users, Eye, Zap, HardDrive, Cpu, Layers, Radio } from "lucide-react";

export const productsData = {
  // --- PRODUTOS ESPECÍFICOS (Que vão aparecer no carrossel) ---

  "inner-rep-plus": {
    id: "inner-rep-plus",
    tag: "01 // HARDWARE_REP",
    title: "Inner REP Plus",
    subtitle: "Relógio de Ponto Eletrónico Homologado",
    description: "O Inner Rep Plus é a solução definitiva para o controlo de jornada de trabalho. Homologado pelo MTE e certificado pelo Inmetro, oferece máxima segurança jurídica, conectividade avançada e velocidade de impressão para empresas de todos os portes.",
    image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/7f30343e8_generated_cdc1095e.png",
    features: [
      { icon: ShieldCheck, title: "Portaria 671 do MTE", desc: "Atende integralmente a todas as exigências legais do Ministério do Trabalho e Emprego." },
      { icon: Fingerprint, title: "Biometria Antifraude", desc: "Leitor biométrico de alta precisão com identificação rápida em menos de 1 segundo." },
      { icon: Wifi, title: "Comunicação em Nuvem", desc: "Sincronização automática via Wi-Fi ou TCP/IP com o seu software de gestão de ponto." },
      { icon: FileText, title: "Bobina de Alta Capacidade", desc: "Suporta bobinas de até 360 metros, imprimindo até 8.000 comprovantes sem troca." }
    ],
    specs: [
      { label: "Capacidade de Utilizadores", value: "Até 10.000 funcionários registados" },
      { label: "Armazenamento", value: "Memória MRP para mais de 8.000.000 de registos fiscais" },
      { label: "Mecanismo de Impressão", value: "Térmico direto com guilhotina integrada de corte automático" },
      { label: "Formas de Registo", value: "Biometria digital, proximidade RFID, Smart Card e senha" },
      { label: "Interface", value: "Ecrã a cores tátil (Touch Screen) intuitivo" }
    ]
  },

  "catraca-flap": {
    id: "catraca-flap",
    tag: "03 // ACESSO_PREMIUM",
    title: "Catraca Flap",
    subtitle: "Design premium e alto fluxo de passagem",
    description: "A solução perfeita que une alto padrão visual com controlo rigoroso de fluxo. As suas barreiras de vidro motorizadas abrem suavemente na validação do utilizador, ideal para átrios de edifícios comerciais de luxo e portarias.",
    image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/30ed482e7_generated_40703af9.png",
    features: [
      { icon: Eye, title: "Design Sofisticado", desc: "Gabinete em aço inox escovado e portas de vidro temperado premium." },
      { icon: Zap, title: "Alto Fluxo de Passagem", desc: "Permite a libertação rápida de até 45 pessoas por minuto sem retenção." },
      { icon: ShieldCheck, title: "Sensores Anti-Carona", desc: "Barreira infravermelha deteta e impede que duas pessoas passem juntas." },
      { icon: Lock, title: "Sistema Antipânico", desc: "Abre automaticamente as portas em caso de emergência ou quebra de energia." }
    ],
    specs: [
      { label: "Material do Gabinete", value: "Aço Inoxidável AISI 304 escovado de alta resistência" },
      { label: "Mecanismo", value: "Motor de passo silencioso com amortecimento eletrónico" },
      { label: "Sinalização Visual", value: "Pictogramas de LED superiores indicando permissão e sentido" },
      { label: "Integração", value: "Suporta leitores biométricos, faciais e leitores de QR Code" },
      { label: "Ambiente de Instalação", value: "Uso interno abrigado" }
    ]
  },

  // --- CATEGORIAS EXISTENTES (Mantidas para referência e compatibilidade) ---

  "relogio-de-ponto": {
    id: "relogio-de-ponto",
    tag: "01 // HARDWARE_REP",
    title: "Inner Rep Plus",
    subtitle: "Relógio de Ponto Eletrónico Homologado",
    description: "O Inner Rep Plus é a solução definitiva para o controlo de jornada de trabalho. Homologado pelo MTE e certificado pelo Inmetro, oferece máxima segurança jurídica, conectividade avançada e velocidade de impressão para empresas de todos os portes.",
    image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/7f30343e8_generated_cdc1095e.png",
    features: [
      { icon: ShieldCheck, title: "Portaria 671 do MTE", desc: "Atende integralmente a todas as exigências legais do Ministério do Trabalho e Emprego." },
      { icon: Fingerprint, title: "Biometria Antifraude", desc: "Leitor biométrico de alta precisão com identificação rápida em menos de 1 segundo." },
      { icon: Wifi, title: "Comunicação em Nuvem", desc: "Sincronização automática via Wi-Fi ou TCP/IP com o seu software de gestão de ponto." },
      { icon: FileText, title: "Bobina de Alta Capacidade", desc: "Suporta bobinas de até 360 metros, imprimindo até 8.000 comprovantes sem troca." }
    ],
    specs: [
      { label: "Capacidade de Utilizadores", value: "Até 10.000 funcionários registados" },
      { label: "Armazenamento", value: "Memória MRP para mais de 8.000.000 de registos fiscais" },
      { label: "Mecanismo de Impressão", value: "Térmico direto com guilhotina integrada de corte automático" },
      { label: "Formas de Registo", value: "Biometria digital, proximidade RFID, Smart Card e senha" },
      { label: "Interface", value: "Ecrã a cores tátil (Touch Screen) intuitivo" }
    ]
  },
  "controle-de-acesso": {
    id: "controle-de-acesso",
    tag: "02 // ACCESS_CONTROL",
    title: "Controlo Biométrico de Acesso",
    subtitle: "Segurança e Gestão de Ambientes Restritos",
    description: "Desenvolvido para bloquear e libertar a entrada de pessoas em salas de servidores, armazéns, escritórios e áreas restritas. Opera integrado a fechaduras eletromagnéticas e gere permissões por horários e cargos.",
    image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/aba616e9b_generated_4ec5bffc.png",
    features: [
      { icon: Lock, title: "Bloqueio Eletromagnético", desc: "Compatível com eletroímanes, fechaduras solenoides e trincos elétricos." },
      { icon: Users, title: "Zonas de Horário", desc: "Configure quem pode entrar em salas específicas e em que dias ou horários." },
      { icon: Wifi, title: "Operação Online/Offline", desc: "Continua a funcionar e reter dados mesmo se perder a ligação à rede." },
      { icon: ShieldCheck, title: "Multi-Fatores", desc: "Exija dupla autenticação (ex: Biometria + Cartão) para áreas de segurança máxima." }
    ],
    specs: [
      { label: "Capacidade de Utilizadores", value: "Até 30.000 utilizadores e cartões armazenados" },
      { label: "Interface de Comunicação", value: "TCP/IP nativo, RS-485 e relé de acionamento embutido" },
      { label: "Tipos de Leitores", value: "Biometria digital, aproximação RFID 125kHz ou Mifare" },
      { label: "Sinalização", value: "LEDs indicadores de estado (Verde/Vermelho) e aviso sonoro" },
      { label: "Alimentação", value: "12V DC com suporte para sistema de UPS integrado" }
    ]
  },
  "catracas": {
    id: "catracas",
    tag: "03 // HARDWARE_BARRIER",
    title: "Catraca Flap Premium",
    subtitle: "Controlo de Fluxo para Receções Corporativas e Academias",
    description: "A solução perfeita que une alto padrão visual com controlo rigoroso de fluxo. As suas barreiras de vidro motorizadas abrem suavemente na validação do utilizador, ideal para átrios de edifícios comerciais de luxo e portarias.",
    image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/30ed482e7_generated_40703af9.png",
    features: [
      { icon: Eye, title: "Design Sofisticado", desc: "Gabinete em aço inox escovado e portas de vidro temperado premium." },
      { icon: Zap, title: "Alto Fluxo de Passagem", desc: "Permite a libertação rápida de até 45 pessoas por minuto sem retenção." },
      { icon: ShieldCheck, title: "Sensores Anti-Carona", desc: "Barreira infravermelha deteta e impede que duas pessoas passem juntas." },
      { icon: Lock, title: "Sistema Antipânico", desc: "Abre automaticamente as portas em caso de quebra de energia ou emergência." }
    ],
    specs: [
      { label: "Material do Gabinete", value: "Aço Inoxidável AISI 304 escovado de alta resistência" },
      { label: "Mecanismo", value: "Motor de passo ultra silencioso com amortecimento eletrónico" },
      { label: "Sinalização Visual", value: "Pictogramas de LED superiores indicando permissão e sentido" },
      { label: "Integração", value: "Suporta leitores biométricos, faciais e leitores de QR Code" },
      { label: "Ambiente de Instalação", value: "Uso interno abrigado de intempéries" }
    ]
  },
  "ronda": {
    id: "ronda",
    tag: "04 // PATROL_GUARD",
    title: "Bastão de Ronda Inner",
    subtitle: "Auditoria e Monitorização Eletrónica de Vigilantes",
    description: "Garanta que a equipa de vigilância está a cumprir as rotas de patrulhamento corretamente. O bastão faz a leitura de tags metálicas ou RFID fixadas nos postos de verificação, gerando relatórios precisos de auditoria.",
    image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/82bf69a93_generated_aa707a7d.png",
    features: [
      { icon: HardDrive, title: "Estrutura Blindada", desc: "Corpo em liga de alumínio revestido com borracha à prova de quedas e choques." },
      { icon: ShieldCheck, title: "Vedação IP67", desc: "Totalmente à prova de água e poeira, perfeito para rondas externas sob chuva." },
      { icon: Zap, title: "Bateria de Longa Duração", desc: "Bateria recarregável capaz de suportar até 30 dias de uso contínuo." },
      { icon: FileText, title: "Anti-Fraude", desc: "Regista internamente qualquer tentativa de impacto violento ou violação." }
    ],
    specs: [
      { label: "Memória Interna", value: "Armazena até 4.000 marcações de postos antes da descarga" },
      { label: "Tecnologia de Leitura", value: "Identificação por proximidade RFID e iButton (contacto)" },
      { label: "Ligação de Dados", value: "Cabo USB magnético blindado de alta velocidade" },
      { label: "Alertas ao Operador", value: "Confirmação de leitura por vibração e sinal luminoso LED" },
      { label: "Peso do Equipamento", value: "Aproximadamente 200g, ergonómico e portátil" }
    ]
  },
  "software": {
    id: "software",
    tag: "05 // SOFTWARE_PLATFORM",
    title: "Software de Gestão de Ponto e Acesso",
    subtitle: "Plataforma em Nuvem para RH e Segurança Corporativa",
    description: "Centralize todas as informações de jornada e segurança da sua empresa. O nosso sistema em nuvem calcula automaticamente banco de horas, horas extras, atrasos, faltas e gera espelhos de ponto assinados digitalmente.",
    image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/544bfd891_generated_3040d10b.png",
    features: [
      { icon: Layers, title: "Tratamento de Ponto Automatizado", desc: "Cálculos instantâneos de escalas de trabalho complexas e plantões." },
      { icon: Wifi, title: "100% em Nuvem", desc: "Aceda aos relatórios fiscais e de gestão de qualquer lugar, pelo computador ou telemóvel." },
      { icon: Cpu, title: "Integração ERP", desc: "Exportação nativa de dados para os principais softwares de processamento salarial do mercado." },
      { icon: Users, title: "Painel de Acesso Ao Vivo", desc: "Monitorize em tempo real quem está dentro da empresa ou de áreas específicas." }
    ],
    specs: [
      { label: "Alojamento", value: "Servidores seguros de alta disponibilidade (AWS)" },
      { label: "Segurança Jurídica", value: "Emissão de ficheiros AFD e AFDT em conformidade com as leis fiscais" },
      { label: "Suporte Multi-Empresa", value: "Gira matriz e diversas filiais num único ecrã de forma unificada" },
      { label: "Recursos Especiais", value: "Assinatura eletrónica de espelho de ponto pelo colaborador" },
      { label: "Módulo Mobile", value: "Aplicação para os funcionários picarem o ponto externamente com geolocalização por GPS" }
    ]
  },
  "crachas": {
    id: "crachas",
    tag: "06 // ID_CARDS",
    title: "Crachás de PVC Personalizados",
    subtitle: "Identificação Profissional com Tecnologia de Proximidade",
    description: "Confecção de crachás institucionais de alta durabilidade em PVC. Ideais para identificação de funcionários e visitantes, integrando tecnologia de aproximação RFID para libertação automática de catracas e portas.",
    image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/6903d7954_generated_de96904b.png",
    features: [
      { icon: Eye, title: "Impressão em Alta Definição", desc: "Tecnologia de termo-transferência que evita desvanecimento e riscos." },
      { icon: Radio, title: "Chips RFID Integrados", desc: "Equipados com tecnologia AcuProx 125kHz ou chip inteligente Mifare 13.56MHz." },
      { icon: Layers, title: "Laminação de Proteção", desc: "Película protetora UV que dobra a vida útil do cartão contra o desgaste diário." },
      { icon: Users, title: "Layouts Exclusivos", desc: "Desenvolvimento da arte personalizada combinando com a identidade visual da sua marca." }
    ],
    specs: [
      { label: "Material de Base", value: "PVC Premium Cr80 padrão internacional ISO de rigidez" },
      { label: "Dimensões", value: "54mm x 86mm com espessura padrão de 0.76mm" },
      { label: "Opcionais de Acabamento", value: "Furação jacaré (ovoide) vertical ou horizontal e cordões personalizados" },
      { label: "Compatibilidade", value: "100% compatível com catracas e coletores Topdata, Control ID, Henry e Dimep" },
      { label: "Segurança", value: "Possibilidade de inserção de código de barras ou numeração digital oculta encriptada" }
    ]
  }
};