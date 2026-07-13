import crypto from 'crypto';

function validarCodigoAcesso(codigo: string): boolean {
  const codigoCorreto = process.env.ADMIN_CODE;

  if (!codigoCorreto) {
    console.error(" Alerta: A variável ADMIN_CODE não foi definida no arquivo .env!");
    return false;
  }

  const hashDigitado = crypto.createHash('sha256').update(codigo).digest();
  const hashCorreto = crypto.createHash('sha256').update(codigoCorreto).digest();


  return crypto.timingSafeEqual(hashDigitado, hashCorreto);
}

export const adminService = {
  validarCodigoAcesso
};