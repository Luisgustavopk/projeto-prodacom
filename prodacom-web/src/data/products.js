import { 
  ShieldCheck, Fingerprint, Wifi, FileText, Lock, Users, Eye, Zap, 
  HardDrive,Monitor,Printer, Box,Cpu, Layers, Radio, Sparkles, Accessibility, ScanFace 
} from "lucide-react";

// --- IMPORTAÇÃO DAS IMAGENS LOCAIS (Evita bloqueio de servidores externos) ---
// Certifique-se de salvar as imagens correspondentes com esses nomes na pasta assets
import imgF4 from "../../src/assets/images/relogio-de-ponto/facial-f4.jpg";
import imgRepPlus from "../../src/assets/images/relogio-de-ponto/inner-rep-plus.jpg";
import imgIdFace from "../../src/assets/images/controle-de-acesso/idface.jpg";
import imgIdFaceMax from "../../src/assets/images/controle-de-acesso/idface-max.jpg";
import imgIdLockBio from "../../src/assets/images/controle-de-acesso/idlock-bio.png";
import imgIdLock from "../../src/assets/images/controle-de-acesso/idlock.png";
import imgRevolution from "../../src/assets/images/catraca/catraca-revolution.png";
import imgIdBlockNext from "../../src/assets/images/catraca/idblock-next.jpg";
import imgIdBlockPne from "../../src/assets/images/catraca/idblock-pne.jpg";
import imgViggia from "../../src/assets/images/bastao-de-ronda/bastao-viggia.jpg";
import imgFit from "../assets/images/catraca/catraca-fit.png";
import imgBox from "../assets/images/catraca/catraca-box.jpg";
import imgCrachaPvc from "../../src/assets/images/cracha/crachas-pvc.png";
import imgCrachaRfid from "../../src/assets/images/cracha/crachas-rfid.jpg";
import imgIponto from "../../src/assets/images/software/software-iponto.jpg";
import imgIfitness from "../../src/assets/images/software/software-ifitness.jpg";
import imgIcontrol from "../../src/assets/images/software/software-icontrol.jpg";
import imgIclube from "../../src/assets/images/software/software-iclube.jpg";
import imgSchool from "../../src/assets/images/software/software-school.jpg";
import imgRefcontrol from "../../src/assets/images/software/software-refcontrol.jpg";

