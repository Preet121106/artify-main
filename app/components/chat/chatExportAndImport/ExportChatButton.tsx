import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { workbenchStore } from "~/lib/stores/workbench";
import { classNames } from "~/utils/classNames";

export const ExportChatButton = ({ exportChat }: { exportChat?: () => void }) => {
  return (
    <div className="flex border border-artify-elements-borderColor rounded-md overflow-hidden mr-2 text-sm">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-bold bg-green-600 text-black hover:bg-green-700 transition-colors">
          Export
          <span className={classNames("i-ph:caret-down transition-transform")} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          className={classNames(
            "z-[250]",
            "bg-artify-elements-background-depth-2",
            "rounded-lg shadow-lg",
            "border border-artify-elements-borderColor",
            "animate-in fade-in-0 zoom-in-95",
            "py-1",
          )}
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item
            className={classNames(
              "cursor-pointer flex items-center w-auto px-4 py-2 text-sm text-artify-elements-textPrimary hover:bg-artify-elements-item-backgroundActive gap-2 rounded-md group relative",
            )}
            onClick={() => {
              workbenchStore.downloadZip();
            }}
          >
            <div className="i-ph:code size-4.5"></div>
            <span>Download Code</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={classNames(
              "cursor-pointer flex items-center w-full px-4 py-2 text-sm text-artify-elements-textPrimary hover:bg-artify-elements-item-backgroundActive gap-2 rounded-md group relative",
            )}
            onClick={() => exportChat?.()}
          >
            <div className="i-ph:chat size-4.5"></div>
            <span>Export Chat</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
