import { describe, expect, it } from "vitest";
import { buildPingPayload } from "./ping.js";

describe("buildPingPayload", () => {
  it("returns null timeDiff when client timestamp is missing", () => {
    const payload = buildPingPayload(undefined, "2026-01-01T00:00:00.000Z");

    expect(payload.message).toBe("Ping");
    expect(payload.clientTimestamp).toBeUndefined();
    expect(payload.serverTimestamp).toBe("2026-01-01T00:00:00.000Z");
    expect(payload.timeDiff).toBeNull();
  });

  it("calculates timeDiff when both timestamps are present", () => {
    const payload = buildPingPayload(
      "2026-01-01T00:00:00.000Z",
      "2026-01-01T00:00:05.000Z"
    );

    expect(payload.timeDiff).toBe(5000);
  });
});
