import { Plugin, ItemView } from "obsidian";

/**
 * Plugin to display node size in Obsidian Console.
 */
export default class DisplayCurrentNodeSize extends Plugin {
    async onload(): Promise<void> {

		const setSize = this.addStatusBarItem().createEl("span");

        this.app.workspace.on('file-open', () => {
            const canvasView = this.app.workspace.getActiveViewOfType(ItemView);
            const canvas = (canvasView as any).canvas;

            if (canvas) {
                const canvasElement = canvas.canvasEl;
                const nodes = canvasElement.querySelectorAll(".canvas-node");

                nodes.forEach((node: Element) => {
                    const observer = new ResizeObserver((entries) => {
                        for (let entry of entries) {
							setSize.textContent = `Width: ${entry.contentRect.width}px - Height: ${entry.contentRect.height}px`;
                        }
                    });
                
                    observer.observe(node);
                });

            } else {
                console.log("Ooop :(");
            }
        });
    }
}