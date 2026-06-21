import { useState } from "react";

interface DAGNode {
  label: string;
  desc: string;
  detail: string;
}

const NODES: DAGNode[] = [
  { label: "PROJECTION", desc: "Column pruning", detail: "Select only requested fields. Eliminates unneeded columns before scan — reduces I/O by avg 40%." },
  { label: "GRAPH FILTER", desc: "Edge traversal", detail: "Walks adjacency list pruning disconnected subgraphs. Uses CSR adjacency for O(E) traversal with branch hints." },
  { label: "INDEX SCAN", desc: "HNSW descent", detail: "Navigates HNSW layers from top→bottom using ef_search=40. Returns top-K candidates via distance oracle." },
];

export function DAGPlan() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="dag-plan-container">
      <div className="dag-plan-header">
        <span className="dag-plan-prompt">$</span> query plan — dag execution
      </div>
      <div className="dag-plan-row">
        {NODES.map((node, i) => (
          <div key={i} className="dag-plan-node-wrap">
          <div
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="dag-plan-node"
          >
              <div className="dag-plan-label">
                {node.label}
              </div>
              <div className="dag-plan-desc">
                {node.desc}
              </div>
            </div>
            {i < NODES.length - 1 && (
              <div className="dag-plan-arrow">
                →
              </div>
            )}
          </div>
        ))}
      </div>
      {hovered !== null && (
        <div className="dag-plan-detail">
          {NODES[hovered].detail}
        </div>
      )}
    </div>
  );
}
