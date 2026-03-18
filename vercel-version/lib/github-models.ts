export async function githubModelsChat(
  messages: Array<{ role: string; content: string }>,
  token?: string,
  model?: string,
  endpoint?: string
): Promise<string> {
  const apiToken = token || process.env.GITHUB_TOKEN;
  const apiModel = model || process.env.GITHUB_MODELS_MODEL;
  const apiEndpoint =
    endpoint ||
    process.env.GITHUB_MODELS_ENDPOINT ||
    "https://models.github.ai/inference/chat/completions";

  if (!apiToken || !apiModel) {
    throw new Error(
      "GitHub Models credentials not configured. Set GITHUB_TOKEN and GITHUB_MODELS_MODEL env vars."
    );
  }

  const isAzure = apiEndpoint.includes("azure.com");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (isAzure) {
    headers["api-key"] = apiToken;
  } else {
    headers["Authorization"] = `Bearer ${apiToken}`;
    headers["Accept"] = "application/vnd.github+json";
    headers["X-GitHub-Api-Version"] = "2022-11-28";
  }

  const payload = {
    model: apiModel,
    messages,
    temperature: 0.2,
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `GitHub Models request failed (${response.status}): ${text}`
      );
    }

    const data = await response.json();
    const choice = data.choices?.[0];
    const message = choice?.message;
    const content = message?.content || "";

    return content;
  } catch (error) {
    throw new Error(
      `GitHub Models request failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
