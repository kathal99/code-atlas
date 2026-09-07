import React, { useState } from 'react';
import { parseCodebase } from './Parser';
import GraphViewer from './GraphViewer';

export default function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [projectName, setProjectName] = useState('My Codebase');

  const handleFolderUpload = async (e) => {
    setLoading(true);
    const files = Array.from(e.target.files);
    if (files.length > 0 && files[0].webkitRelativePath) {
      const rootFolder = files[0].webkitRelativePath.split('/')[0];
      setProjectName(rootFolder);
    }
    const data = await parseCodebase(files);
    setGraphData(data);
    setLoading(false);
  };

  const handleExportSnapshot = () => {
    const snapshotText = `🗺️ CodeAtlas Architecture Snapshot: [${projectName}]
--------------------------------------------------
📁 Total Mapped Modules: ${graphData.nodes.length}
🔗 Total ES6 Dependencies: ${graphData.links.length}
⚡ Density Ratio: ${(graphData.links.length / (graphData.nodes.length || 1)).toFixed(2)} links/module
--------------------------------------------------
Generated with CodeAtlas - Interactive Codebase Visualizer`;

    navigator.clipboard.writeText(snapshotText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header */}
      <header style={{ marginBottom: '28px', textAlign: 'center', maxWidth: '700px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '6px 14px', borderRadius: '20px', marginBottom: '16px', fontSize: '0.75rem', color: '#38bdf8' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #38bdf8' }}></span>
          <span>Engineered for Visual Architecture Analysis</span>
        </div>
        <h1 style={{ fontSize: '2.75rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 10px 0', letterSpacing: '-0.03em' }}>
          Code<span style={{ color: '#38bdf8' }}>Atlas</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
          Drop any local repository folder to map module imports, resolve file dependencies, and render a physics-driven network graph.
        </p>
      </header>

      {/* Control Actions & Export Bar */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <label style={{ backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '600', padding: '12px 20px', borderRadius: '10px', boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.2)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📂</span> {loading ? 'Analyzing Codebase...' : 'Select Project Folder'}
          <input type="file" webkitdirectory="" onChange={handleFolderUpload} style={{ display: 'none' }} />
        </label>
        
        {graphData.nodes.length > 0 && (
          <>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#cbd5e1', backgroundColor: '#0f172a', padding: '12px 20px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <div>📁 Modules: <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{graphData.nodes.length}</span></div>
              <div style={{ borderLeft: '1px solid #334155', paddingLeft: '16px' }}>🔗 Links: <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{graphData.links.length}</span></div>
            </div>

            <button 
              onClick={handleExportSnapshot}
              style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: copied ? '#4ade80' : '#38bdf8', fontWeight: '600', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{copied ? '✅' : '📋'}</span> {copied ? 'Snapshot Copied!' : 'Export Snapshot'}
            </button>
          </>
        )}
      </div>

      {/* Graph Display */}
      <div style={{ width: '100%', maxWidth: '1050px' }}>
        <GraphViewer graphData={graphData} />
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '32px', fontSize: '0.75rem', color: '#64748b' }}>
        CodeAtlas v1.0 • Built with React, Vite, & D3 Force Physics
      </footer>
    </div>
  );
}