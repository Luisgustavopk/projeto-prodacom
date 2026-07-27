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

  // Catracas
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
    imageRegistry.catraca?.newBg?.paraAcademia1024,
    imageRegistry.catraca?.newBg?.biometrica
  ]
};