function normalizeSeries(series) {
  if (!Array.isArray(series)) {
    return [];
  }
  return series
    .map((entry) => (entry && typeof entry === "object" ? { label: String(entry.label ?? ""), value: Number(entry.value ?? 0) } : null))
    .filter(Boolean);
}

export function renderCharts(root = document) {
  const nodes = root.querySelectorAll("[data-chart]");
  nodes.forEach((node) => {
    if (node.dataset.chartRendered === "true") {
      return;
    }
    let payload;
    try {
      payload = JSON.parse(node.dataset.chart || "{}");
    } catch {
      return;
    }
    const series = normalizeSeries(payload.series);
    if (!series.length) {
      return;
    }
    const max = Math.max(...series.map((item) => item.value), 1);
    node.innerHTML = "";
    const chart = document.createElement("div");
    chart.className = "chart";
    for (const item of series) {
      const row = document.createElement("div");
      row.className = "chart-row";
      const label = document.createElement("div");
      label.className = "chart-label";
      label.textContent = item.label;
      const track = document.createElement("div");
      track.className = "chart-track";
      const fill = document.createElement("div");
      fill.className = "chart-fill";
      fill.style.width = `${Math.max(2, (item.value / max) * 100)}%`;
      track.appendChild(fill);
      const value = document.createElement("div");
      value.className = "chart-value";
      value.textContent = String(item.value);
      row.append(label, track, value);
      chart.appendChild(row);
    }
    node.appendChild(chart);
    node.dataset.chartRendered = "true";
  });
}
