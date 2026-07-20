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
    // 1. Configura o "carteiro" (Transporter) com os dados do seu .env
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: Number(process.env.EMAIL_PORT) === 465, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Monta o corpo do e-mail em HTML (para chegar bonito e organizado à equipa comercial)
    const htmlBody = `
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
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0056b3; border-radius: 4px; white-space: pre-wrap; line-height: 1.6;">${dados.mensagem}</p>
        </div>
        
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
          Este e-mail foi gerado e processado automaticamente pelo servidor da Prodacom.
        </div>
      </div>
    `;

    // 3. Executa o disparo do e-mail
    await transporter.sendMail({
      from: `"Site Prodacom" <${process.env.EMAIL_USER}>`, 
      to: "comercial@prodacom.com.br",                    
      replyTo: dados.email,                               
      subject: `Solicitação de Orçamento - ${dados.nome} ${dados.empresa ? `(${dados.empresa})` : ''}`,
      html: htmlBody,
    });
  }
  
};