import { BrowserOAuthClient } from "@atproto/oauth-client-browser"

let oauthClient: BrowserOAuthClient | null = null

export async function getOAuthClient (): Promise<BrowserOAuthClient | Error> {
  if (oauthClient != null) {
    return oauthClient
  }
  try {
    const clientMetadataUrl = getClientMetadataUrl()
    oauthClient = await BrowserOAuthClient.load({
      clientId: clientMetadataUrl,
      handleResolver: "https://bsky.social",
    })
    return oauthClient
  } catch (error) {
    console.error("[klearsky/getOAuthClient] Failed to load OAuth client:", error)
    return error instanceof Error ? error : new Error(String(error))
  }
}

export function resetOAuthClient (): void {
  oauthClient = null
}

function getClientMetadataUrl (): string {
  const hostname = window.location.hostname
  if (
    hostname === "staging.klearsky.pages.dev" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  ) {
    return "https://staging.klearsky.pages.dev/client-metadata.staging.json"
  }
  return "https://klearsky.pages.dev/client-metadata.json"
}
