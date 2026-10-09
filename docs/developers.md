# Developer Guide

This guide is the working map for developing Meanders.Tools components from idea to a tested, documented, releasable Grasshopper tool.

## 1. Project Overview

Meanders.Tools is a Grasshopper plugin for Rhino focused on design, fabrication, geometry, data, and workflow utilities.

The main plugin repository is teammeanders/Meanders.Tools. The documentation website is a separate Next.js project.

## 2. Repository Structure

~~~text
Meanders.Tools/
├── Meanders.Tools/
│   ├── Core/
│   ├── Grasshopper/
│   │   ├── Components/
│   │   ├── Goo/
│   │   └── Parameters/
│   ├── Plugin/
│   └── Resources/
│       ├── Icons/
│       └── FabText/
├── data/
│   ├── components/
│   ├── parameters/
│   ├── components.json
│   ├── components.schema.json
│   ├── icon-system.json
│   └── plugin.json
├── assets/
│   └── icons/
├── scripts/
│   ├── generate-component-data.py
│   ├── generate-component-data.bat
│   └── check-project.py
├── docs/
├── README.md
├── CHANGELOG.md
└── ROADMAP.md
~~~

## 3. Creating a New Component

Create the Grasshopper component class under Meanders.Tools/Grasshopper/Components/.

Use the class and filename pattern ME_<Name>_Component.

A component must define its display name, nickname, description, category, subcategory, inputs, outputs, behavior, unique ComponentGuid, icon, and any required persistent settings or runtime validation.

## 4. Files to Add or Review

### Required

~~~text
Meanders.Tools/Grasshopper/Components/ME_<Name>_Component.cs
data/components/me-<component-id>.json
assets/icons/me-<component-id>.png
~~~

### Generated

~~~text
data/components.json
~~~

Generate this file. Do not edit it manually.

### Only when needed

Review Meanders.Tools/Core/ for reusable core behavior.

Review Grasshopper/Parameters/ or Grasshopper/Goo/ when new parameter or Goo types are introduced.

Review Meanders.Tools/Resources/ when embedded resources are needed.

Review data/plugin.json, Meanders.Tools.csproj, CHANGELOG.md, or ROADMAP.md only when the change actually affects them.

## 5. Naming

Component class: ME_<Name>_Component

Grasshopper display name: ME <Readable Name>

Nickname: ME <Short Name>

Metadata ID: me-<component-name>

Metadata filename: data/components/me-<component-id>.json

Icon filename: me-<component-id>.png

Keep released IDs and GUIDs stable.

## 6. Component GUID

Every Grasshopper component needs a unique and stable ComponentGuid.

Never reuse a GUID, change a released GUID, or generate a new GUID during a rename. The GUID in C# must match the GUID in component metadata.

## 7. Component Metadata

Each component has its own JSON file under data/components/.

At minimum, metadata describes id, guid, name, nickname, category, subcategory, status, introducedIn, description, icon, inputs, outputs, settings, errors, examples, notes, and related.

Keep metadata synchronized with the actual component. Input and output order should match Grasshopper.

## 8. Icon System

The canonical icon design system is data/icon-system.json.

Read it before designing an icon. It defines visual language, colors, stroke weights, occupancy, proportions, pseudo-3D treatment, primitive count, semantic rules, component/parameter grammar, transparency, naming, and export sizes.

~~~text
Component JSON + icon-system.json
              ↓
Understand component function
              ↓
Choose semantic visual concept
              ↓
Design for 24×24 first
              ↓
Create SVG master
              ↓
Export 24×24 PNG
              ↓
Export 300×300 documentation PNG
~~~

The icon must communicate what the component does, not merely which category it belongs to. Do not use generic category symbols when the component has a more specific function.

## 9. Documentation

Component documentation data lives in the component JSON under data/components/.

The generated data/components.json is consumed by the documentation website.

Include useful descriptions, port descriptions, settings, errors, examples, notes, and related components where applicable.

## 10. Testing in Rhino / Grasshopper

A component is not complete because it compiles. Test the actual component in Rhino / Grasshopper.

Verify:

- component loads
- name and nickname
- category and subcategory
- input and output order
- optional inputs and defaults
- context-menu settings
- runtime messages
- output types
- list/tree behavior where applicable
- persistent settings where applicable
- representative and edge-case inputs

## 11. Build

From the repository root:

~~~bash
dotnet build
~~~

A successful build is necessary but not sufficient. Follow it with Rhino / Grasshopper testing and project validation.

## 12. Generate Component Data

Individual component JSON files are the source files.

Run:

~~~text
scripts/generate-component-data.bat
~~~

The launcher runs the Python generator and regenerates data/components.json.

Do not manually edit data/components.json.

## 13. Project Validation

Run from the repository root:

~~~bash
python scripts/check-project.py
~~~

The checker validates important code/metadata consistency including duplicate IDs and GUIDs, GUID matching, name and nickname, category and subcategory, required metadata and ports, missing component entries, plugin version consistency, and icon existence.

Successful output:

~~~text
Meanders.Tools project check
============================

PASSED: 0 errors, 0 warning(s).
~~~

## 14. README, CHANGELOG, and ROADMAP

README.md is the project-level introduction and orientation document.

CHANGELOG.md records meaningful project changes and releases. Review it for user-visible features, behavior changes, fixes, and breaking changes.

ROADMAP.md tracks planned project-level work and future milestones.

## 15. Git Workflow

~~~text
Implement
   ↓
Add/update component JSON
   ↓
Create/update icon
   ↓
dotnet build
   ↓
Test in Rhino / Grasshopper
   ↓
generate-component-data.bat
   ↓
check-project.py
   ↓
Review git diff
   ↓
Commit
   ↓
Push
~~~

Keep component implementation, metadata, and icon changes together when they belong to the same feature.

## 16. Definition of Done

A component is ready when:

- behavior is implemented
- name and nickname are final
- ComponentGuid is unique and stable
- category and subcategory are correct
- inputs and outputs are correct
- defaults and optional states are correct
- runtime messages are appropriate
- component metadata exists
- icon exists
- generated component data is up to date
- documentation is complete
- at least one useful example exists
- Rhino / Grasshopper testing passes
- dotnet build succeeds
- check-project.py passes
- CHANGELOG.md and ROADMAP.md have been reviewed when relevant

## 17. Component Registry

The Developer Guide will include a live registry of implemented and planned components.

Implemented components should be derived from the actual component metadata in GitHub.

Planned components will be maintained separately and will later be connected to the project planning source.

The registry is intentionally data-driven so the list can change without rewriting this guide.

## 18. Quick Start

~~~text
1. Create the C# component.
2. Assign a unique stable ComponentGuid.
3. Implement and test inputs/outputs.
4. Create data/components/me-<id>.json.
5. Create the icon using data/icon-system.json.
6. Run scripts/generate-component-data.bat.
7. Run dotnet build.
8. Test in Rhino / Grasshopper.
9. Run python scripts/check-project.py.
10. Review the generated diff.
11. Review CHANGELOG.md / ROADMAP.md when relevant.
12. Commit and push.
~~~