const splitOrigins = (value) =>
    String(value)
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

const normalizeOrigin = (origin) => origin.replace(/\/+$/, "");

const maybeHttps = (value) => {
    if (!value) {
        return null;
    }
    if (value.startsWith("http://") || value.startsWith("https://")) {
        return value;
    }
    return `https://${value}`;
};

export const getAllowedOrigins = () => {
    const fromEnv = [
        process.env.CLIENT_URL,
        process.env.CLIENT_URLS,
        process.env.CORS_ORIGINS,
        maybeHttps(process.env.VERCEL_PROJECT_PRODUCTION_URL),
        maybeHttps(process.env.VERCEL_URL),
    ]
        .filter(Boolean)
        .flatMap(splitOrigins)
        .map(normalizeOrigin);

    const defaults = ["http://localhost:3000", "http://127.0.0.1:3000"];
    return [...new Set([...fromEnv, ...defaults])];
};

const patternToRegex = (pattern) => {
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\\\*/g, ".*");
    return new RegExp(`^${escaped}$`);
};

export const isOriginAllowed = (origin, allowedOrigins) => {
    const normalizedOrigin = normalizeOrigin(origin);
    return allowedOrigins.some((allowed) => {
        if (allowed.includes("*")) {
            return patternToRegex(allowed).test(normalizedOrigin);
        }
        return allowed === normalizedOrigin;
    });
};
