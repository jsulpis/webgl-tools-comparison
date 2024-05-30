import { onCanvasResize, setupBlob, vertex, fragment } from "common";

const canvas = document.querySelector("canvas");
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
worker.postMessage({ type: "main", payload: { canvas: offscreen, fragment, vertex } }, [offscreen]);

setupBlob(canvas, (targetMouseCoords) => {
  worker.postMessage({ type: "mouseUpdate", payload: targetMouseCoords });
});

onCanvasResize(canvas, ({ devicePixelSize }) => {
  worker.postMessage({ type: "canvasResize", payload: devicePixelSize });
});
