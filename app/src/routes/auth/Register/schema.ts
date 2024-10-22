export const RegisterSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" },
        adminToken: { type: "string" },
    },
    required: ["email", "password", "adminToken"],
} as const;
