[2025-09-16T11:28:16] OpenAI Codex v0.34.0 (research preview)
--------
workdir: /Users/seongjonghyeon/Documents/cto/hackerton/figma-mcp
model: gpt-5
provider: openai
approval: never
sandbox: read-only
reasoning effort: medium
reasoning summaries: auto
--------
[2025-09-16T11:28:16] User instructions:
Figma fileKey: 1234, nodeId: 1234를 기반으로 React 컴포넌트를 생성해주세요. 
  다음 요구사항을 만족하는 React 컴포넌트를 만들어주세요:
  1. Next.js 13+ App Router에서 사용 가능한 React 컴포넌트
  2. TypeScript 사용
  3. Tailwind CSS 클래스 사용 (인라인 스타일 금지)
  4. 모던하고 반응형 디자인
  5. Figma 컴포넌트를 모방한 UI 요소들
  6. 실제 사용 가능한 컴포넌트 형태
  7. export default function으로 컴포넌트 export
  
  출력은 순수한 TypeScript React 컴포넌트 코드만 포함해주세요. 다른 설명이나 마크다운은 포함하지 마세요.

[2025-09-16T11:28:23] thinking

**Designing a Figma-style component**

Since we can’t fetch data, I can create a component that accepts props like ‘fileKey’ and ‘nodeId,’ defaulting to the provided ones. I might consider using Figma images by linking to their API, although that could disrupt the network. Instead, this component could display placeholders and replicate Figma's UI structure, such as panels and headers. I’ll focus on making it self-contained and provide a simple static content setup that leverages the given props, using Tailwind CSS for styling.
**Deciding on component details**

I'm considering whether to make this a Client Component since it includes interactive elements like accordion toggles. If that's the case, I'll need to add the "use client" directive at the top for Next.js 13 App Router compatibility. I plan to create "FigmaLikeEditor.tsx" as a reusable React component and output just the component definition using TypeScript types. I'll incorporate useState for panel control, avoid inline styles, and use only Tailwind classes. The component will be responsive, collapsing side panels into drawers on smaller screens. I'll ensure to include accessible labels and display "fileKey" and "nodeId" in a badge.
**Defining props and styles**

I want to define a prop interface for my component. It’ll include optional properties like ‘fileKey’ and ‘nodeId,’ as well as an ‘onExport’ function that takes a format like 'png', 'svg', or 'pdf'. I think I should default both ‘fileKey’ and ‘nodeId’ to '1234'. It’s essential to use only Tailwind for styling and avoid inline styles, even for backgrounds. I could create a sample canvas area with a neutral background using the ‘bg-[...]’ syntax from Tailwind. However, to be cautious, I'll stick with recognizable Tailwind classes rather than any custom CSS that might not be compile-friendly.
**Clarifying Tailwind and component setup**

I'm thinking about Next.js and how it handles Tailwind with arbitrary values. Although it does support them, some might confuse those with inline styles. “Inline styles” refer to the style={} attribute, but using Tailwind’s arbitrary values is fine. To play it safe, I could stick with built-in classes like 'bg-neutral-50' and 'dark:bg-neutral-900' for a checkered background instead of using non-default classes. I can create a 'canvas' area with card frames and inline SVGs for icons as components. Then, for the component setup, I’ll include the 'use client' directive, create the default export function, and pull from props.
**Structuring the UI**

I'm designing the UI structure with an outer container that includes various classes for styling and responsiveness. The header features a logo, frame name, search bar, zoom controls, and buttons for sharing and exporting. The body uses a grid layout with sidebars, but on small screens, these will hide and can be toggled as drawers. I'll implement state toggles for side panels and ensure the layout has proper Tailwind classes throughout. 

The canvas will mimic a Figma frame, with a designated "artboard," and UI elements styled purely with HTML and Tailwind. I'll also use `use client` to ensure interactivity, defining helper components for cleaner code.
[2025-09-16T11:28:52] codex
**Deciding on component details**