export const productsData = {
  // ==========================================================================
  // LINHA DE RELÓGIOS DE PONTO ELETRÔNICOS E LEITORES (TOPDATA)
  // ==========================================================================
  
  "leitor-facial-f4": {
    id: "leitor-facial-f4",
    tag: "01 // HARDWARE // TOPDATA // REGISTRO FACIAL",
    title: "Leitor Facial F4 Topdata",
    subtitle: "Reconhecimento Facial com Inteligência Artificial e Detecção de Rosto Vivo",
    description: "O Leitor Facial F4 representa o estado da arte em marcação de ponto e controle de acesso biométrico por imagem. Desenvolvido com algoritmos de Deep Learning e um sistema de câmera dupla binocular, ele é capaz de diferenciar com precisão absoluta um rosto humano real de fotografias em alta definição, vídeos em telas de celular ou máscaras de silicone, anulando qualquer tentativa de fraude no registro de jornada.",
    image: imgF4,
    features: [
      { icon: ScanFace, title: "Tecnologia Liveness (Rosto Vivo)", desc: "Validação tridimensional em tempo real que exige a presença física do colaborador, impedindo o uso de mídias estáticas ou digitais de terceiros." },
      { icon: Sparkles, title: "Velocidade de Processamento", desc: "Varredura e identificação biométrica facial instantânea concluída em menos de 0,2 segundos, eliminando filas nas trocas de turno." },
      { icon: Eye, title: "Iluminação Infravermelha", desc: "Leds IR automáticos integrados que garantem a perfeita identificação do usuário mesmo em ambientes industriais com breu total ou excesso de luz solar." },
      { icon: Wifi, title: "Sincronização Nativa", desc: "Comunicação Ethernet TCP/IP embarcada para atualização imediata dos registros junto aos principais softwares de RH do mercado." }
    ],
    specs: [
      { label: "Algoritmo de Validação", value: "Deep Learning IA com Taxa de Rejeição Falsa (FRR) < 0,1%" },
      { label: "Câmeras de Captura", value: "Sensor Duplo 2 Megapixels (Luz Visível RGB + Espectro Infravermelho IR)" },
      { label: "Capacidade de Rostos", value: "Até 5.000 faces distintas armazenadas localmente em banco de dados" },
      { label: "Capacidade de Registros", value: "Memória flash não-volátil com retenção estável de até 500.000 eventos" },
      { label: "Distância de Reconhecimento", value: "Captação confortável e precisa ajustada de 0,3 metros a 2,0 metros de distância" },
      { label: "Interfaces de Conectividade", value: "Porta de Rede Ethernet RJ45 10/100 Mbps (TCP/IP) e conexão USB 2.0 host" },
      { label: "Modos de Autenticação", value: "Apenas Face, Cartão de Proximidade (RFID 125 kHz), Senha Numérica ou Multi-fatores" },
      { label: "Dimensões do Gabinete", value: "87,5 mm (Largura) × 187,5 mm (Altura) × 26,0 mm (Profundidade)" },
      { label: "Alimentação de Operação", value: "Tensão de 12V DC via Fonte Chaveada Externa Bi-volt (100V a 240V AC)" },
      { label: "Gabinete / Proteção", value: "Estrutura selada de alta resistência mecânica em policarbonato e ABS industrial" }
    ]
  },

  "inner-rep-plus": {
    id: "inner-rep-plus",
    tag: "02 // HARDWARE // TOPDATA // PONTO JURÍDICO",
    title: "Inner REP Plus",
    subtitle: "Relógio de Ponto Eletrônico Homologado pela Portaria 671 do MTE",
    description: "O Inner REP Plus é o equipamento de ponto eletrônico com impressora mais vendido e robusto do mercado. Projetado especificamente para cumprir com todas as exigências legais do Ministério do Trabalho e Emprego (MTE) e certificado pelo INMETRO, ele garante total segurança jurídica contra passivos trabalhistas. Conta com impressora térmica direta industrial de alta velocidade e um compartimento blindado para o rolo de papel de alta autonomia.",
    image: imgRepPlus,
    features: [
      { icon: ShieldCheck, title: "Conformidade Legal Estrita", desc: "Geração automática do arquivo fiscal AFD e assinatura digital padrão ICP-Brasil em todos os tickets de ponto emitidos." },
      { icon: Printer, title: "Guilhotina de Corte Automático", desc: "Mecanismo térmico de alta velocidade que realiza o corte total do papel de forma automática, evitando travamentos ou rasgos pelo usuário." },
      { icon: FileText, title: "Autonomia para 11.000 Tickets", desc: "Compartimento interno generoso que suporta bobinas de papel de até 360 metros de comprimento, minimizando trocas rotineiras." },
      { icon: Monitor, title: "Display Colorido Touchscreen", desc: "Tela de 4.3 polegadas sensível ao toque que orienta o funcionário, mostrando teclado numérico claro e avisos de nível de papel." }
    ],
    specs: [
      { label: "Legislação Atendida", value: "Portaria 671 do MTE (Registrador Eletrônico de Ponto Convencional - REP-C)" },
      { label: "Certificação de Segurança", value: "Homologado e selado individualmente pelo INMETRO" },
      { label: "Mecanismo Impressor", value: "Cabeçote Térmico Direto de 200 mm/s com sensores de fim de papel e travamento" },
      { label: "Capacidade de Funcionários", value: "Banco de dados interno preparado para o cadastro ativo de até 10.000 colaboradores" },
      { label: "Memória Fiscal (MRP)", value: "Memória de Registro Permanente blindada para mais de 8.500.000 de eventos fiscais" },
      { label: "Leitores Biométricos", value: "Módulo LFD Optico (10.000 digitais com leitura de tecido vivo) ou Módulo LC (3.000 digitais)" },
      { label: "Tecnologias de Cartão", value: "Leitor de proximidade RFID 125 kHz Smart ASK, Mifare 13,56 MHz ou Código de Barras" },
      { label: "Alimentação / Rede", value: "Entrada Full Range de 100Vac a 240Vac (50/60Hz), Comunicação nativa TCP/IP e USB Fiscal" },
      { label: "Dimensões Estruturais", value: "326,7 mm (Largura) × 244,0 mm (Altura) × 112,0 mm (Profundidade)" },
      { label: "Peso Líquido", value: "2,22 Kg (Chassi reforçado com furação em matriz para fixação firme em paredes)" }
    ]
  },

  // ==========================================================================
  // LINHA DE CONTROLE DE ACESSO BIOMÉTRICO (CONTROL ID)
  // ==========================================================================

  "idface": {
    id: "idface",
    tag: "03 // ACCESS_CONTROL // CONTROL ID // BIOMETRIA FACIAL",
    title: "iDFace Control iD",
    subtitle: "Controlador de Acesso por Reconhecimento Facial Stand-Alone",
    description: "O iDFace é o controlador de acesso por reconhecimento facial mais moderno do mercado nacional. Equipado com um processador potente e display touchscreen interativo, ele permite gerenciar a abertura de portas, cancelas e torniquetes de maneira totalmente autônoma. Sua interface de software embarcada é configurada nativamente em português (PT-BR), facilitando o cadastro de regras de acesso por horários de departamentos.",
    image: imgIdFace,
    features: [
      { icon: Cpu, title: "Processador Ultra Rápido", desc: "Hardware de alta performance capaz de processar e validar faces locais em frações de segundo." },
      { icon: Monitor, title: "Tela Touchscreen de 3.5\"", desc: "Display LCD TFT colorido que exibe mensagens interativas e permite cadastros rápidos direto no totem ou parede." },
      { icon: Wifi, title: "Wi-Fi Integrado de Fábrica", desc: "Elimina a necessidade de passar cabos de rede longos, conectando-se de forma estável ao roteador da empresa." },
      { icon: Lock, title: "Módulo de Relé Externo", desc: "Acompanha módulo de acionamento isolado que impossibilita aberturas forçadas por vandalismo na fiação externa." }
    ],
    specs: [
      { label: "Capacidade de Rostos", value: "Armazenamento local para até 10.000 faces distintas com sincronização em nuvem" },
      { label: "Capacidade de Usuários", value: "Banco de dados robusto com suporte para até 100.000 usuários totais" },
      { label: "Câmeras de Análise", value: "Sensor duplo integrado Full HD 1080p (Luz visível e espectro infravermelho)" },
      { label: "Mecanismo Liveness", value: "Verificação de profundidade biológica ativa que bloqueia fotos e vídeos" },
      { label: "Interfaces de Comunicação", value: "1 Porta Ethernet TCP/IP RJ45, Wi-Fi integrado e 1 conexão USB Host" },
      { label: "Controle de Dispositivos", value: "1 Relé interno para cargas de até 220VAC/5A + Entrada para sensor de porta aberta e botoeira" },
      { label: "Software Incluso", value: "Web Server embarcado acessível por IP através de qualquer navegador de internet" },
      { label: "Alimentação de Entrada", value: "Exige fonte externa estabilizada de 12V DC (Não inclusa)" },
      { label: "Dimensões do Produto", value: "92,0 mm (Largura) × 151,0 mm (Altura) × 35,0 mm (Profundidade)" },
      { label: "Idiomas do Sistema", value: "Totalmente em Português Brasileiro (PT-BR), Inglês e Espanhol" }
    ]
  },

  "idface-max": {
    id: "idface-max",
    tag: "04 // ACCESS_CONTROL // CONTROL ID // ALTO FLUXO",
    title: "iDFace Max",
    subtitle: "Acesso Facial de Alta Performance para Ambientes Severos",
    description: "O iDFace Max foi projetado para suprir as demandas mais severas de controle de fluxo de pessoas em ambientes industriais, universidades, canteiros de obras e condomínios de grande porte. Traz uma carcaça com engenharia estrutural reforçada e um processador gráfico otimizado para realizar varreduras em bancos de dados massivos com precisão cirúrgica, suportando intempéries e alto tráfego ininterrupto.",
    image: imgIdFaceMax,
    features: [
      { icon: Cpu, title: "Unidade Gráfica Otimizada", desc: "Processador Quad-Core com aceleração por IA que realiza cruzamentos biométricos massivos instantaneamente." },
      { icon: ShieldCheck, title: "Gabinete de Alta Durabilidade", desc: "Construção externa resistente a desgastes físicos continuados e arranhões, ideal para fixação em totens expostos." },
      { icon: Layers, title: "Criptografia Local de Dados", desc: "Segurança absoluta das informações e templates biométricos salvos no hardware, em total conformidade com a LGPD." },
      { icon: Wifi, title: "Interconectividade Industrial", desc: "Entradas e saídas padrão Wiegand nativas para integração limpa com outros leitores leitores escravos." }
    ],
    specs: [
      { label: "Arquitetura do Processador", value: "Processador de 4 núcleos (Quad-Core) com coprocessador de IA integrado" },
      { label: "Capacidade Biométrica", value: "Até 10.000 templates faciais processados em barramento de alta velocidade" },
      { label: "Velocidade de Match", value: "Validação concluída com sucesso em tempo inferior a 0,2 segundos" },
      { label: "Proteção Antifraude", value: "Filtro óptico avançado que bloqueia fraudes por telas digitais AMOLED/LCD ou impressões" },
      { label: "Comunicação Disponível", value: "Porta Ethernet TCP/IP, conexões para relés auxiliares e bornes de acionamento" },
      { label: "Protocolo Auxiliar", value: "Entrada e Saída Wiegand nativas configuráveis" },
      { label: "Tensão de Trabalho", value: "Alimentação estável de 12V DC externa" },
      { label: "Forma de Instalação", value: "Chassi preparado para embutir ou sobrepor em paredes, catracas ou totens verticais" }
    ]
  },

  "idlock-bio": {
    id: "idlock-bio",
    tag: "05 // ACCESS_CONTROL // CONTROL ID // FECHADURA DIGITAL",
    title: "iDLock Biométrica",
    subtitle: "Fechadura Digital Inteligente de Embutir com Maçaneta Biométrica",
    description: "A iDLock Biométrica une a sofisticação do design contemporâneo com o rigor tecnológico da Control iD. Desenvolvida para portas de madeira ou metal de escritórios, salas de reunião e áreas diretivas, ela traz o leitor biométrico posicionado cirurgicamente na maçaneta, permitindo que a leitura da digital e a abertura da porta ocorram em um único movimento natural de mão.",
    image: imgIdLockBio,
    features: [
      { icon: Fingerprint, title: "Leitor Biométrico Anatômico", desc: "O sensor de impressões digitais fica localizado no apoio do polegar da maçaneta, oferecendo abertura ultra ergonômica." },
      { icon: Lock, title: "Mecanismo com Trinco Duplo", desc: "Máquina de embutir robusta em aço com travas mecânicas duplas que garantem proteção física de alto nível contra arrombamentos." },
      { icon: Zap, title: "Alimentação Autônoma por Pilhas", desc: "Funciona de forma independente da rede elétrica usando 4 pilhas AA, eliminando a necessidade de infraestrutura de fios na porta." },
      { icon: Lock, title: "Teclado Touch Iluminado", desc: "Painel numérico de toque com iluminação em LED que acende instantaneamente ao contato da mão." }
    ],
    specs: [
      { label: "Capacidade de Digitais", value: "Armazena na memória local até 500 impressões digitais distintas" },
      { label: "Capacidade de Senhas / RFID", value: "Suporta o cadastro de até 1.000 senhas numéricas e cartões de aproximação" },
      { label: "Tipo de Instalação", value: "Máquina de embutir reforçada de padrão em portas pivotantes ou de abrir tradicionais" },
      { label: "Espessura da Porta Suportada", value: "Compatível com folhas de portas medindo de 35 mm a 55 mm de espessura" },
      { label: "Autonomia de Energia", value: "Alimentada por 4 pilhas alcalinas AA com duração estimada superior a 12 meses" },
      { label: "Alimentação de Emergência", value: "Porta Micro USB externa para conexão de Powerbank caso as pilhas esgotem" },
      { label: "Contingência Mecânica", value: "Acompanha 2 chaves físicas com segredo multiponto para abertura manual de emergência" },
      { label: "Modos de Acesso Disponíveis", value: "Impressão Digital, Cartão de Proximidade RFID, Senha Numérica ou Chave Mecânica" }
    ]
  },

  "idlock": {
    id: "idlock",
    tag: "06 // ACCESS_CONTROL // CONTROL ID // FECHADURA DIGITAL",
    title: "iDLock Teclado",
    subtitle: "Fechadura Digital Inteligente por Senha e Cartão RFID",
    description: "A iDLock por teclado é a solução ideal para gerenciar a segurança de ambientes restritos como almoxarifados, salas de TI, clínicas e laboratórios. Com um acabamento espelhado elegante e chassi em liga metálica de alta densidade, ela permite criar senhas de acesso exclusivas para cada colaborador ou liberar a fechadura por aproximação de crachás corporativos.",
    image: imgIdLock,
    features: [
      { icon: Lock, title: "Senhas Numéricas Exclusivas", desc: "Permite configurar códigos numéricos de acesso individuais para cada funcionário, otimizando o controle." },
      { icon: Layers, title: "Compatibilidade com Crachás", desc: "Leitor de cartões embutido compatível com os cartões de aproximação RFID já existentes na empresa." },
      { icon: ShieldCheck, title: "Trancamento Automático", desc: "Sensores integrados que comandam o disparo dos trincos de segurança 5 segundos após a porta fechar." },
      { icon: Monitor, title: "Acabamento Premium Luxo", desc: "Painel frontal espelhado em acrílico de alta engenharia com maçaneta em liga de zinco cromada." }
    ],
    specs: [
      { label: "Capacidade Total de Usuários", value: "Até 1.000 usuários ativos cadastrados no sistema interno" },
      { label: "Métodos de Liberação", value: "Senha Digital de Toque, Cartão de Proximidade RFID ou Chave Mecânica" },
      { label: "Frequência do Leitor RFID", value: "Disponível em versões com leitor 125 kHz ASK ou Smart Card Mifare 13,56 MHz" },
      { label: "Alimentação de Trabalho", value: "Operação por 4 pilhas alcalinas AA de substituição rápida externa" },
      { label: "Sinalizações do Painel", value: "Avisos sonoros (Bipes) de operação, erro e bip contínuo de pilhas fracas" },
      { label: "Chaves de Contingência", value: "2 chaves físicas de segurança inclusas com segredo inviolável" },
      { label: "Material de Construção", value: "Gabinete frontal em policarbonato e estrutura mecânica em liga de Zinco e Alumínio" },
      { label: "Ambiente Recomendado", value: "Uso interno protegido de chuva (Salas comerciais, escritórios, divisórias)" }
    ]
  },

  // ==========================================================================
  // LINHA DE CATRACAS ELETRÔNICAS (TOPDATA & CONTROL ID)
  // ==========================================================================

  "catraca-revolution": {
    id: "catraca-revolution",
    tag: "07 // CATRACAS // TOPDATA // BARREIRA FISICA",
    title: "Catraca Revolution Topdata",
    subtitle: "Catraca Eletrônica Pedestal de Alta Resistência Mecânica",
    description: "A Catraca Revolution é o equipamento ideal para controle de acesso físico em locais que exigem alta resistência mecânica e ótimo custo-benefício. Construída com pedestal em aço carbono com pintura eletrostática e tampo superior em aço inox escovado, ela suporta o tráfego pesado de portarias industriais, recepções de edifícios comerciais e academias sem apresentar desgastes.",
    image: imgRevolution,
    features: [
      { icon: ShieldCheck, title: "Mecanismo com Amortecedor", desc: "Sistema interno hidráulico de amortecimento de giro que neutraliza impactos, tornando a passagem suave e silenciosa." },
      { icon: Users, title: "Bloqueio Anti-Carona", desc: "Sensores ópticos de precisão que travam o braço imediatamente após o giro da pessoa autorizada, impedindo passagens duplas." },
      { icon: Lock, title: "Braço Articulado (Opcional)", desc: "Suporta a instalação do braço antipânico que cai automaticamente para a posição vertical em casos de falta de energia." },
      { icon: Layers, title: "Urna Coletora de Crachás", desc: "Design preparado para receber cofre interno opcional com fenda superior para reter cartões de visitantes." }
    ],
    specs: [
      { label: "Alimentação Elétrica", value: "Entrada Full Range chaveada automática de 100V a 240V AC 50/60Hz" },
      { label: "Consumo de Operação", value: "Consumo extremamente reduzido medindo apenas 17 Watts ativos" },
      { label: "Durabilidade da Mecânica", value: "Mecanismo central testado em laboratório para suportar mais de 3.000.000 de giros" },
      { label: "Capacidade de Eventos", value: "Memória flash interna capaz de armazenar até 30.000 marcações em modo offline" },
      { label: "Lista de Usuários Local", value: "Permite reter e validar de forma stand-alone até 15.000 cartões/digitais" },
      { label: "Leitores Homologados", value: "Biometria Digital (LC/LFD), Leitores de Reconhecimento Facial, QR Code ou RFID" },
      { label: "Dimensões sem Braços", value: "255,0 mm (Largura) × 1060,0 mm (Altura) × 375,0 mm (Profundidade)" },
      { label: "Dimensões com Braços", value: "690,0 mm (Largura) × 1060,0 mm (Altura) × 795,0 mm (Profundidade) | Peso: 30 Kg" }
    ]
  },

  "idblock-next": {
    id: "idblock-next",
    tag: "08 // CATRACAS // CONTROL ID // TECNOLOGIA TOUCH",
    title: "iDBlock Next Control iD",
    subtitle: "Catraca Eletrônica Pedestal com Display Touchscreen e Giro Motorizado",
    description: "A iDBlock Next revoluciona o segmento de barreiras físicas corporativas. Trazendo um visual limpo e futurista, ela é equipada com um display touchscreen colorido e amigável em português (PT-BR) integrado ao tampo. Seu grande diferencial é o mecanismo de giro assistido por motor, que acompanha de forma suave o empurrão do usuário, tornando o fluxo de passagem extremamente leve e luxuoso.",
    image: imgIdBlockNext,
    features: [
      { icon: Monitor, title: "Display Touchscreen Colorido", desc: "Tela LCD colorida integrada que exibe mensagens institucionais claras e permite gerenciar o sistema diretamente na catraca." },
      { icon: Zap, title: "Giro Assistido Motorizado", desc: "Motor de passo silencioso de última geração que suaviza o movimento dos braços, eliminando o tranco físico tradicional." },
      { icon: Fingerprint, title: "Biometria Óptica Avançada", desc: "Leitor de digitais de alta resolução integrado ao gabinete para validações rigorosas à prova de fraudes." },
      { icon: Wifi, title: "Software Web Embarcado", desc: "A catraca possui um servidor web interno completo. Gerencie usuários e extraia relatórios de acesso direto pelo navegador." }
    ],
    specs: [
      { label: "Capacidade de Usuários", value: "Banco de dados interno preparado para até 200.000 usuários cadastrados" },
      { label: "Capacidade de Digitais", value: "Armazenamento local para até 10.000 impressões digitais distintas" },
      { label: "Interface de Operação", value: "Ecrã Touchscreen LCD colorido capacitivo com proteção contra riscos" },
      { label: "Mecanismo de Rota de Fuga", value: "Sistema integrado de braço cadente automático em conformidade com normas de bombeiros" },
      { label: "Urna Coletora de Cartões", value: "Cofre coletor de crachás embutido na coluna com sensores ópticos de queda" },
      { label: "Interfaces de Rede", value: "1 Porta Ethernet TCP/IP RJ45, suporte nativo a Wi-Fi e barramento Wiegand" },
      { label: "Relés Auxiliares", value: "Conexões prontas para acionamento de sirenes de turnos, alarmes e botoeiras externas" },
      { label: "Material de Acabamento", value: "Coluna estrutural em aço carbono com pintura eletrostática preta e tampo em inox" }
    ]
  },

  "idblock-pne": {
    id: "idblock-pne",
    tag: "09 // CATRACAS // CONTROL ID // ACESSIBILIDADE",
    title: "iDBlock PNE",
    subtitle: "Catraca Eletrônica de Acessibilidade Homologada NBR 9050",
    description: "A iDBlock PNE foi desenvolvida sob os mais rígidos critérios de acessibilidade arquitetônica para garantir a passagem digna e confortável de cadeirantes e pessoas com mobilidade reduzida. Em total conformidade com a norma ABNT NBR 9050, ela dispensa o pedestal tradicional, adotando uma estrutura estendida em aço inox escovado com braço longo pivotante motorizado bidirecional.",
    image: imgIdBlockPne,
    features: [
      { icon: Accessibility, title: "Vão Livre Normatizado NBR 9050", desc: "Dimensões e raios de giro projetados de forma exata para a travessia segura de cadeiras de rodas e andadores." },
      { icon: ShieldCheck, title: "Barreira Anti-Esmagamento", desc: "Sensores ópticos infravermelhos inteligentes que monitoram o vão e impedem o fechamento do braço enquanto o usuário estiver passando." },
      { icon: Monitor, title: "Orientação por LEDs Superiores", desc: "Pictogramas luminosos e avisos na tela que orientam o usuário sobre a liberação e o sentido permitido de fluxo." },
      { icon: Cpu, title: "Eletrônica Integrada iDBlock", desc: "Compartilha da mesma tecnologia e banco de dados das catracas da empresa, unificando a gestão de relatórios." }
    ],
    specs: [
      { label: "Normativa Atendida", value: "Homologada em conformidade estrita com as leis de acessibilidade ABNT NBR 9050" },
      { label: "Mecanismo de Barreira", value: "Braço longo em aço inoxidável com abertura por acionamento pivotante suave motorizado" },
      { label: "Controle de Fluxo", value: "Operação Bidirecional inteligente (Gerencia entradas e saídas no mesmo vão livre)" },
      { label: "Sincronização de Cadastro", value: "Banco de dados local unificado para até 200.000 usuários em rede corporativa" },
      { label: "Métodos de Autenticação", value: "Biometria Digital, Cartão RFID, Senha ou integração com Terminais Faciais adicionais" },
      { label: "Interface de Rede", value: "Porta Ethernet TCP/IP nativa com servidor web interno para gerenciamento limpo" },
      { label: "Tensão de Alimentação", value: "Exige alimentação 12V DC via fonte externa inclusa" },
      { label: "Material do Gabinete", value: "Estrutura robusta construída inteiramente em Aço Inoxidável AISI 304 escovado" }
    ]
  },

  // ==========================================================================
  // LINHA DE BASTÕES DE RONDA ELETRÔNICOS (TOPDATA)
  // ==========================================================================

  "bastao-viggia": {
    id: "bastao-viggia",
    tag: "10 // BASTÃO DE RONDA // TOPDATA // AUDITORIA SEGURANÇA",
    title: "Bastão de Ronda Viggia Topdata",
    subtitle: "Sistema Eletrônico Portátil de Auditoria e Supervisão de Vigilantes",
    description: "O Viggia é a ferramenta definitiva para garantir a eficiência das rotas de vigilância patrimonial em indústrias, condomínios e postos de segurança. Totalmente portátil e blindado, ele elimina fraudes e relatórios manuais de papel: o vigilante faz a leitura de botões metálicos inteligentes (iButtons) fixados nos locais de inspeção. Os dados são processados e consolidados em relatórios gerenciais claros que apontam horários exatos, atrasos ou postos pulados na rota.",
    image: imgViggia,
    features: [
      { icon: HardDrive, title: "Blindagem Militar Anti-Choque", desc: "Corpo interno construído em liga de alumínio aeroespacial revestido por uma espessa luva de borracha que absorve quedas brutas." },
      { icon: ShieldCheck, title: "Impermeabilidade Total IP67", desc: "Estrutura 100% selada contra a entrada de poeira ou água. Projetado para operar em patrulhas externas sob temporais intensos." },
      { icon: FileText, title: "Memória Fiscal Anti-Fraude", desc: "Circuito interno inteligente que registra a data e hora exata caso o equipamento sofra impactos violentos ou tentativas de violação." },
      { icon: Monitor, title: "Software TopRonda Oficial", desc: "Geração imediata de gráficos e relatórios detalhados das rondas executadas através de um software homologado de fácil operação." }
    ],
    specs: [
      { label: "Tecnologia de Captação", value: "Leitura digital por contato mecânico físico em iButtons metálicos de código único em série" },
      { label: "Capacidade de Eventos", value: "Memória flash interna não-volátil estável para reter até 4.094 registros de postos" },
      { label: "Cabo de Comunicação", value: "Interface via Cabo USB com conector magnético blindado de alta velocidade" },
      { label: "Sinalizações Operacionais", value: "Confirmação de leitura bem-sucedida por Alerta Sonoro (Bip) e indicação por LED luminoso" },
      { label: "Tipo de Bateria", value: "Bateria interna de Lítio não-recarregável de altíssima autonomia (Substituível pela assistência)" },
      { label: "Autonomia Estimada", value: "Capacidade de carga projetada para realizar até 350.000 leituras de postos de checagem" },
      { label: "Peso do Equipamento", value: "Apenas 165 gramas (Desenho cilíndrico altamente portátil e ergonômico para o vigilante)" },
      { label: "Acessórios Compatíveis", value: "Suporta fixação de iButtons em bases de parede, tags de identificação de vigias e coldres de nylon" }
    ]
  },

  // ==========================================================================
  // NOVAS CATRACAS ADICIONADAS (TOPDATA)
  // ==========================================================================

  "catraca-fit": {
    id: "catraca-fit",
    tag: "11 // CATRACAS // TOPDATA // ACESSO COMPACTO",
    title: "Catraca Fit",
    subtitle: "Catraca de Acesso Compacta e Versátil",
    description: "Com seu design atual e dimensões super compactas, a catraca Fit se adapta perfeitamente a qualquer ambiente, mesmo com restrição de espaço na portaria. É a solução de entrada com excelente custo-benefício para gerenciar e organizar o fluxo de pessoas em academias, escolas, clubes e condomínios com alta segurança.",
    image: imgFit,
    features: [
      { icon: Layers, title: "Design Otimizado", desc: "Estrutura inteligente tipo pedestal que ocupa pouquíssimo espaço, ideal para recepções menores sem perder a eficiência de bloqueio." },
      { icon: Wifi, title: "Operação Autônoma", desc: "Funciona perfeitamente de forma integrada (online) ao seu sistema, ou de forma totalmente offline (stand-alone) mantendo as regras de acesso se a rede cair." },
      { icon: Fingerprint, title: "Múltiplas Tecnologias", desc: "Altamente customizável, podendo ser equipada de fábrica com leitores de impressão digital, cartões de aproximação RFID ou leitor de QR Code." },
      { icon: Box, title: "Acessórios Opcionais", desc: "Mesmo sendo compacta, suporta a instalação de urna coletora de crachás e braço articulado antipânico para rotas de saída de emergência." }
    ],
    specs: [
      { label: "Material da Estrutura", value: "Pedestal e braços tubulares fabricados em aço carbono reforçado com pintura epóxi anticorrosiva" },
      { label: "Modos de Operação", value: "Online via rede TCP/IP ou Offline mantendo o banco de regras e biometrias na memória interna" },
      { label: "Leitores de Autenticação", value: "Suporta Módulo Biométrico, Cartões de Proximidade (125kHz), Smart Card (Mifare) ou Código de Barras/QR Code" },
      { label: "Mecanismo de Bloqueio", value: "Sistema clássico de 3 braços com giro mecânico direcional de fluxo" },
      { label: "Tempo de Liberação", value: "Processamento rápido com liberação em aproximadamente 1 segundo e travamento imediato do eixo pós-giro" }
    ]
  },

  "catraca-box": {
    id: "catraca-box",
    tag: "12 // CATRACAS // TOPDATA // ALTO PADRÃO INOX",
    title: "Catraca Box (Inox)",
    subtitle: "Catraca Balcão de Alta Segurança e Estética Premium",
    description: "A catraca Box une a estética sofisticada do aço inoxidável à confiabilidade mecânica extrema. Construída no formato balcão (tipo cofre), o seu visual imponente transmite uma forte percepção de segurança aos usuários, inibindo invasões. É a escolha definitiva para recepções corporativas de alto padrão, universidades, estádios e ambientes diferenciados.",
    image: imgBox,
    features: [
      { icon: ShieldCheck, title: "Estrutura Tipo Cofre", desc: "Gabinete fechado de formato alongado que oferece uma barreira física mais robusta, inibindo com eficácia as tentativas de pular a catraca." },
      { icon: Eye, title: "Acabamento Premium", desc: "Linhas modernas que valorizam a arquitetura do local, contando com tampo em aço inox e opções de gabinete 100% inoxidável." },
      { icon: Layers, title: "Amplo Espaço Interno", desc: "Acomoda facilmente placas controladoras de terceiros, cabeamento pesado de rede e urna coletora de grande volume." },
      { icon: Lock, title: "Mecânica Inteligente", desc: "Sistema avançado de amortecimento do giro e travamento anti-carona desenvolvido para suportar tráfego agressivo e massivo." }
    ],
    specs: [
      { label: "Acabamento Estrutural", value: "Tampo superior sempre em Aço Inox. Gabinete inferior disponível em Aço Carbono ou 100% Inox AISI 304" },
      { label: "Formatos de Identificação", value: "Módulo nativo para Reconhecimento Facial, Biometria Digital, Cartões RFID, QR Code ou Teclado Numérico" },
      { label: "Cenário de Aplicação", value: "Ambientes com arquitetura de alto padrão ou áreas de fluxo muito pesado que exigem barreira física robusta" },
      { label: "Sistema de Segurança", value: "Bloqueio eletromecânico anti-carona integrado que impede múltiplas passagens com uma única liberação" },
      { label: "Módulo para Visitantes", value: "Pode receber uma urna coletora frontal de alta capacidade para o recolhimento e validação de crachás na saída" }
    ]
  },
  // ==========================================================================
  // CRACHÁS E CARTÕES DE PROXIMIDADE (PRODACOM)
  // ==========================================================================
  
  "crachas-pvc": {
    id: "crachas-pvc",
    tag: "13 // HARDWARE // PRODACOM // IDENTIFICAÇÃO",
    title: "Crachás PVC e Cartões de Proximidade",
    subtitle: "Identificação Visual Corporativa e Chave de Acesso Eletrônico",
    description: "A linha de crachás e cartões em PVC da Prodacom une alta qualidade de acabamento gráfico com o que há de mais confiável em tecnologia de radiofrequência (RFID). Ideais para transmitir profissionalismo e seriedade, eles atuam como a identidade física do colaborador dentro da empresa e servem como chave de liberação eletrônica para relógios de ponto, catracas e fechaduras digitais, garantindo auditoria e controle de fluxo.",
    image: imgCrachaPvc,
    features: [
      { icon: ShieldCheck, title: "PVC de Alta Durabilidade", desc: "Material resistente a dobras, umidade e atritos cotidianos, garantindo longa vida útil e menor taxa de reposição." },
      { icon: Radio, title: "Chips RF-ID de Aproximação", desc: "Integração nativa com antenas de rádio frequência nas frequências 125 kHz ou 13,56 MHz (Mifare) para leitura sem contato." },
      { icon: Users, title: "Modelos para Visitantes", desc: "Estruturação de layouts genéricos reutilizáveis com códigos em série para triagem rápida em recepções e portarias corporativas." }
    ],
    specs: [
      { label: "Material de Construção", value: "PVC (Cloreto de Polivinila) Virgem Premium com laminação de proteção anti-riscos" },
      { label: "Tecnologias de Proximidade", value: "Disponível com chip RFID 125 kHz (ASK/Smart) ou Smart Card Mifare 13,56 MHz" },
      { label: "Formatos de Customização", value: "Impressão térmica colorida de alta resolução (frente ou frente/verso) para fotos e logos" },
      { label: "Elementos de Código", value: "Compatível com inserção de Código de Barras (25, 39, 128), QR Code ou Numeração em Série" },
      { label: "Dimensões do Cartão", value: "Padrão Financeiro ISO CR-80 (86 mm × 54 mm) com espessura padrão de 0,76 mm" },
      { label: "Opções de Perfuração", value: "Opção de furo ovoide (vertical ou horizontal) direto na matriz para fixação de presilhas" },
      { label: "Acessórios Disponíveis", value: "Compatível com cordões personalizados, porta-crachás rígidos (Protetores) e clipes jacaré" }
    ]
  },
  "crachas-rfid": {
    id: "crachas-rfid",
    tag: "14 // HARDWARE // PRODACOM // ACESSO SEM CONTATO",
    title: "Cartões de Proximidade RFID",
    subtitle: "Tags, Chaveiros e Cartões Inteligentes de Radiofrequência",
    description: "Os cartões e tags de proximidade RFID (Radio-Frequency Identification) são os dispositivos de liberação mais práticos e seguros para o controle de tráfego diário. Diferente dos sistemas de tarja magnética ou código de barras, a tecnologia RFID realiza a leitura dos dados por indução eletromagnética sem a necessidade de contato físico com o leitor. Isso elimina o desgaste mecânico dos equipamentos e dos próprios cartões, garantindo uma operação ultra veloz em portarias, condomínios e almoxarifados.",
    image: imgCrachaRfid, // Pode usar a mesma imagem de crachás ou criar um import específico para tags/chaveiros
    features: [
      { icon: Radio, title: "Leitura Sem Contato Físico", desc: "Aproximação rápida a uma distância de até 10cm do leitor para liberação mecânica imediata de catracas e fechaduras." },
      { icon: Lock, title: "Código Único Inviolável", desc: "Cada chip sai de fábrica com um número de ID exclusivo gravado em sua memória interna, impedindo clonagens e falsificações." },
      { icon: Box, title: "Formatos Customizáveis", desc: "Disponível no formato clássico de cartão ISO (branco ou impresso), chaveiros em resina (Tags) ou pulseiras de silicone." }
    ],
    specs: [
      { label: "Frequências de Operação", value: "Disponível em Baixa Frequência (125 kHz ASK/Smart) ou Alta Frequência (13,56 MHz Mifare)" },
      { label: "Distância Operacional", value: "Captação estável por indução magnética variando de 2 cm a 10 cm de distância do sensor" },
      { label: "Memória Interna (Mifare)", value: "Módulo Smart Card com memória EEPROM de 1K Byte dividida em 16 setores protegidos por senha" },
      { label: "Vida Útil do Chip", value: "Mecanismo eletrônico passivo (sem bateria) projetado para suportar mais de 100.000 ciclos de leitura" },
      { label: "Formatos de Gabinete", value: "Cartão Clássico CR-80, Chaveiro Clamshell rígido ou Tag Resinada com argola metálica" },
      { label: "Compatibilidade de Rede", value: "Homologado para funcionamento nativo com toda a linha Topdata, Control iD e Inspell Softwares" },
      { label: "Temperatura de Operação", value: "Resistência térmica industrial testada para funcionar de -10°C até 55°C" }
    ]
  },

  // ==========================================================================
  // LINHA DE SOFTWARES DE GESTÃO (INSPELL)
  // ==========================================================================

  "software-iponto": {
    id: "software-iponto",
    tag: "15 // SOFTWARE // INSPELL // CONTROLE DE PONTO",
    title: "iPonto Plus",
    subtitle: "Sistema de Tratamento de Ponto Eletrônico e Gestão de Jornada",
    description: "O iPonto Plus oferece o mais alto nível de automação jurídica e operacional para o fechamento de folhas de ponto. Desenvolvido em total conformidade com a CLT e as exigências fiscais da Portaria 671 do MTE, o sistema simplifica o tratamento de exceções do dia a dia, automatiza cálculos complexos de horas extras e adicionais noturnos, e gera relatórios de auditoria transparentes para resguardar a empresa contra passivos trabalhistas.",
    image: imgIponto,
    features: [
      { icon: FileText, title: "Tratamento de Exceções Fácil", desc: "Painel intuitivo e centralizado para lançamentos rápidos de abonos, justificativas de faltas, atestados médicos e dispensas." },
      { icon: Sparkles, title: "Banco de Horas Avançado", desc: "Cálculo e compensação automatizada de saldos de créditos e débitos de horas com base nas regras do acordo sindical." },
      { icon: ScanFace, title: "Módulo iPonto Mobile", desc: "Suporte para marcação de ponto externa por aplicativo via smartphone com validação por geolocalização e reconhecimento facial." }
    ],
    specs: [
      { label: "Legislação Atendida", value: "Homologado sob a Portaria MTE 671 (Modelos REP-C, REP-A e REP-P)" },
      { label: "Mecanismo de Banco", value: "Arquitetura baseada em Firebird SQL Relacional (Sem custos adicionais de licença)" },
      { label: "Formatos de Importação", value: "Leitura automática de arquivos fiscais AFD gerados por qualquer relógio de ponto homologado" },
      { label: "Regras de Escala", value: "Suporte a escalas complexas (12x36, 6x2, regimes de revezamento, horários flexíveis e móveis)" },
      { label: "Integração de Folha", value: "Exportação nativa de arquivos de eventos configurados para os principais sistemas de folha de pagamento" },
      { label: "Rotina de Segurança", value: "Gerenciamento estrito de permissões de usuários com logs internos de auditoria para cada alteração" }
    ]
  },

  "software-ifitness": {
    id: "software-ifitness",
    tag: "16 // SOFTWARE // INSPELL // GESTÃO FITNESS",
    title: "iFitness",
    subtitle: "Gerenciamento Completo de Academias, Studios e Boxes de Crossfit",
    description: "O iFitness é uma solução completa desenvolvida para profissionalizar a gestão de negócios fitness. O software integra ferramentas financeiras avançadas com um controle de acesso rigoroso via catracas, automatizando tarefas administrativas e focando no aumento de receitas através de rotinas de retenção, controle de inadimplência e renovações de matrículas.",
    image: imgIfitness,
    features: [
      { icon: Users, title: "Controle de Acesso Inteligente", desc: "Restrição automática baseada em planos de horários, modalidades contratadas ou mensagens de alerta no visor da catraca." },
      { icon: FileText, title: "Avaliação e Treinos", desc: "Módulo integrado para prescrição de fichas de musculação e avaliações físicas com envio automatizado por e-mail." },
      { icon: Zap, title: "Gestão Antiinadimplência", desc: "Bloqueio automático de passagem física na barreira caso o aluno possua parcelas ou mensalidades vencidas." }
    ],
    specs: [
      { label: "Módulos Financeiros", value: "Controle de Caixa diário, contas a pagar/receber, cheques, cartões de crédito e controle de estoque de produtos" },
      { label: "Integração com Catracas", value: "Comunicação nativa bidirecional com catracas Topdata e Control iD em tempo real" },
      { label: "Layout de Crachás", value: "Ferramenta interna integrada para criação e emissão de cartões com código de barras para alunos" },
      { label: "Gestão de Planos", value: "Configuração flexível de pacotes (Mensal, Trimestral, Anual), trancamento de matrículas e taxas de adesão" },
      { label: "Infraestrutura Mínima", value: "Instalação local em sistema operacional Windows 10 ou superior com backup local automatizado" }
    ]
  },

  "software-icontrol": {
    id: "software-icontrol",
    tag: "17 // SOFTWARE // INSPELL // SEGURANÇA AMBIENTES",
    title: "iControl",
    subtitle: "Software de Segurança e Controle de Acesso de Pedestres e Veículos",
    description: "Focado em segurança de perímetros e alta velocidade de resposta, o iControl gerencia o fluxo de pessoas em ambientes de acesso restrito, tais como condomínios empresariais, indústrias e estacionamentos privados. O sistema realiza sincronizações biométricas on-line instantâneas, garantindo que cadastros efetuados na secretaria se reflitam nos terminais de barreira no mesmo segundo.",
    image: imgIcontrol,
    features: [
      { icon: Fingerprint, title: "Biometria On-line Direta", desc: "Envio e exclusão de digitais e dados faciais direto para a memória das catracas sem necessidade de comandos manuais." },
      { icon: Users, title: "Cadastro Geral Unificado", desc: "Fichas completas com captura de fotos por webcam, documentos e agrupamento por empresas ou blocos." },
      { icon: Lock, title: "Controle de Visitantes", desc: "Módulo ágil para liberação de prestadores de serviços com definição estrita de data e horários de validade." }
    ],
    specs: [
      { label: "Sincronização de Dispositivos", value: "Gerenciamento simultâneo e em rede de múltiplas catracas, cancelas de veículos e portas" },
      { label: "Monitoramento de Fluxo", value: "Painel operacional na tela exibe a foto, nome e local de passagem no exato momento do acesso" },
      { icon: Lock, label: "Módulo Estacionamento", desc: "Controle de vagas associadas e fluxo de veículos não tarifado integrado à ficha de usuários" },
      { label: "Módulo Web Auxiliar", value: "Acesso opcional via navegador de internet para consultas de relatórios e manutenções cadastrais básicas" },
      { label: "Segurança de Arquivos", value: "Base de dados Firebird SQL estável contra quedas repentinas de energia e corrupção de arquivos" }
    ]
  },

  "software-iclube": {
    id: "software-iclube",
    tag: "18 // SOFTWARE // INSPELL // CLUBES E ASSOCIAÇÕES",
    title: "iClube",
    subtitle: "Sistema Integrado de Gestão para Clubes, Agremiações e Associações",
    description: "O iClube foi meticulosamente desenhado para gerenciar os complexos fluxos administrativos de associações e agremiações de qualquer escala. Centraliza desde o controle de cotas de sócios e cobranças de mensalidades até a segurança rigorosa de portarias, impedindo o acesso de pessoas inadimplentes ou não autorizadas sem gerar atritos no fluxo social.",
    image: imgIclube,
    features: [
      { icon: Layers, title: "Gestão de Cotas e Títulos", desc: "Controle patrimonial completo de títulos, joias, transferências de propriedade e árvore de dependentes." },
      { icon: Monitor, title: "Validação Visual na Portaria", desc: "Interface gráfica de guarita que projeta instantaneamente a foto e a situação financeira do sócio ao girar a catraca." },
      { icon: Users, title: "Emissão de Convites Rápidos", desc: "Gerenciamento estrito de convidados com limites de cotas por sócio e controle de acessos em eventos específicos." }
    ],
    specs: [
      { label: "Controle Financeiro", value: "Emissão de mensalidades, integração bancária para boletos, taxas de serviços e controle de caixas de pontos de venda" },
      { label: "Gestão Médica / Exames", value: "Módulo de bloqueio na catraca para acessos a áreas restritas (ex: piscinas) baseado na validade do exame médico" },
      { label: "Comunicação em Rede", value: "Suporte a funcionamento multi-estações (Secretaria, Portaria, Diretoria compartilhando o mesmo banco)" },
      { label: "Extração de Relatórios", value: "Filtros gerenciais de inadimplência, frequência por faixa horária, estatísticas de convidados e auditorias" }
    ]
  },

  "software-school": {
    id: "software-school",
    tag: "19 // SOFTWARE // INSPELL // AUTOMAÇÃO ESCOLAR",
    title: "School Control",
    subtitle: "Software de Gestão Pedagógica, Administrativa e Segurança Escolar",
    description: "O School Control oferece uma abordagem de 360 graus para instituições de ensino. O sistema unifica a gestão escolar tradicional (notas, faltas e boletins) com um ecossistema rígido de controle de portaria por catracas biométricas, trazendo tranquilidade aos gestores e gerando um diferencial competitivo de segurança percebida altamente valorizado pelos pais.",
    image: imgSchool,
    features: [
      { icon: Wifi, title: "Notificação de Fluxo aos Pais", desc: "Disparo automatizado de alertas de SMS ou e-mail notificando os responsáveis sobre o horário exato de entrada ou saída." },
      { icon: Lock, title: "Saída Restrita e Validada", desc: "Bloqueio inteligente que impede a saída de alunos menores de idade, liberando a catraca apenas com a digital do responsável." },
      { icon: FileText, title: "Painel Coordenador Eletrônico", desc: "Sistema integrado para organizar e agilizar as filas de saída na portaria no momento de pico de chegada dos veículos." }
    ],
    specs: [
      { label: "Escopo Pedagógico", value: "Lançamento de diários de classe, controle de notas, faltas, histórico escolar, disciplinas e boletins" },
      { label: "Gestão de Matrículas", value: "Controle de contratos, faturamento de mensalidades, taxas de material e controle de renegociações de débitos" },
      { label: "Segurança de Acesso", value: "Configuração de bloqueio por turnos e dias letivos, impedindo o trânsito de alunos fora do horário de aula" },
      { label: "Tecnologia de Conexão", value: "Conexão direta com módulos de catracas mecânicas e totens faciais instalados nos portões escolares" }
    ]
  },

  "software-refcontrol": {
    id: "software-refcontrol",
    tag: "20 // SOFTWARE // INSPELL // CONTROLE REFEITÓRIOS",
    title: "RefControl",
    subtitle: "Software de Gerenciamento e Controle de Refeitórios Industriais",
    description: "O RefControl é o sistema líder de mercado para auditoria e controle de consumo em refeitórios corporativos. Desenvolvido para empresas que fornecem refeições subsidiadas aos seus colaboradores, ele elimina desperdícios, fraudes de consumo duplo e erros de contagem, realizando a gestão através de restrições rígidas baseadas em escalas de trabalho, turnos e créditos pré-carregados.",
    image: imgRefcontrol,
    features: [
      { icon: ShieldCheck, title: "Bloqueio por Turnos e Férias", desc: "Lógica automatizada que impede o acesso ao refeitório caso o funcionário esteja de folga, férias ou fora do horário de refeição." },
      { icon: Box, title: "Controle Regressivo de Vendas", desc: "Subtração automática e em tempo real de créditos de refeições pré-carregados na ficha ou crachá do usuário a cada giro." },
      { icon: Monitor, title: "Gestão Multi-Catracas", desc: "Um único servidor central gerencia simultaneamente várias barreiras físicas instaladas em diferentes pontos de distribuição." }
    ],
    specs: [
      { label: "Métodos de Validação", value: "Suporte a leitores de Reconhecimento Facial, Impressão Digital (LFD antifraude) ou Crachás RFID" },
      { label: "Auditoria de Consumo", value: "Registro estrito com logs permanentes para conferência de notas fiscais de empresas terceirizadas de catering" },
      { label: "Modo Emergencial Manual", value: "Permite o lançamento manual de refeições via teclado do operador com justificativa obrigatória para auditoria" },
      { label: "Relatórios Exportáveis", value: "Geração de balanços de consumo por centro de custo, relatórios por período e exportações para desconto em folha" },
      { label: "Estabilidade do Sistema", value: "Suporte a contingência offline (As catracas continuam validando o turno caso falte rede com o servidor)" }
    ]
  }
};