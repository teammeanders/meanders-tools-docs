import type { MeandersComponent } from "@/types/meanders";

type Props = {
  component: MeandersComponent;
};

const ICON_BASE =
  "https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/assets/icons/";

export function GrasshopperComponent({ component }: Props) {
  return (
    <div className="flex justify-center py-8">
      <div className="w-[420px] overflow-hidden rounded-md border border-neutral-400 bg-neutral-200 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-neutral-400 bg-neutral-300 px-4 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-white">
            <img
              src={`${ICON_BASE}${component.icon}`}
              alt={component.name}
              className="h-8 w-8 object-contain"
            />
          </div>

          <div>
            <div className="font-semibold text-neutral-800">
              {component.name}
            </div>

            <div className="text-xs text-neutral-600">{component.nickname}</div>
          </div>
        </div>

        {/* Node Body */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 px-4 py-5">
          {/* Inputs */}
          <div className="space-y-3">
            {component.inputs.map((input) => (
              <div key={input.name} className="flex items-center gap-2 text-sm">
                <span className="h-3 w-3 rounded-full bg-neutral-600" />

                <div>
                  <div className="font-medium">{input.nickname}</div>

                  <div className="text-xs text-neutral-500">{input.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Center */}
          <div className="flex items-center justify-center">
            <div className="h-full w-px bg-neutral-400" />
          </div>

          {/* Outputs */}
          <div className="space-y-3 text-right">
            {component.outputs.map((output) => (
              <div
                key={output.name}
                className="flex items-center justify-end gap-2 text-sm"
              >
                <div>
                  <div className="font-medium">{output.nickname}</div>

                  <div className="text-xs text-neutral-500">{output.name}</div>
                </div>

                <span className="h-3 w-3 rounded-full bg-neutral-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-400 bg-neutral-300 px-4 py-2 text-xs text-neutral-600">
          {component.category} / {component.subcategory}
        </div>
      </div>
    </div>
  );
}
