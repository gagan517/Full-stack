(() => {
  const svg = document.getElementById('board');
  const layer = document.getElementById('layer');
  const toolSel = document.getElementById('tool');
  const colorInp = document.getElementById('color');
  const sizeInp = document.getElementById('size');
  const clearBtn = document.getElementById('clear');
  const undoBtn = document.getElementById('undo');

  let drawing = false;
  let start = { x: 0, y: 0 };
  let current = null;
  let lastPoints = '';

  function svgPoint(evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }

  function beginDraw(evt) {
    if (evt.button !== undefined && evt.button !== 0) return;
    const { x, y } = svgPoint(evt);
    drawing = true;
    start = { x, y };
    const stroke = colorInp.value;
    const width = sizeInp.value;
    const tool = toolSel.value;

    if (tool === 'freehand') {
      current = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      current.setAttribute('fill', 'none');
      current.setAttribute('stroke', stroke);
      current.setAttribute('stroke-width', width);
      current.setAttribute('stroke-linecap', 'round');
      current.setAttribute('stroke-linejoin', 'round');
      lastPoints = `${x},${y}`;
      current.setAttribute('points', lastPoints);
      layer.appendChild(current);
    } else if (tool === 'line') {
      current = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      current.setAttribute('x1', x);
      current.setAttribute('y1', y);
      current.setAttribute('x2', x);
      current.setAttribute('y2', y);
      current.setAttribute('stroke', stroke);
      current.setAttribute('stroke-width', width);
      current.setAttribute('stroke-linecap', 'round');
      layer.appendChild(current);
    } else if (tool === 'rect') {
      current = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      current.setAttribute('x', x);
      current.setAttribute('y', y);
      current.setAttribute('width', 0);
      current.setAttribute('height', 0);
      current.setAttribute('fill', 'none');
      current.setAttribute('stroke', stroke);
      current.setAttribute('stroke-width', width);
      layer.appendChild(current);
    }

    svg.style.cursor = 'crosshair';
    window.addEventListener('mouseup', endDrawOnce, { once: true });
  }

  function draw(evt) {
    if (!drawing || !current) return;
    const { x, y } = svgPoint(evt);
    const tool = toolSel.value;

    if (tool === 'freehand') {
      const lp = lastPoints.split(' ').pop();
      if (lp) {
        const [px, py] = lp.split(',').map(Number);
        const dx = x - px, dy = y - py;
        if (dx * dx + dy * dy < 0.25) return;
      }
      lastPoints += ` ${x},${y}`;
      current.setAttribute('points', lastPoints);
    } else if (tool === 'line') {
      current.setAttribute('x2', x);
      current.setAttribute('y2', y);
    } else if (tool === 'rect') {
      const rx = Math.min(x, start.x);
      const ry = Math.min(y, start.y);
      const rw = Math.abs(x - start.x);
      const rh = Math.abs(y - start.y);
      current.setAttribute('x', rx);
      current.setAttribute('y', ry);
      current.setAttribute('width', rw);
      current.setAttribute('height', rh);
    }
  }

  function endDraw() {
    drawing = false;
    current = null;
    lastPoints = '';
    svg.style.cursor = 'default';
  }

  function endDrawOnce() { endDraw(); }

  svg.addEventListener('mousedown', beginDraw);
  svg.addEventListener('mousemove', draw);
  svg.addEventListener('mouseup', endDraw);
  svg.addEventListener('mouseleave', endDraw);

  clearBtn.addEventListener('click', () => {
    while (layer.firstChild) layer.removeChild(layer.firstChild);
  });

  undoBtn.addEventListener('click', () => {
    const last = layer.lastElementChild;
    if (last) layer.removeChild(last);
  });
})();
