import { NodeOAuthClient } from "@atproto/oauth-client-node";

export async function createAtprotoClient() {
  const project_url = process.env.PROJECT_URL;
  return new NodeOAuthClient({
    clientMetadata: {
      client_name: "Yardly - Online Yard Sale",
      client_id: project_url
        ? `${project_url}/client-metadata.json`
        : `http://localhost?redirect_uri=${encodeURIComponent(`${project_url}/oauth/callback`)}&scope=${encodeURIComponent("atproto transition:generic")}`,
      client_uri: project_url,
      redirect_uris: [`${project_url}/oauth/callback`],
      scope: "atproto transition:generic",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
    },
    stateStore: {},
    sessionStore: {},
  });
}
