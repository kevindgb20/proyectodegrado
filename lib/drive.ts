// Archivos del proyecto en Google Drive (carpetas de los anexos del libro, compartidas con enlace).
// Para pasar a Drive algo que aún sea local, basta con añadir aquí su ID.
export const VIDEO_IDS: Record<string, string> = {
  "herr-01": "1bOZ2Lq0qOhJIKoF0Kx2gPXKNz5OBZE6N",
  "herr-02": "1OnifySrLJ8v6inZ8c_3AeZxxHYdhquWU",
  "herr-03": "1FW5rJLYX9YhL07K34PerH4fv-0A5wSpU",
  "herr-04": "1HDb2GdaIJz9sKJRK54UajhnJZE6VLhHc",
  "herr-05": "1J2e9HthkETIu0wlD3nz8faYBuvVOOYto",
  "herr-06": "1RpnJx8u00U2ThzXXsBfhqeTvNKd1AgM7",
  "t1-ciberpunk": "1COTXn2ez8pEsSjuYlpVsL2gkqFIb3H1n",
  "t1-ciberpunk-2": "1gGmby9uQKwdrUeRaWs8axokz5PejbAzh",
  "t1-ciberpunk-3": "1C9EGrS1qMO3m_cSekBjPtAGuOiHND6as",
  "t1-bpm": "1qw5DQiwpuz4Qs7MBc1Ls588CBRpNOXPp",
  "t2-01": "11NDO2YtOc9NostIYDglf7oUj0kKWBKY9",
  "t2-02": "1cqdlhVE8ShXCM4C9mR828JyH3_uR8j6n",
  "t2-03": "14eCTQD00NjoPjzjhmR2rj4AvChZYTiTE",
  "t2-04": "1HtohvyPJ0gMETDum5VnjmXOQPNAgU6Ux",
  "t5-01": "1QDw8ZtomoQhcJsyHnCp57ltQlLDI-BhW",
  "ms-overdrive-par": "1hJG--JdKlc_O3jX88EIW-8np7kgr5joZ",
  "ms-overdrive-live": "1YgxtugjvWCcLHTPhzk9ljnBXveUUdurx",
  "ms-3d-overdrive": "11v0gkrdzcGEYF7YF4A88LHKSfZcbumCI",
  "ms-efectos-manual": "11KBzws2SOopuae_mxIP5nZzDHCJs6Fgg",
  "ms-loopstation-3d": "1rY40C1SNE12Zc1Dp50Qx6zgEVaiOYdHg",
  "ms-ismellfear-3d": "1_6MHLXFIMuXFcFhNX1lPo4HqhANxlGzV",
  "ms-yiro-mp3": "1ozRCUGXOYLdfrTU453-YpFLQIDvz7VaZ",
  "yiro-tema-2": "1rn7YEOffD-V5x0IAdIJDkEm5Yn81H2W7",
  "yiro-megalodon": "1h0i0ZBCADDiICXpVln_QYmZXkQ9MF9zm",
  "yiro-guaracha": "1fQRQCu-qjF5mtzUAVQ4CwMNxwHMeyOr4",
  "yiro-guaracha-2": "1P6hhXmJ0Trv-_DiMAsMaT0k0KvmepViW",
  "yiro-sonidos": "1KpXdJy2mFQZSYZc4_h7y-VZO-ZRmIYpj",
  "experiencia": "10uRN29ihzqgUvY467rqT02h46pobts6W"
};

export const IMAGE_IDS: Record<string, string> = {
  "t3-1": "1hBt_ftrVsFndCTKP9c98ZqdDAOWiO822",
  "t3-2": "1CVvploLWhXs79XgSuzSjtyU08kp72qAO",
  "t6-1": "1aUmQthee_PSxMeqlze0vgIq6NlKdGsXR",
  "t6-2": "141lZJeHPhBg0aF_uMl1PcD6x6AXLL6HX",
  "t6-3": "12JajDLI6pH8vafC-QHp2sLVh4qd0lP9y",
  "t6-4": "1J-7LtHaqNO7qrMS9JgWtl3jTH29lRm55",
  "11-el-prompt": "1d2EJyNt1-D72UdhIEc89WlJYBE1aFxgv"
};

export const ANEXO_FILES: Record<string, { label: string; id: string }> = {
  "B": {
    "label": "Entrevista (PDF)",
    "id": "1nbaUcMWszpjcmjD_R6aCgVuvvQsOuWrf"
  },
  "C": {
    "label": "Letra original",
    "id": "1IdSpY0J7PcXbmN8nHvE_Z0aZctVzZk1-"
  },
  "D": {
    "label": "Formato (PDF)",
    "id": "1QdrPQZmkHhrEMNDCBPFamu72pryogYCI"
  },
  "E": {
    "label": "Formato (PDF)",
    "id": "1-qJg8gO8CTSCepSCtbzsLDLkxH1s3QTQ"
  },
  "F": {
    "label": "Respuestas (PDF)",
    "id": "12vwJYe6qCrL1CYnGqVDt0FpAQxSOwL_G"
  },
  "G": {
    "label": "Formato (PDF)",
    "id": "130jru6CZvaJL91tCafKmgJqU-Ndnco3R"
  },
  "H": {
    "label": "Formato (PDF)",
    "id": "1BeLjFinRQINhmSlf_ICdnVoYbfyTBsqZ"
  },
  "I": {
    "label": "Respuestas (PDF)",
    "id": "1XqoFgRucy2yS0HMK7AaAnccvYrZGk-FM"
  },
  "K": {
    "label": "Prompt",
    "id": "1d2EJyNt1-D72UdhIEc89WlJYBE1aFxgv"
  }
};

export const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
export const drivePreview = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
export const driveImage = (id: string, w: number) => `https://lh3.googleusercontent.com/d/${id}=w${w}`;

// Todavía no está en las carpetas compartidas de Drive: se sirve desde public/media.
export const LIBRO = "/media/doc/del-sonido-a-la-luz-libro.pdf";