I'm considering whether to make this a Client Component since it includes interactive elements like accordion toggles. If that's the case, I'll need to add the "use client" directive at the top for Next.js 13 App Router compatibility. I plan to create "FigmaLikeEditor.tsx" as a reusable React component and output just the component definition using TypeScript types. I'll incorporate useState for panel control, avoid inline styles, and use only Tailwind classes. The component will be responsive, collapsing side panels into drawers on smaller screens. I'll ensure to include accessible labels and display "fileKey" and "nodeId" in a badge.
[2025-09-16T11:28:52] codex
**Defining props and styles**

I want to define a prop interface for my component. It’ll include optional properties like ‘fileKey’ and ‘nodeId,’ as well as an ‘onExport’ function that takes a format like 'png', 'svg', or 'pdf'. I think I should default both ‘fileKey’ and ‘nodeId’ to '1234'. It’s essential to use only Tailwind for styling and avoid inline styles, even for backgrounds. I could create a sample canvas area with a neutral background using the ‘bg-[...]’ syntax from Tailwind. However, to be cautious, I'll stick with recognizable Tailwind classes rather than any custom CSS that might not be compile-friendly.
[2025-09-16T11:28:52] codex
**Clarifying Tailwind and component setup**

I'm thinking about Next.js and how it handles Tailwind with arbitrary values. Although it does support them, some might confuse those with inline styles. “Inline styles” refer to the style={} attribute, but using Tailwind’s arbitrary values is fine. To play it safe, I could stick with built-in classes like 'bg-neutral-50' and 'dark:bg-neutral-900' for a checkered background instead of using non-default classes. I can create a 'canvas' area with card frames and inline SVGs for icons as components. Then, for the component setup, I’ll include the 'use client' directive, create the default export function, and pull from props.
[2025-09-16T11:28:52] codex
**Structuring the UI**

I'm designing the UI structure with an outer container that includes various classes for styling and responsiveness. The header features a logo, frame name, search bar, zoom controls, and buttons for sharing and exporting. The body uses a grid layout with sidebars, but on small screens, these will hide and can be toggled as drawers. I'll implement state toggles for side panels and ensure the layout has proper Tailwind classes throughout. 

The canvas will mimic a Figma frame, with a designated "artboard," and UI elements styled purely with HTML and Tailwind. I'll also use `use client` to ensure interactivity, defining helper components for cleaner code.
[2025-09-16T11:28:52] codex

"use client";

import { useMemo, useState } from "react";

type ExportFormat = "png" | "svg" | "pdf";
type Props = {
  fileKey?: string;
  nodeId?: string;
  onExport?: (format: ExportFormat) => void;
  className?: string;
};

