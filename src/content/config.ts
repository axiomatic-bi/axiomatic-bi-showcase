import { defineCollection, z } from "astro:content";

const fakeStoreSectionOrder = [
  "Problem",
  "Architecture",
  "Data model",
  "Transform logic",
  "Data quality/tests",
  "Results/insights",
  "Trade-offs/lessons"
] as const;

const evidenceItemSchema = z.object({
  type: z.enum(["code", "sql", "test", "diagram", "video"]),
  claim: z.string().min(1),
  sourcePath: z.string().min(1),
  status: z.enum(["implemented", "in_progress", "planned"]).default("implemented")
});

const reproStepSchema = z.object({
  command: z.string().min(1),
  assumption: z.string().min(1),
  limitation: z.string().optional()
});

const capabilityMaturitySchema = z.object({
  ingestion: z.enum(["implemented", "in_progress", "planned"]),
  transformation: z.enum(["implemented", "in_progress", "planned"]),
  semantic_mcp: z.enum(["implemented", "in_progress", "planned"])
});

const engineCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().default("Engine documentation"),
    summary: z.string().default(""),
    evidence: z.array(evidenceItemSchema).default([]),
    decisions: z
      .array(
        z.object({
          id: z.string(),
          status: z.enum(["accepted", "proposed", "superseded"]),
          summary: z.string(),
          sourcePath: z.string()
        })
      )
      .default([]),
    capabilityMaturity: capabilityMaturitySchema.default({
      ingestion: "planned",
      transformation: "planned",
      semantic_mcp: "planned"
    })
  })
});

const caseStudiesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    sectionOrder: z
      .array(z.enum(fakeStoreSectionOrder))
      .refine(
        (value) =>
          value.length === fakeStoreSectionOrder.length &&
          value.every((item, index) => item === fakeStoreSectionOrder[index]),
        "Section order must follow the required Fake Store narrative structure."
      ),
    evidence: z.array(evidenceItemSchema).default([]),
    reproducibility: z.array(reproStepSchema).default([]),
    assumptions: z.array(z.string()).default([]),
    limitations: z.array(z.string()).default([]),
    capabilityMaturity: capabilityMaturitySchema
  })
});

export const collections = {
  engine: engineCollection,
  caseStudies: caseStudiesCollection
};
