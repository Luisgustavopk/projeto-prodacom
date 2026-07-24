import nodemailer from 'nodemailer';

interface DadosOrcamento {
  nome: string;
  empresa?: string;
  email: string;
  telefone?: string;
  segmento?: string;
  mensagem: string;
}

interface DadosNovoClienteChat {
  nome: string;
  contato: string;
  mensagem: string;
}

interface DadosMensagemPendente {
  nome: string;
  contato: string;
  mensagem: string;
  tempoAguardando: string;
}

export const emailService = {
  
  async enviarEmailOrcamento(dados: DadosOrcamento) {
    
  
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   
    const htmlBodyComercial = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0056b3; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Novo Orçamento via Site</h2>
        </div>
        
        <div style="padding: 20px;">
          <p style="margin: 5px 0;"><strong>Nome:</strong> ${dados.nome}</p>
          <p style="margin: 5px 0;"><strong>Empresa:</strong> ${dados.empresa || 'Não informada'}</p>
          <p style="margin: 5px 0;"><strong>E-mail:</strong> ${dados.email}</p>
          <p style="margin: 5px 0;"><strong>Telefone:</strong> ${dados.telefone || 'Não informado'}</p>
          <p style="margin: 5px 0;"><strong>Segmento:</strong> ${dados.segmento || 'Não informado'}</p>
          
          <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          
          <h3 style="margin-top: 0; color: #0056b3;">Mensagem / Necessidade:</h3>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0056b3; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; word-break: break-word; line-height: 1.6;">${dados.mensagem}</p>
        </div>
        
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
          Este e-mail foi gerado e processado automaticamente pelo servidor da Prodacom.
        </div>
      </div>
    `;

    
    const htmlBodyCliente = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1e293b; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Solicitação Recebida!</h2>
        </div>
        
        <div style="padding: 20px; line-height: 1.6;">
          <p>Olá, <strong>${dados.nome}</strong>,</p>
          <p>Recebemos o seu pedido de orçamento com sucesso! A nossa equipe de consultores da <strong>Prodacom</strong> já está analisando as suas necessidades e entrará em contato muito em breve.</p>
          
          <p>Aqui está uma cópia da sua mensagem para o seu histórico:</p>
          <blockquote style="background: #f8fafc; border-left: 4px solid #0056b3; padding: 12px 15px; margin: 15px 0; font-style: italic; color: #475569; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; word-break: break-word;">
            ${dados.mensagem}
          </blockquote>
          
          <p>Agradecemos desde já pelo seu interesse em nossas soluções corporativas.</p>
          <p>Atenciosamente,<br><strong>Equipe Comercial — Prodacom</strong></p>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #64748b;">
          Este é um e-mail automático gerado pelo nosso sistema. Por favor, não responda diretamente a esta mensagem.
        </div>
      </div>
    `;

    
    const resultados = await Promise.all([
      
    
      transporter.sendMail({
        from: `"Prodacom" <${process.env.EMAIL_USER}>`, 
        to: process.env.EMAIL_USER,                    
        bcc: "comercial@prodacom.com.br",             
        replyTo: dados.email,                         
        subject: `Novo Orçamento - ${dados.nome} ${dados.empresa ? `(${dados.empresa})` : ''}`,
        html: htmlBodyComercial,
      }),

      
      transporter.sendMail({
        from: `"Prodacom" <${process.env.EMAIL_USER}>`, 
        to: dados.email,                                
        subject: "Recebemos o seu pedido de orçamento - Prodacom",
        html: htmlBodyCliente,
      })

    ]);

    
    console.log("[COMERCIAL] Cópia encaminhada com sucesso! ID:", resultados[0].messageId);
    console.log("[CLIENTE] Auto-resposta entregue com sucesso! ID:", resultados[1].messageId);
  },

  async enviarNotificacaoNovoClienteChat(dados: DadosNovoClienteChat) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2563eb; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">🚨 Novo Cliente no Chat</h2>
          </div>
          <div style="padding: 20px;">
            <p style="margin: 5px 0;"><strong>Nome:</strong> ${dados.nome}</p>
            <p style="margin: 5px 0;"><strong>WhatsApp/Contato:</strong> ${dados.contato}</p>
            <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 15px 0;" />
            <h3 style="margin-top: 0; color: #2563eb;">Primeira Mensagem:</h3>
            <p style="background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">${dados.mensagem}</p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Chat Prodacom" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        bcc: "comercial@prodacom.com.br",
        subject: `Novo Atendimento - ${dados.nome}`,
        html: htmlBody,
      });
    } catch (error) {
      console.error("[EMAIL CHAT] Erro ao enviar e-mail de novo cliente:", error);
    }
  },

  async enviarAlertaMensagemPendente(dados: DadosMensagemPendente) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #d97706; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">⏰ Cliente Aguardando Atendimento</h2>
          </div>
          <div style="padding: 20px;">
            <p style="color: #b45309; font-weight: bold;">
              O cliente abaixo enviou mensagem há mais de ${dados.tempoAguardando} e ainda não obteve resposta no painel:
            </p>
            <p><strong>Cliente:</strong> ${dados.nome}</p>
            <p><strong>Contato:</strong> ${dados.contato}</p>
            <h3 style="margin-top: 15px; color: #d97706;">Última Mensagem:</h3>
            <p style="background: #fffbeb; padding: 15px; border-left: 4px solid #d97706; border-radius: 4px;">"${dados.mensagem}"</p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Alerta Chat" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        bcc: "comercial@prodacom.com.br",
        subject: `Atendimento Pendente (${dados.tempoAguardando}) - ${dados.nome}`,
        html: htmlBody,
      });
    } catch (error) {
      console.error("[EMAIL CHAT] Erro ao enviar e-mail de mensagem pendente:", error);
    }
  }
  
};