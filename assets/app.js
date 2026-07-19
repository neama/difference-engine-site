import { loadJson } from "./data.js";
import { renderCharts } from "./charts.js";

async function boot() {
  const root = document.querySelector("[data-page-root]");
  const errorNode = document.querySelector("[data-snapshot-error]");
  const chip = document.querySelector("[data-snapshot-chip]");
  if (!root) {
    return;
  }
  const snapshotUrl = root.dataset.snapshotUrl;
  const expectedGeneration = root.dataset.generationId;
  try {
    const snapshot = await loadJson(snapshotUrl);
    if (!snapshot || typeof snapshot !== "object") {
      throw new Error("snapshot payload is not an object");
    }
    if (expectedGeneration && snapshot.generation_id && snapshot.generation_id !== expectedGeneration) {
      throw new Error(`snapshot generation mismatch: expected ${expectedGeneration}, got ${snapshot.generation_id}`);
    }
    if (chip) {
      chip.textContent = `Snapshot validated: ${snapshot.generation_id || expectedGeneration || "unknown"}`;
    }
    document.body.dataset.snapshotReady = "true";
    renderCharts(document);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (errorNode) {
      errorNode.hidden = false;
      errorNode.textContent = `Current snapshot could not be loaded: ${message}`;
    }
    if (chip) {
      chip.textContent = "Snapshot unavailable";
      chip.style.color = "var(--bad)";
      chip.style.background = "rgba(138, 45, 45, 0.08)";
      chip.style.borderColor = "rgba(138, 45, 45, 0.18)";
    }
    document.body.dataset.snapshotReady = "false";
  }
}

boot();