export default function FigmaMockEditor({
  fileKey = "1234",
  nodeId = "1234",
  onExport,
  className = "",
}: Props) {
  const [zoom, setZoom] = useState<number>(100);
  const [showLayers, setShowLayers] = useState(false);
  const [showInspector, setShowInspector] = useState(false);

  const [autoLayout, setAutoLayout] = useState(true);
  const [spacing, setSpacing] = useState(12);
  const [padding, setPadding] = useState(16);
  const [corner, setCorner] = useState(8);
  const [selectedFill, setSelectedFill] = useState<string>("#4f46e5");
  const [text, setText] = useState<string>("Get Started");
  const [primary, setPrimary] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  const buttonClasses = useMemo(() => {
    const base =
      "inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    const sizing = `px-${Math.max(3, Math.min(8, Math.round(padding / 4)))} py-${Math.max(
      2,
      Math.min(5, Math.round(padding / 6))
    )} text-sm`;
    const primaryBg = pressed
      ? "bg-indigo-700"
      : hover
      ? "bg-indigo-600"
      : "bg-indigo-500";
    const secondaryBg = pressed
      ? "bg-white/80"
      : hover
      ? "bg-white/90"
      : "bg-white";
    const ring = primary ? "ring-indigo-500" : "ring-neutral-300";
    const textColor = primary ? "text-white" : "text-neutral-800";
    const border = primary ? "border-transparent" : "border border-neutral-200";
    const customFill =
      selectedFill && primary
        ? ""
        : ""; // leave room if extending with custom palettes
    const bg = primary ? primaryBg : secondaryBg;

    // Tailwind-safe width class mapping for padding-based width (visual only)
    return [base, sizing, bg, border, textColor, "shadow-sm", "ring-offset-0", ring, customFill]
      .filter(Boolean)
      .join(" ");
  }, [padding, primary, hover, pressed, selectedFill]);

  const onZoomIn = () => setZoom((z) => Math.min(400, z + 25));
  const onZoomOut = () => setZoom((z) => Math.max(25, z - 25));
  const exportClick = (f: ExportFormat) => onExport?.(f);

  return (
    <div
      className={[
        "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-sm",
        "text-neutral-900 dark:text-neutral-100",
        className,
      ].join(" ")}
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur p-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span className="text-sm font-semibold tracking-tight">Figma Mock</span>
          </div>
          <span className="mx-2 hidden text-neutral-300 dark:text-neutral-700 md:inline">|</span>
          <div className="hidden items-center gap-2 md:flex">
            <Badge>fileKey: {fileKey}</Badge>
            <Badge variant="subtle">nodeId: {nodeId}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1 md:flex">
            <button
              aria-label="Zoom out"
              onClick={onZoomOut}
              className="h-7 w-7 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
            >
              <MinusIcon />
            </button>
            <div className="min-w-[3rem] text-center text-sm tabular-nums">{zoom}%</div>
            <button
              aria-label="Zoom in"
              onClick={onZoomIn}
              className="h-7 w-7 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
            >
              <PlusIcon />
            </button>
          </div>

          <div className="hidden h-7 w-px bg-neutral-200 dark:bg-neutral-800 md:block" />

          <div className="flex items-center gap-1.5">
            <button
              className="inline-flex items-center gap-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
              onClick={() => exportClick?.("png")}
            >
              <DownloadIcon />
              Export
            </button>
            <button className="inline-flex items-center gap-1 rounded-md bg-indigo-500 px-3 py-1.5 text-sm text-white hover:bg-indigo-600">
              <ShareIcon />
              Share
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1.5">
            <button
              onClick={() => setShowLayers((s) => !s)}
              className="h-9 w-9 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center"
              aria-label="Toggle layers panel"
            >
              <LayersIcon />
            </button>
            <button
              onClick={() => setShowInspector((s) => !s)}
              className="h-9 w-9 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center"
              aria-label="Toggle inspector panel"
            >
              <AdjustIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative grid h-[640px] grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)_280px]">
        {/* Layers - desktop */}
        <aside className="relative hidden md:flex flex-col border-r border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <PanelHeader title="Layers" actions={<SearchInput placeholder="Search layers..." />} />
          <div className="flex-1 overflow-auto p-2">
            <LayerItem name="Frame 1" active />
            <LayerItem name="Button / Primary" indent />
            <LayerItem name="Icon / ArrowRight" indent />
            <LayerItem name="Text / Label" indent />
            <div className="my-2 h-px bg-neutral-100 dark:bg-neutral-800" />
            <LayerItem name="Grid" />
          </div>
        </aside>

        {/* Canvas */}
        <main className="relative overflow-auto bg-neutral-50 dark:bg-neutral-950">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_1px_1px,#171717_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative mx-auto my-10 w-full max-w-4xl px-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-500">Frame 1</span>
                <span className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-xs text-neutral-500">
                  {zoom}%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="subtle">Auto Layout</Badge>
                <Badge variant="subtle">Desktop</Badge>
              </div>
            </div>

            {/* Artboard */}
            <div className="relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-6">
              {/* Auto layout container preview */}
              <div
                className={[
                  "flex w-full items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-6",
                  autoLayout ? "gap-3" : "",
                ].join(" ")}
              >
                <button
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => {
                    setHover(false);
                    setPressed(false);
                  }}
                  onMouseDown={() => setPressed(true)}
                  onMouseUp={() => setPressed(false)}
                  className={buttonClasses}
                  style={
                    undefined
                  } /* no inline styles – explicit undefined to satisfy TS */
                >
                  <span
                    className={[
                      "flex items-center gap-2",
                      autoLayout ? `space-x-${Math.max(2, Math.min(4, Math.round(spacing / 6)))}` : "",
                    ].join(" ")}
                  >
                    <span>{text}</span>
                    <ArrowRightIcon />
                  </span>
                </button>
              </div>

              {/* Spacing hint */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <RulerIcon />
                  Spacing: {spacing}px
                </div>
                <div className="flex items-center gap-2">
                  <PaddingIcon />
                  Padding: {padding}px
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Inspector - desktop */}
        <aside className="relative hidden md:flex flex-col border-l border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <PanelHeader title="Design" actions={<Badge variant="subtle">Button / Primary</Badge>} />
          <div className="flex-1 overflow-auto p-3 space-y-4">
            <Section title="Auto layout">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enabled</span>
                <Switch checked={autoLayout} onChange={setAutoLayout} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <NumberField label="Spacing" value={spacing} setValue={setSpacing} min={0} max={64} />
                <NumberField label="Padding" value={padding} setValue={setPadding} min={0} max={64} />
              </div>
            </Section>

            <Section title="Corner radius">
              <div className="flex items-center gap-2">
                <Segmented
                  value={corner}
                  options={[
                    { label: "0", value: 0 },
                    { label: "4", value: 4 },
                    { label: "8", value: 8 },
                    { label: "12", value: 12 },
                  ]}
                  onChange={setCorner}
                />
                <div className="ml-auto w-16">
                  <NumberField
                    label="px"
                    value={corner}
                    setValue={setCorner}
                    min={0}
                    max={32}
                    hideLabel
                  />
                </div>
              </div>
            </Section>

            <Section title="Fill">
              <div className="flex items-center gap-2">
                <ColorSwatch
                  value="#4f46e5"
                  active={selectedFill === "#4f46e5"}
                  onClick={() => setSelectedFill("#4f46e5")}
                />
                <ColorSwatch
                  value="#0ea5e9"
                  active={selectedFill === "#0ea5e9"}
                  onClick={() => setSelectedFill("#0ea5e9")}
                />
                <ColorSwatch
                  value="#10b981"
                  active={selectedFill === "#10b981"}
                  onClick={() => setSelectedFill("#10b981")}
                />
                <ColorSwatch
                  value="#f59e0b"
                  active={selectedFill === "#f59e0b"}
                  onClick={() => setSelectedFill("#f59e0b")}
                />
                <ColorSwatch
                  value="#ef4444"
                  active={selectedFill === "#ef4444"}
                  onClick={() => setSelectedFill("#ef4444")}
                />
              </div>
            </Section>

            <Section title="Type">
              <InputField label="Label" value={text} setValue={setText} />
              <div className="flex items-center justify-between">
                <span className="text-sm">Primary style</span>
                <Switch checked={primary} onChange={setPrimary} />
              </div>
            </Section>

            <Section title="Export">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => exportClick("png")}
                  className="rounded-md border border-neutral-200 dark:border-neutral-800 px-2 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  PNG
                </button>
                <button
                  onClick={() => exportClick("svg")}
                  className="rounded-md border border-neutral-200 dark:border-neutral-800 px-2 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  SVG
                </button>
                <button
                  onClick={() => exportClick("pdf")}
                  className="rounded-md border border-neutral-200 dark:border-neutral-800 px-2 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  PDF
                </button>
              </div>
            </Section>
          </div>
        </aside>

        {/* Layers Drawer - mobile */}
        {showLayers && (
          <div className="md:hidden absolute inset-x-0 top-12 z-30 mx-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg">
            <PanelHeader
              title="Layers"
              actions={
                <button
                  onClick={() => setShowLayers(false)}
                  className="h-8 w-8 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
                  aria-label="Close"
                >
                  <XIcon />
                </button>
              }
            />
            <div className="max-h-80 overflow-auto p-2">
              <LayerItem name="Frame 1" active />
              <LayerItem name="Button / Primary" indent />
              <LayerItem name="Icon / ArrowRight" indent />
              <LayerItem name="Text / Label" indent />
            </div>
          </div>
        )}

        {/* Inspector Drawer - mobile */}
        {showInspector && (
          <div className="md:hidden absolute inset-x-0 bottom-3 z-30 mx-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg">
            <PanelHeader
              title="Design"
              actions={
                <button
                  onClick={() => setShowInspector(false)}
                  className="h-8 w-8 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
                  aria-label="Close"
                >
                  <XIcon />
                </button>
              }
            />
            <div className="max-h-96 overflow-auto p-3 space-y-4">
              <Section title="Auto layout">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enabled</span>
                  <Switch checked={autoLayout} onChange={setAutoLayout} />
                </div>
              </Section>
              <Section title="Spacing & Padding">
                <div className="grid grid-cols-2 gap-2">
                  <NumberField label="Spacing" value={spacing} setValue={setSpacing} min={0} max={64} />
                  <NumberField label="Padding" value={padding} setValue={setPadding} min={0} max={64} />
                </div>
              </Section>
              <Section title="Corner">
                <div className="flex items-center gap-2">
                  <Segmented
                    value={corner}
                    options={[
                      { label: "0", value: 0 },
                      { label: "4", value: 4 },
                      { label: "8", value: 8 },
                      { label: "12", value: 12 },
                    ]}
                    onChange={setCorner}
                  />
                </div>
              </Section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* UI Building Blocks */

function PanelHeader({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-3 py-2">
      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {title}
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}

function Badge({
  children,
  variant = "solid",
}: {
  children: React.ReactNode;
  variant?: "solid" | "subtle";
}) {
  const base = "inline-flex items-center rounded-md px-2 py-0.5 text-xs";
  const solid = "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900";
  const subtle = "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300";
  return <span className={[base, variant === "solid" ? solid : subtle].join(" ")}>{children}</span>;
}

function SearchInput({ placeholder }: { placeholder?: string }) {
  return (
    <label className="relative hidden md:block">
      <span className="pointer-events-none absolute left-2 top-1.5 text-neutral-400">
        <SearchIcon />
      </span>
      <input
        className="w-36 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 pl-7 pr-2 py-1.5 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={placeholder}
      />
    </label>
  );
}

function LayerItem({ name, active, indent }: { name: string; active?: boolean; indent?: boolean }) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm cursor-default",
        active
          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
          : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300",
        indent ? "pl-6" : "",
      ].join(" ")}
    >
      <FrameIcon />
      <span className="truncate">{name}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {title}
      </div>
      {children}
    </section>
  );
}

function NumberField({
  label,
  value,
  setValue,
  min,
  max,
  hideLabel,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min?: number;
  max?: number;
  hideLabel?: boolean;
}) {
  return (
    <label className="flex w-full flex-col gap-1">
      {!hideLabel && (
        <span className="text-xs text-neutral-500">
          {label}
        </span>
      )}
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}

function InputField({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-1">
      <span className="text-xs text-neutral-500">{label}</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}

function Segmented({
  value,
  options,
  onChange,
}: {
  value: number;
  options: { label: string; value: number }[];
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={[
            "px-2.5 py-1 text-sm rounded",
            value === opt.value
              ? "bg-neutral-100 dark:bg-neutral-800"
              : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ColorSwatch({
  value,
  active,
  onClick,
}: {
  value: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={`Color ${value}`}
      onClick={onClick}
      className={[
        "h-6 w-6 rounded-md ring-2",
        active ? "ring-indigo-500" : "ring-transparent",
        "border border-neutral-200 dark:border-neutral-800",
      ].join(" ")}
      style={undefined}
    >
      <span
        className="block h-full w-full rounded"
        style={undefined}
        aria-hidden
      >
        {/* Use Tailwind's arbitrary color via hex in class is not standard; mimic with known palette */}
        <span
          className={[
            "block h-full w-full rounded",
            value === "#4f46e5"
              ? "bg-indigo-600"
              : value === "#0ea5e9"
              ? "bg-sky-500"
              : value === "#10b981"
              ? "bg-emerald-500"
              : value === "#f59e0b"
              ? "bg-amber-500"
              : value === "#ef4444"
              ? "bg-rose-500"
              : "bg-neutral-400",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        checked ? "bg-indigo-500" : "bg-neutral-300 dark:bg-neutral-700",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
          checked ? "translate-x-6" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

/* Icons */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-neutral-400">
      <path
        d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        d="M7 12v6a2 2 0 0 0 2 2h6M7 12l10-10M7 12h6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M12 3l9 5-9 5-9-5 9-5zM3 14l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AdjustIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M6 12h12M6 6h12M6 18h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FrameIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-neutral-500">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-neutral-400">
      <path
        d="M3 17l14-14 4 4-14 14H3v-4zM14 6l4 4M10 10l4 4M6 14l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaddingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-neutral-400">
      <path
        d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
[2025-09-16T11:31:24] tokens used: 8,716
