import nodemailer from 'nodemailer';

interface DadosOrcamento {
  nome: string;
  empresa?: string;
  email: string;
  telefone?: string;
  segmento?: string;
  mensagem: string;
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

    // 4. Disparo assíncrono em paralelo utilizando Promise.all tradicional
    const resultados = await Promise.all([
      
      // DISPARO 1: Envio para a equipe interna usando o truque do BCC contra o filtro da Hostinger
      transporter.sendMail({
        from: `"Prodacom" <${process.env.EMAIL_USER}>`, 
        to: process.env.EMAIL_USER,                    
        bcc: "comercial@prodacom.com.br",             
        replyTo: dados.email,                         
        subject: `Novo Orçamento - ${dados.nome} ${dados.empresa ? `(${dados.empresa})` : ''}`,
        html: htmlBodyComercial,
      }),

      // DISPARO 2: Envio automático de confirmação direto para o e-mail do Cliente
      transporter.sendMail({
        from: `"Prodacom" <${process.env.EMAIL_USER}>`, 
        to: dados.email,                                
        subject: "Recebemos o seu pedido de orçamento - Prodacom",
        html: htmlBodyCliente,
      })

    ]);

    // 5. Logs informativos no console do seu backend local
    console.log("[COMERCIAL] Cópia encaminhada com sucesso! ID:", resultados[0].messageId);
    console.log("[CLIENTE] Auto-resposta entregue com sucesso! ID:", resultados[1].messageId);
  }
  
};