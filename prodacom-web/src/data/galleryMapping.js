import { imageRegistry } from "./imageRegistry";

export const PRODUCT_GALLERY_MAPPING = {
  // Controle de Acesso
  "idface": [
    imageRegistry.controleDeAcesso?.newBg?.idfacePerspectivaAEn,
    imageRegistry.controleDeAcesso?.newBg?.idfaceFrontalEn
  ],
  "idface-max": [
    imageRegistry.controleDeAcesso?.newBg?.idfaceMaxPerspectiva,
    imageRegistry.controleDeAcesso?.newBg?.idfaceMaxFrontal
  ],
  "idlock-bio": [
    imageRegistry.controleDeAcesso?.newBg?.idlockBioPerspectiva,
    imageRegistry.controleDeAcesso?.newBg?.idlockBioFrente,
    imageRegistry.controleDeAcesso?.newBg?.idlockInternoFrente
  ],
  "idlock": [
    imageRegistry.controleDeAcesso?.newBg?.idlockPerspectiva,
    imageRegistry.controleDeAcesso?.newBg?.idlockFrente,
    imageRegistry.controleDeAcesso?.newBg?.idlockInternoFrente
  ],

  // Relógio de Ponto
  "leitor-facial-f4": [
    imageRegistry.relogioDePonto?.newBg?.leitorFacialParaControlePonto,
    imageRegistry.relogioDePonto?.newBg?.controlePontoFacial,
  ],
  "inner-rep-plus": [
    imageRegistry.relogioDePonto?.newBg?.relogioPontoHomologado,
    imageRegistry.relogioDePonto?.newBg?.relogioPontoEletronico
  ],
  "idclass": [
   
    imageRegistry.relogioDePonto?.newBg?.idclassFrontalBio,
    imageRegistry.relogioDePonto?.newBg?.idclassPerspectivaBio,
  ],

  "catraca-revolution": [
    imageRegistry.catraca?.newBg?.eletronicaAntiPanico1024,
    imageRegistry.catraca?.newBg?.eletronicaLeitorFacial1024,
    imageRegistry.catraca?.newBg?.eletronicaReconhecimentoFacial,
  ],
  "catraca-box": [
    imageRegistry.catraca?.newBg?.inox,
    imageRegistry.catraca?.newBg?.balcao,
    imageRegistry.catraca?.newBg?.inoxComLeitorFacial
  ],
  "idblock-next": [
    imageRegistry.catraca?.newBg?.idblockNextComIdface,
    imageRegistry.catraca?.newBg?.idblockNextSemIdface
  ],
  "idblock-pne": [
    imageRegistry.catraca?.newBg?.idblockPcdFrontal,
    imageRegistry.catraca?.newBg?.idblockPcdPerspectiva,
  ],
  "catraca-fit": [
    imageRegistry.catraca?.newBg?.antiPanico,
    imageRegistry.catraca?.newBg?.comLeitorFacial,
    imageRegistry.catraca?.newBg?.comReconhecimentoFacial,
    imageRegistry.catraca?.newBg?.paraAcademia1024,
    imageRegistry.catraca?.newBg?.comUrnaColetora,
    imageRegistry.catraca?.newBg?.biometrica
  ],

  // Novas Catracas EVO
  "catraca-evo-expedidora": [
    imageRegistry.catraca?.newBg?.evoExpedidora2,
    imageRegistry.catraca?.newBg?.evoExpedidora1,
    imageRegistry.catraca?.newBg?.evoExpedidora5,
    imageRegistry.catraca?.newBg?.evoExpedidora6,
  ],
  "catraca-evo-coletora": [
    imageRegistry.catraca?.newBg?.evoColetora4,
    imageRegistry.catraca?.newBg?.evoColetora3,
    imageRegistry.catraca?.newBg?.evoColetora5,
    imageRegistry.catraca?.newBg?.evoColetora2,
  ]
};