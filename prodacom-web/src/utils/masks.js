export function mascaraTelefone(valor) {
  if (!valor) return "";
  let texto = valor.replace(/\D/g, "");
  texto = texto.replace(/^(\d{2})(\d)/g, "($1) $2");
  texto = texto.replace(/(\d)(\d{4})$/, "$1-$2");
  return texto.substring(0, 15);
}