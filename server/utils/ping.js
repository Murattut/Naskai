export function buildPingPayload(clientTimestamp, serverTimestamp = new Date().toISOString()) {
  return {
    message: "Ping",
    clientTimestamp,
    serverTimestamp,
    timeDiff: clientTimestamp ? new Date(serverTimestamp) - new Date(clientTimestamp) : null,
  };
}
