# Axiomatic BI Showcase

A public portfolio site for demonstrating the **Axiomatic Engine** and end-to-end analytics case studies, with a focus on practical data engineering decisions, reproducibility, and evidence-backed outcomes.

## Purpose

This repository hosts a static Astro website (deployed via GitHub Pages) that showcases:

- engine architecture and design principles
- project-level implementations built on top of the engine
- transformation modelling choices and data quality practices
- technical trade-offs and lessons learned

## What This Site Covers

### Axiomatic Engine
- ingestion and transformation orchestration
- source-agnostic resource contracts
- resource-level load hints (`append`, `merge`, `replace`)
- schema evolution policy (`auto`, `strict`, `discard`)
- rerun semantics and reliability considerations

### Fake Store Case Study
- medallion flow (`bronze` -> `silver` -> `gold`)
- dimensional model with SCD2 dimensions
- fact modelling at cart-line-item grain
- dbt tests and quality checks
- operational notes (MotherDuck, schema routing, rerun behaviour)

## Tech Stack

- [Astro](https://astro.build/) for static site generation
- Markdown/content collections for case-study content
- Mermaid for architecture and model diagrams (where useful)
- GitHub Pages for deployment

## Repository Goals

- keep content concise, technical, and verifiable
- prioritise clarity over visual complexity
- ensure every major claim is backed by code, tests, or outputs
- maintain public-safe artefacts (no secrets, no sensitive identifiers)

## Planned Pages

- `/` - Overview and featured projects
- `/case-studies/fake-store` - Full Fake Store implementation report
- `/engine` - Axiomatic Engine architecture and design notes
- `/about` - Background and approach
- `/contact` - Links and contact options

## Local Development (Planned)

```bash
# install dependencies
npm install

# run dev server
npm run dev

# create production build
npm run build

# preview production build
npm run preview