import { 
  ShieldCheck, Printer, Layers, Monitor, Fingerprint, Lock, Users, Wifi, 
  Eye, Zap, HardDrive, FileText, Cpu, Radio, Box, ArrowRight, CheckCircle2 
} from "lucide-react";

export const catalogData = {
  "relogio-de-ponto": {
    id: "relogio-de-ponto",
    tag: "01 // INFRAESTRUTURA // REGISTRO",
    title: "Relógio de Ponto",
    description: "Relógios de ponto REP homologados que tornam o registro de jornada mais rápido, eficiente e à prova de fraudes. Desenvolvidos de acordo com as normas da Portaria 671 do Ministério do Trabalho e do INMETRO.",
    heroImage: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/7f30343e8_generated_cdc1095e.png",
    benefits: [
      { icon: ShieldCheck, title: "Segurança Jurídica", desc: "Comprovantes com assinatura digital que evitam passivos trabalhistas e garantem validade legal." },
      { icon: Printer, title: "Alta Autonomia", desc: "Suporta bobinas de até 360m, imprimindo até 11.000 comprovantes com uma única troca." },
      { icon: Layers, title: "Múltiplas Tecnologias", desc: "Leitor biométrico, código de barras e proximidade integrados em um mesmo equipamento." },
      { icon: Monitor, title: "Praticidade de Uso", desc: "Operação fácil e intuitiva através da tela colorida touch screen." }
    ],
    models: [
      { id: "inner-rep-plus", num: "01", title: "Inner REP Plus", desc: "Biometria, código de barras e proximidade (RFID)" },
      { id: "inner-rep-plus-bio-prox", num: "02", title: "Inner REP Plus Bio Prox", desc: "Biometria e proximidade (RFID)" },
      { id: "inner-rep-plus-bio-barras", num: "03", title: "Inner REP Plus Bio Barras", desc: "Biometria e código de barras" },
      { id: "inner-rep-plus-barras", num: "04", title: "Inner REP Plus Barras", desc: "Exclusivo para código de barras" },
      { id: "inner-rep-plus-prox", num: "05", title: "Inner REP Plus Prox", desc: "Exclusivo para cartão de proximidade (RFID)" },
      { id: "pontto-5", num: "06", title: "Pontto 5 Cartográfico", desc: "Solução simples e econômica com impressão em cartão de cartolina para pequenas empresas" }
    ],
    addons: [
      { icon: Fingerprint, title: "Opções de Leitores Biométricos", desc: "Leitor LFD (proteção contra dedos falsos, até 10.000 digitais) ou Leitor LC (até 3.000 digitais)." }
    ]
  },
  
  "controle-de-acesso": {
    id: "controle-de-acesso",
    tag: "02 // ACCESS_CONTROL // SECURITY",
    title: "Controle de Acesso",
    description: "Soluções completas de hardware para gerenciar e restringir a entrada e saída de pessoas em empresas, condomínios, escolas e academias, garantindo máxima segurança ao seu patrimônio.",
    heroImage: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/aba616e9b_generated_4ec5bffc.png",
    benefits: [
      { icon: Lock, title: "Bloqueio Inteligente", desc: "Aciona fechaduras eletroímã, solenoides e trincos eletrônicos de forma instantânea." },
      { icon: Users, title: "Gestão de Visitantes", desc: "Cadastre prestadores de serviço com permissões de acesso temporárias e restritas." },
      { icon: Wifi, title: "Operação Stand Alone", desc: "Continua bloqueando e liberando acessos normalmente mesmo se houver queda na rede de internet." },
      { icon: Eye, title: "Identificação Precisa", desc: "Leitores de biometria e reconhecimento facial com tecnologia anti-fraude embarcada." }
    ],
    models: [
      { id: "inner-acesso-2", num: "01", title: "Inner Acesso 2", desc: "Terminal completo com teclado touch, biometria e RFID." },
      { id: "inner-bio", num: "02", title: "Inner Bio", desc: "Leitor biométrico de parede compacto para portas e fechaduras." },
      { id: "coletor-facial", num: "03", title: "Controle de Acesso Facial", desc: "Reconhecimento facial com detecção de vivacidade e máscara." },
      { id: "totem-acesso", num: "04", title: "Totem de Estacionamento", desc: "Controle de cancelas para veículos com expedição de ticket." }
    ],
    addons: [
      { icon: Zap, title: "Sistema de Nobreak", desc: "Compatibilidade nativa com fontes carregadoras para manter a porta fechada durante quedas de energia." }
    ]
  },

  "catracas": {
    id: "catracas",
    tag: "03 // HARDWARE_BARRIER // FLUX",
    title: "Catracas Eletrônicas",
    description: "Controle físico de fluxo para locais de alto tráfego. Equipamentos em aço carbono ou inox que unem robustez extrema, design moderno e mecânica silenciosa.",
    heroImage: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/30ed482e7_generated_40703af9.png",
    benefits: [
      { icon: ShieldCheck, title: "Mecânica Reforçada", desc: "Sistema de amortecimento de giro que evita impactos e prolonga a vida útil do equipamento." },
      { icon: Box, title: "Acabamento Premium", desc: "Opções de gabinetes em Aço Inox AISI 304, ideais para recepções corporativas de alto padrão." },
      { icon: Lock, title: "Sistema Anti-Pânico", desc: "Braços articulados que caem automaticamente em caso de emergência (opcional)." },
      { icon: Layers, title: "Urna Coletora", desc: "Cofre integrado para recolhimento e retenção de crachás de visitantes na saída." }
    ],
    models: [
      { id: "catraca-revolution", num: "01", title: "Catraca Revolution", desc: "O melhor custo-benefício, design atual e urna coletora de crachás opcional." },
      { id: "catraca-box", num: "02", title: "Catraca Box", desc: "Estrutura robusta em formato de cofre, ideal para portarias e estádios." },
      { id: "catraca-flap", num: "03", title: "Catraca Flap", desc: "Barreiras de vidro retráteis, liberação rápida para prédios comerciais de luxo." },
      { id: "catraca-pne", num: "04", title: "Catraca PNE", desc: "Acesso facilitado para cadeirantes e pessoas com mobilidade reduzida." },
      { id: "torniquete", num: "05", title: "Torniquete de Acesso", desc: "Fechamento total do chão ao teto para áreas de segurança máxima." }
    ],
    addons: [
      { icon: Cpu, title: "Placa Controladora Nativa", desc: "Placa eletrônica embarcada que permite integração com qualquer software de controle de acesso do mercado." }
    ]
  },

  "ronda": {
    id: "ronda",
    tag: "04 // PATROL_GUARD // AUDIT",
    title: "Bastão de Ronda",
    description: "Sistemas eletrônicos de supervisão que garantem que sua equipe de segurança e vigilância está realizando as rotas de patrulha nos horários corretos.",
    heroImage: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/82bf69a93_generated_aa707a7d.png",
    benefits: [
      { icon: HardDrive, title: "Estrutura Blindada", desc: "Corpo em alumínio aeroespacial revestido em borracha. Resiste a quedas, choques e vandalismo." },
      { icon: ShieldCheck, title: "À Prova D'água (IP67)", desc: "Completamente selado, pode ser usado sob chuva intensa sem danificar os circuitos." },
      { icon: FileText, title: "Auditoria Completa", desc: "O bastão registra internamente qualquer tentativa de impacto violento ou abertura." },
      { icon: Zap, title: "Autonomia de Bateria", desc: "Bateria de longa duração que permite meses de uso contínuo sem precisar recarregar." }
    ],
    models: [
      { id: "bastao-viggia-usb", num: "01", title: "Bastão Viggia USB", desc: "Coleta de dados via cabo magnético e leitura de ibuttons metálicos." },
      { id: "bastao-inner-ronda", num: "02", title: "Bastão Inner Ronda", desc: "Tecnologia de leitura por aproximação (RFID) para checagem invisível de postos." },
      { id: "ronda-online", num: "03", title: "Bastão Ronda Online", desc: "Transmissão de dados via GPRS/Wi-Fi em tempo real para a central." }
    ],
    addons: [
      { icon: Radio, title: "Ibuttons e Tags RFID", desc: "Botões de checagem super-resistentes que podem ser fixados em paredes, portas e equipamentos." }
    ]
  },

  "software": {
    id: "software",
    tag: "05 // SOFTWARE_PLATFORM // CLOUD",
    title: "Softwares de Gestão",
    description: "Sistemas inteligentes em nuvem e servidores locais para transformar os bipes das catracas e relógios em relatórios gerenciais e cálculos de folha de pagamento exatos.",
    heroImage: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/544bfd891_generated_3040d10b.png",
    benefits: [
      { icon: Layers, title: "Tratamento de Ponto Automatizado", desc: "Calcula horas extras, banco de horas, adicional noturno, atrasos e faltas sem planilhas manuais." },
      { icon: Wifi, title: "Acesso em Nuvem (SaaS)", desc: "Acesse o painel gerencial de qualquer computador ou celular, de casa ou da empresa." },
      { icon: Cpu, title: "Integração Contábil", desc: "Exportação direta no formato exigido por ERPs e sistemas de folha de pagamento (Domínio, Alterdata, etc)." },
      { icon: Users, title: "App do Colaborador", desc: "Aplicativo de ponto mobile para equipes externas com registro via GPS e foto." }
    ],
    models: [
      { id: "iponto-web", num: "01", title: "iPonto Web", desc: "Software completo para tratamento de ponto eletrônico (Portaria 671)." },
      { id: "iponto-mobile", num: "02", title: "iPonto Mobile", desc: "App de marcação de ponto por geolocalização para iOS e Android." },
      { id: "iacesso", num: "03", title: "iAcesso", desc: "Sistema especialista para gestão de portarias, academias e refeitórios." }
    ],
    addons: [
      { icon: FileText, title: "Assinatura Digital", desc: "O funcionário confere e assina o espelho de ponto eletronicamente pelo celular, sem uso de papel." }
    ]
  },

  "crachas": {
    id: "crachas",
    tag: "06 // ID_CARDS // IDENTIFICATION",
    title: "Crachás Personalizados",
    description: "Identificação visual corporativa de alta qualidade em PVC. Crachás e cartões de acesso com chips de proximidade invisíveis embutidos na estrutura.",
    heroImage: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/6903d7954_generated_de96904b.png",
    benefits: [
      { icon: Eye, title: "Impressão Térmica HD", desc: "Cores vivas e fotos nítidas. A impressão penetra no PVC, evitando descamação precoce." },
      { icon: Layers, title: "Laminação Protetora", desc: "Película cristalina extra que dobra a vida útil do cartão contra fricção e suor." },
      { icon: Lock, title: "Numeração Oculta", desc: "Camada de segurança extra com códigos criptografados que impedem a clonagem do cartão." },
      { icon: Users, title: "Layouts Exclusivos", desc: "Arte e design desenvolvidos sob medida seguindo o manual da marca da sua empresa." }
    ],
    models: [
      { id: "cracha-rfid-125", num: "01", title: "Crachá Proximidade 125kHz", desc: "Padrão AcuProx / ABA Track, o mais utilizado no mercado." },
      { id: "cracha-mifare", num: "02", title: "Crachá Mifare 13.56MHz", desc: "Cartão inteligente (Smart Card) com memória interna." },
      { id: "cracha-barras", num: "03", title: "Crachá Código de Barras", desc: "Com impressão de código de barras protegido." },
      { id: "acessorios", num: "04", title: "Acessórios e Cordões", desc: "Cordões personalizados com a logo, presilhas e protetores rígidos." }
    ],
    addons: [
      { icon: Box, title: "Impressoras de Cartão", desc: "Também vendemos impressoras térmicas Fargo e Datacard para você imprimir crachás na sua própria empresa." }
    ]
  }
};