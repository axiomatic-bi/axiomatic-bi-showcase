export const engineRepoLinks = {
  organisation: "https://github.com/axiomatic-bi",
  baseTreeMain: "https://github.com/axiomatic-bi/axiomatic-engine/tree/main",
  baseBlobMain: "https://github.com/axiomatic-bi/axiomatic-engine/blob/main"
} as const;

export const fakeStoreLinks = {
  exampleCode: `${engineRepoLinks.baseTreeMain}/projects/fake_store`,
  pbixAsset:
    "https://github.com/axiomatic-bi/axiomatic-bi-examples/tree/main/projects/fake-store/powerbi"
} as const;
