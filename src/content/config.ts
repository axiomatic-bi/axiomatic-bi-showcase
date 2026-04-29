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

const atGlanceItemSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1)
});

const dataModelSectionSchema = z.object({
  intro: z.array(z.string().min(1)).min(1).max(2),
  tableStructure: z
    .array(
      z.object({
        table: z.string().min(1),
        role: z.string().min(1),
        grain: z.string().min(1),
        purpose: z.string().min(1)
      })
    )
    .default([]),
  keyModellingDecisions: z.array(z.string().min(1)).default([]),
  qualityAndConsistency: z.array(z.string().min(1)).default([])
});

const capabilityMaturitySchema = z.object({
  ingestion: z.enum(["implemented", "in_progress", "planned"]),
  transformation: z.enum(["implemented", "in_progress", "planned"]),
  semantic_mcp: z.enum(["implemented", "in_progress", "planned"])
});

const highlightCardSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1)
});

const engineCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().default("Engine documentation"),
    summary: z.string().default(""),
    highlights: z.array(highlightCardSchema).default([]),
    problemStatement: z.string().default(""),
    architectureIntro: z.array(z.string().min(1)).default([]),
    strategySections: z
      .array(
        z.object({
          heading: z.string().min(1),
          body: z.string().min(1)
        })
      )
      .default([]),
    scopeSummary: z.string().default(""),
    tradeOffs: z.string().default(""),
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
    previewItem: z.object({
      summary: z.string(),
      demonstrates: z.string(),
      included: z.string()
    }),
    sectionOrder: z
      .array(z.enum(fakeStoreSectionOrder))
      .refine(
        (value) =>
          value.length === fakeStoreSectionOrder.length &&
          value.every((item, index) => item === fakeStoreSectionOrder[index]),
        "Section order must follow the required Fake Store narrative structure."
      ),
    evidence: z.array(evidenceItemSchema).default([]),
    atGlance: z.array(atGlanceItemSchema).default([]),
    dataModel: dataModelSectionSchema,
    reproducibility: z.array(reproStepSchema).default([]),
    assumptions: z.array(z.string()).default([]),
    limitations: z.array(z.string()).default([]),
    capabilityMaturity: capabilityMaturitySchema
  })
});

const adrCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional()
  })
});

const contactCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    email: z.string().email(),
    phone: z.string().min(1).optional(),
    linkedinUrl: z.string().url(),
    responseWindow: z.string().default("I usually respond within 1-2 business days.")
  })
});

const cvCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    updatedAt: z.string().optional(),
    focusAreas: z.array(z.string()).default([]),
    skillGroups: z
      .array(
        z.object({
          label: z.string(),
          items: z.array(z.string()).min(1)
        })
      )
      .default([])
  })
});

export const collections = {
  engine: engineCollection,
  caseStudies: caseStudiesCollection,
  adr: adrCollection,
  contact: contactCollection,
  cv: cvCollection
};
