export const CreateFile = {
    type: "object",
    properties: {
        fileName: { type: "string" },
    },
    required: ["fileName"],
} as const;
