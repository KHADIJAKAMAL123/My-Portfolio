/**
 * Interactive System Particle Background & "Cyber Defense" Game Engine
 * Standalone HTML5 Canvas Engine (Zero External Dependencies)
 */
(function () {
  'use strict';

  // ==========================================================================
  // PART 1: AMBIENT HERO PARTICLE NETWORK
  // ==========================================================================

  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function resizeCanvas() {
      const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : canvas.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || 500;
    }

    resizeCanvas();

    const particles = [];
    const particleCount = Math.floor(Math.min(width, height) / 14);
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class HeroParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = Math.random() * 2 + 1.5;
        this.baseAlpha = Math.random() * 0.4 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Proximity displacement
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= Math.cos(angle) * force * 3.5;
            this.y -= Math.sin(angle) * force * 3.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123, 208, 244, ${this.baseAlpha})`;
        ctx.shadowColor = '#7BD0F4';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new HeroParticle());
    }

    function animateHeroParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const alpha = (1 - dist / 125) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(122, 28, 62, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateHeroParticles);
    }

    animateHeroParticles();
    window.addEventListener('resize', resizeCanvas);
  }

  // ==========================================================================
  // PART 2: CYBER CORE SHIELD MINI-GAME
  // ==========================================================================

  function initCyberCollectorGame() {
    const canvas = document.getElementById('game-canvas');
    const startBtn = document.getElementById('start-game-btn');
    const scoreDisplay = document.getElementById('game-score');
    const highScoreDisplay = document.getElementById('game-highscore');
    const healthDisplay = document.getElementById('game-health');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animationFrameId = null;

    function updateCanvasDimensions() {
      const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : canvas.getBoundingClientRect();
      width = canvas.width = rect.width || 800;
      height = canvas.height = 420;
    }

    updateCanvasDimensions();

    let gameState = 'MENU';
    let score = 0;
    let health = 100;
    let invincibilityTimer = 0;
    let highScore = parseInt(localStorage.getItem('cyber_core_high_score') || '0', 10);
    if (highScoreDisplay) highScoreDisplay.textContent = highScore.toString();

    const player = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 16,
      ringAngle: 0,
      speed: 8,
    };

    let nodes = [];
    let particles = [];
    const keys = {};

    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        keys[key] = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        keys[key] = false;
      }
    });

    function handlePointerMove(clientX, clientY) {
      if (gameState !== 'PLAYING') return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      player.targetX = (clientX - rect.left) * scaleX;
      player.targetY = (clientY - rect.top) * scaleY;
    }

    canvas.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY));
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    function createExplosion(x, y, color, count = 18) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 1.5,
          color,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
        });
      }
    }

    function spawnNode(type) {
      const margin = 40;
      let x, y;

      if (type === 'HAZARD') {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { x = Math.random() * width; y = -15; }
        else if (side === 1) { x = width + 15; y = Math.random() * height; }
        else if (side === 2) { x = Math.random() * width; y = height + 15; }
        else { x = -15; y = Math.random() * height; }
      } else {
        x = Math.random() * (width - margin * 2) + margin;
        y = Math.random() * (height - margin * 2) + margin;
      }

      nodes.push({
        type,
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        radius: type === 'CUBE' ? 10 : type === 'SPHERE' ? 12 : 14,
        pulse: Math.random() * Math.PI * 2,
        speed: type === 'HAZARD' ? Math.random() * 1.5 + 1.1 : 0,
      });
    }

    function drawGrid() {
      ctx.strokeStyle = 'rgba(244, 224, 123, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    function drawMenu() {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      ctx.save();
      ctx.font = '700 22px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F4E07B';
      ctx.shadowColor = '#F4E07B';
      ctx.shadowBlur = 12;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CYBER CORE SHIELD', width / 2, height / 2 - 20);

      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillStyle = '#7BD0F4';
      ctx.shadowBlur = 0;
      ctx.fillText('[ CLICK "START CYBER GAME" TO INITIALIZE ]', width / 2, height / 2 + 20);
      ctx.restore();
    }

    function startGame() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      gameState = 'PLAYING';
      score = 0;
      health = 100;
      invincibilityTimer = 0;
      if (scoreDisplay) scoreDisplay.textContent = '0';
      if (healthDisplay) healthDisplay.textContent = '100%';

      player.x = width / 2;
      player.y = height / 2;
      player.targetX = width / 2;
      player.targetY = height / 2;

      nodes = [];
      particles = [];

      for (let i = 0; i < 4; i++) spawnNode('CUBE');
      spawnNode('SPHERE');
      for (let i = 0; i < 2; i++) spawnNode('HAZARD');

      if (startBtn) {
        startBtn.textContent = 'Reboot Cyber Core';
        startBtn.classList.remove('btn-glow');
        startBtn.classList.add('btn-glass');
      }

      gameLoop();
    }

    function gameOver() {
      gameState = 'GAMEOVER';
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      if (score > highScore) {
        highScore = score;
        localStorage.setItem('cyber_core_high_score', highScore.toString());
        if (highScoreDisplay) highScoreDisplay.textContent = highScore.toString();
      }

      ctx.save();
      ctx.fillStyle = 'rgba(24, 12, 20, 0.92)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '700 22px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FF4D4D';
      ctx.shadowColor = '#FF4D4D';
      ctx.shadowBlur = 12;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CORE SHIELD COLLAPSED', width / 2, height / 2 - 20);

      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F4E07B';
      ctx.shadowColor = '#F4E07B';
      ctx.shadowBlur = 6;
      ctx.fillText(`FINAL SCORE: ${score}  |  HIGH SCORE: ${highScore}`, width / 2, height / 2 + 20);
      ctx.restore();

      if (startBtn) {
        startBtn.textContent = 'Purge & Reboot';
        startBtn.classList.remove('btn-glass');
        startBtn.classList.add('btn-glow');
      }
    }

    function gameLoop() {
      if (gameState !== 'PLAYING') return;

      ctx.clearRect(0, 0, width, height);
      drawGrid();

      if (invincibilityTimer > 0) invincibilityTimer--;

      if (keys['arrowup'] || keys['w']) player.targetY -= player.speed;
      if (keys['arrowdown'] || keys['s']) player.targetY += player.speed;
      if (keys['arrowleft'] || keys['a']) player.targetX -= player.speed;
      if (keys['arrowright'] || keys['d']) player.targetX += player.speed;

      player.targetX = Math.max(player.radius, Math.min(width - player.radius, player.targetX));
      player.targetY = Math.max(player.radius, Math.min(height - player.radius, player.targetY));

      player.x += (player.targetX - player.x) * 0.22;
      player.y += (player.targetY - player.y) * 0.22;

      // Draw Revolving Shield Core
      player.ringAngle += 0.05;
      ctx.save();

      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius + 6, player.ringAngle, player.ringAngle + Math.PI * 1.4);
      ctx.strokeStyle = invincibilityTimer > 0 ? '#7BD0F4' : '#7A1C3E';
      ctx.lineWidth = 3;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fillStyle = invincibilityTimer > 0 ? '#7BD0F4' : '#F4E07B';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();

      // Update & Render Nodes
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        node.pulse += 0.05;
        node.angle += node.rotationSpeed;

        if (node.type === 'HAZARD') {
          const dx = player.x - node.x;
          const dy = player.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            node.x += (dx / dist) * node.speed;
            node.y += (dy / dist) * node.speed;
          }
        }

        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.rotate(node.angle);

        if (node.type === 'CUBE') {
          const size = (node.radius * 2) + Math.sin(node.pulse) * 1.5;
          ctx.strokeStyle = '#7BD0F4';
          ctx.fillStyle = 'rgba(123, 208, 244, 0.25)';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#7BD0F4';
          ctx.shadowBlur = 12;
          ctx.fillRect(-size / 2, -size / 2, size, size);
          ctx.strokeRect(-size / 2, -size / 2, size, size);
        } else if (node.type === 'SPHERE') {
          const r = node.radius + Math.sin(node.pulse) * 2;
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(2, r), 0, Math.PI * 2);
          ctx.fillStyle = '#F4E07B';
          ctx.shadowColor = '#F4E07B';
          ctx.shadowBlur = 16;
          ctx.fill();
        } else if (node.type === 'HAZARD') {
          const spikes = 6;
          const outerR = node.radius + Math.sin(node.pulse) * 2;
          const innerR = outerR / 2;

          ctx.beginPath();
          for (let s = 0; s < spikes * 2; s++) {
            const r = s % 2 === 0 ? outerR : innerR;
            const a = (s * Math.PI) / spikes;
            const sx = Math.cos(a) * r;
            const sy = Math.sin(a) * r;
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fillStyle = '#FF4D4D';
          ctx.shadowColor = '#FF4D4D';
          ctx.shadowBlur = 14;
          ctx.fill();
        }
        ctx.restore();

        // Collision Check
        const dx = player.x - node.x;
        const dy = player.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < player.radius + node.radius) {
          if (node.type === 'CUBE') {
            score += 10;
            createExplosion(node.x, node.y, '#7BD0F4', 12);
            nodes.splice(i, 1);
            spawnNode('CUBE');
            if (score % 60 === 0) spawnNode('HAZARD');
          } else if (node.type === 'SPHERE') {
            score += 25;
            invincibilityTimer = 180;
            createExplosion(node.x, node.y, '#F4E07B', 20);
            nodes.splice(i, 1);
            setTimeout(() => spawnNode('SPHERE'), 8000);
          } else if (node.type === 'HAZARD') {
            if (invincibilityTimer === 0) {
              health -= 25;
              if (healthDisplay) healthDisplay.textContent = `${Math.max(0, health)}%`;
              createExplosion(player.x, player.y, '#FF4D4D', 22);
              nodes.splice(i, 1);
              spawnNode('HAZARD');
              if (health <= 0) {
                gameOver();
                return;
              }
            } else {
              createExplosion(node.x, node.y, '#7BD0F4', 14);
              nodes.splice(i, 1);
              spawnNode('HAZARD');
            }
          }

          if (scoreDisplay) scoreDisplay.textContent = score.toString();
        }
      }

      // Render Particle System
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    }

    if (startBtn) {
      startBtn.addEventListener('click', startGame);
    }

    window.addEventListener('resize', () => {
      updateCanvasDimensions();
      if (gameState === 'MENU') drawMenu();
    });

    drawMenu();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    initCyberCollectorGame();
  });
})();