document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let width, height;

  const nodes = [];
  const nodeCount = 50;
  const colors = ['#FF6B6B', '#4ECDC4', '#1A535C', '#F7FFF7', '#FFE66D'];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createNodes() {
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 2,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function drawBackground() {
    ctx.clearRect(0, 0, width, height);
    
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#003366');
    gradient.addColorStop(1, '#6699FF');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function drawNodes() {
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.fill();

      node.x += node.dx;
      node.y += node.dy;

      if (node.x < 0 || node.x > width) node.dx *= -1;
      if (node.y < 0 || node.y > height) node.dy *= -1;
    });
  }

  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.stroke();
        }
      }
    }
  }

  function animateBackground() {
    drawBackground();
    drawConnections();
    drawNodes();
    requestAnimationFrame(animateBackground);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  createNodes();
  animateBackground();
});