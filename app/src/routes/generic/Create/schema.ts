export const CreateGeneric = {
    type: "object",
    properties: {
        title: { type: "string" },
        metadata: { type: "object" },
    },
    required: ["title"],
} as const;
