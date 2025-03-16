// Available languages
export const availableLanguages = ["en", "es", "fr", "de", "zh"];

// Translations for status code categories
export const categoryTranslations = {
  en: {
    Informational: "Informational",
    Success: "Success",
    Redirection: "Redirection",
    "Client Error": "Client Error",
    "Server Error": "Server Error",
    Unknown: "Unknown",
  },
  es: {
    Informational: "Informativo",
    Success: "Éxito",
    Redirection: "Redirección",
    "Client Error": "Error del Cliente",
    "Server Error": "Error del Servidor",
    Unknown: "Desconocido",
  },
  fr: {
    Informational: "Information",
    Success: "Succès",
    Redirection: "Redirection",
    "Client Error": "Erreur Client",
    "Server Error": "Erreur Serveur",
    Unknown: "Inconnu",
  },
  de: {
    Informational: "Information",
    Success: "Erfolg",
    Redirection: "Umleitung",
    "Client Error": "Client-Fehler",
    "Server Error": "Server-Fehler",
    Unknown: "Unbekannt",
  },
  zh: {
    Informational: "信息性",
    Success: "成功",
    Redirection: "重定向",
    "Client Error": "客户端错误",
    "Server Error": "服务器错误",
    Unknown: "未知",
  },
};

// Translations for status codes
export const statusCodeTranslations = {
  // English is the default in statusCodes.mjs
  es: {
    200: "OK - La solicitud ha tenido éxito.",
    201: "Creado - Se ha creado un nuevo recurso con éxito.",
    400: "Solicitud incorrecta - El servidor no pudo entender la solicitud.",
    404: "No encontrado - El recurso solicitado no existe.",
    500: "Error interno del servidor - Un mensaje de error genérico para problemas del servidor.",
    // Add other translations as needed
  },
  fr: {
    200: "OK - La requête a réussi.",
    201: "Créé - Une nouvelle ressource a été créée avec succès.",
    400: "Mauvaise demande - Le serveur n'a pas pu comprendre la requête.",
    404: "Non trouvé - La ressource demandée n'existe pas.",
    500: "Erreur interne du serveur - Un message d'erreur générique pour les problèmes de serveur.",
    // Add other translations as needed
  },
  de: {
    200: "OK - Die Anfrage war erfolgreich.",
    201: "Erstellt - Eine neue Ressource wurde erfolgreich erstellt.",
    400: "Fehlerhafte Anfrage - Die Anfrage konnte nicht verstanden werden.",
    404: "Nicht gefunden - Die angeforderte Ressource existiert nicht.",
    500: "Interner Serverfehler - Eine generische Fehlermeldung für Serverprobleme.",
    // Add other translations as needed
  },
  zh: {
    200: "成功 - 请求成功。",
    201: "已创建 - 成功创建了新资源。",
    400: "错误请求 - 服务器无法理解该请求。",
    404: "未找到 - 请求的资源不存在。",
    500: "服务器内部错误 - 服务器问题的通用错误消息。",
    // Add other translations as needed
  },
};

export default {
  availableLanguages,
  categoryTranslations,
  statusCodeTranslations,
};
