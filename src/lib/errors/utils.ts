import { AxiosError } from "axios";
import { ERROR_LABELS } from "./consts";

export function handleError(error: AxiosError): string {
  // The request reached the server and it responded with a status code that falls out of the range of 2xx
  if (error.response) {
    if (import.meta.env.DEV) {
      console.log("Code d'erreur : ", error.response.status);
      console.log("Réponse : ", error.response.data);
      console.log("Headers : ", error.response.headers);
    }

    if (error.response.status === 401) {
      return "L'identifiant ou le mot de passe est incorrect.";
    }

    if ((error.response.data as { error: string; details: any }).details) {
      return translateError(
        (error.response.data as { error: string; details: any }).error,
      );
    }

    return (
      translateError(error.response.data as string) ??
      "Une erreur est survenue, veuillez réessayer."
    );
  }

  // The request was made but no response was received
  if (error.request) {
    if (import.meta.env.DEV) {
      console.log(error.request);
    }
    return "Une erreur est survenue lors de la communication avec le serveur. Veuillez vérifier votre connexion à internet puis réessayez.";
  }

  // Something happened in setting up the request that triggered an Error
  if (import.meta.env.DEV) {
    console.log("Error", error.message);
  }
  return "Une erreur est survenue, veuillez réessayer.";
}

export function translateError(error: string, lang: "fr" = "fr"): string {
  return ERROR_LABELS.find((err) => err.error === error)?.label[lang] ?? error;
}
