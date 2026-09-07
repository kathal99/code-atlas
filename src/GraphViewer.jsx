import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function GraphViewer({ graphData }) {
  const svgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!graphData.nodes.length) return;

    const width = 1000;
    const height = 650;

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    const g = svg.append('g');
    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      }));

    const simulation = d3.forceSimulation(graphData.nodes)
      .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(130))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = g.append('g')
      .attr('stroke', '#334155')
      .attr('stroke-opacity', 0.8)
      .selectAll('line')
      .data(graphData.links)
      .join('line')
      .attr('stroke-width', 2);

    const node = g.append('g')
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 2)
      .selectAll('circle')
      .data(graphData.nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', '#38bdf8')
      .style('cursor', 'pointer')
      .on('click', (event, d) => setSelectedNode(d))
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    const label = g.append('g')
      .selectAll('text')
      .data(graphData.nodes)
      .join('text')
      .text(d => d.name)
      .attr('font-size', '12px')
      .attr('fill', '#cbd5e1')
      .attr('dx', 12)
      .attr('dy', 4);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      label
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });
  }, [graphData]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '650px', backgroundColor: '#090d16', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
      {selectedNode ? (
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '16px', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)', fontSize: '0.875rem', maxWidth: '320px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>{selectedNode.name}</span>
            <button onClick={() => setSelectedNode(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.75rem', margin: 0, wordBreak: 'break-all' }}>Path: {selectedNode.path}</p>
        </div>
      ) : (
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', border: '1px solid #1e293b', padding: '10px 14px', borderRadius: '8px', fontSize: '0.75rem', color: '#94a3b8', pointerEvents: 'none' }}>
          💡 Tip: Click any node for file info • Scroll to zoom • Drag nodes to reposition
        </div>
      )}
    </div>
  );
}