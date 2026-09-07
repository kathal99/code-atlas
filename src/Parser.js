export async function parseCodebase(files) {
  const nodes = [];
  const links = [];
  const fileMap = new Map();

  const codeFiles = files.filter(file => {
    const path = file.webkitRelativePath || file.name;
    return /\.(js|jsx|ts|tsx)$/.test(path) && !path.includes('node_modules');
  });

  codeFiles.forEach(file => {
    const path = file.webkitRelativePath || file.name;
    const node = { id: path, name: file.name, path: path };
    nodes.push(node);
    fileMap.set(file.name.replace(/\.[^/.]+$/, ""), node);
  });

  for (const file of codeFiles) {
    const text = await file.text();
    const currentPath = file.webkitRelativePath || file.name;
    const importRegex = /import\s+[\s\S]*?from\s+['"](\..*?)['"]/g;
    let match;

    while ((match = importRegex.exec(text)) !== null) {
      const importedPath = match[1];
      const targetName = importedPath.split('/').pop();
      
      for (const [targetKey, targetNode] of fileMap.entries()) {
        if (targetKey === targetName && targetNode.id !== currentPath) {
          links.push({ source: currentPath, target: targetNode.id });
        }
      }
    }
  }

  return { nodes, links };
}