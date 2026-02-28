import { useEffect, useRef } from 'react'
import './ParticleCanvas.css'

/**
 * ParticleCanvas — cinematic deep-space particle background
 * Faithfully ported from Particles/Baground.js v3
 * Nebula clouds · Glowing orbs · Micro-dust · Shooting stars
 * Meteors · Comets · Constellation lines · Color cycling
 */
export default function ParticleCanvas({ overrideColor = null }) {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const stateRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        // ═══ CONFIG ═══
        const isMobile = window.innerWidth <= 768;
        const DUST_COUNT = isMobile ? 80 : 180;
        const ORB_COUNT = isMobile ? 8 : 18;
        const NEBULA_COUNT = isMobile ? 3 : 5;
        const SHOOT_INTERVAL = 3500
        const METEOR_INTERVAL = 8000
        const COMET_INTERVAL = 12000
        const CONNECT_DIST = 120
        const MOUSE_RADIUS = 150
        const MOUSE_STRENGTH = 1.2
        const CYCLE_DURATION = 7000

        const PALETTES = [
            { hue: 0, sat: 0 },
            { hue: 192, sat: 100 },
            { hue: 20, sat: 95 },
            { hue: 145, sat: 70 },
            { hue: 260, sat: 65 },
            { hue: 330, sat: 85 },
        ]

        let W = 0, H = 0
        let mouseX = -9999, mouseY = -9999
        let paletteIdx = 0, nextPaletteIdx = 1, cycleT = 0, lastTime = 0
        let liveHue = PALETTES[0].hue, liveSat = PALETTES[0].sat
        let dustParticles = [], orbParticles = [], nebulaParticles = []
        let shootingStars = [], meteors = [], comets = []
        let lastShoot = 0, lastMeteor = 0, lastComet = 0
        let grid = {}

        // ═══ HELPERS ═══
        const lerp = (a, b, t) => a + (b - a) * t
        const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        const lerpAngle = (a, b, t) => {
            let diff = b - a
            if (diff > 180) diff -= 360
            if (diff < -180) diff += 360
            return ((a + diff * t) % 360 + 360) % 360
        }
        const rand = (min, max) => Math.random() * (max - min) + min
        const randInt = (min, max) => Math.floor(rand(min, max + 1))

        // ═══ COLORS ═══
        function updateColors(time) {
            if (overrideColor) { liveHue = overrideColor.hue; liveSat = overrideColor.sat; lastTime = time; return }
            if (lastTime === 0) lastTime = time
            cycleT += (time - lastTime) / CYCLE_DURATION
            lastTime = time
            if (cycleT >= 1) { cycleT -= 1; paletteIdx = nextPaletteIdx; nextPaletteIdx = (nextPaletteIdx + 1) % PALETTES.length }
            const e = easeInOut(cycleT)
            liveHue = lerpAngle(PALETTES[paletteIdx].hue, PALETTES[nextPaletteIdx].hue, e)
            liveSat = lerp(PALETTES[paletteIdx].sat, PALETTES[nextPaletteIdx].sat, e)
        }
        const primaryColor = a => `hsla(${liveHue}, ${liveSat}%, 70%, ${a})`
        const secondaryColor = a => `hsla(${(liveHue + 30) % 360}, ${Math.max(liveSat - 15, 0)}%, 60%, ${a})`
        const glowColor = a => `hsla(${liveHue}, ${liveSat}%, 80%, ${a})`

        // ═══ DUST ═══
        class Dust {
            constructor() { this.reset(true) }
            reset(initial) {
                this.x = rand(0, W); this.y = rand(0, H)
                this.size = rand(0.5, 2.2); this.baseAlpha = rand(0.15, 0.55); this.alpha = this.baseAlpha
                this.vx = rand(-0.25, 0.25); this.vy = rand(-0.15, 0.15)
                this.depth = rand(0.3, 1); this.pulse = rand(0, Math.PI * 2); this.pulseSpd = rand(0.008, 0.025)
                this.colorType = Math.random() < 0.6 ? 0 : (Math.random() < 0.5 ? 1 : 2)
            }
            getColor() {
                if (this.colorType === 0) return primaryColor(this.alpha)
                if (this.colorType === 1) return secondaryColor(this.alpha)
                return `hsla(0, 0%, 88%, ${this.alpha * 0.5})`
            }
            update(time) {
                this.x += this.vx * this.depth; this.y += this.vy * this.depth
                this.x += Math.sin(time * 0.0006 + this.pulse) * 0.12 * this.depth
                this.y += Math.cos(time * 0.0005 + this.pulse) * 0.08 * this.depth
                this.pulse += this.pulseSpd
                this.alpha = this.baseAlpha + Math.sin(this.pulse) * 0.1
                if (mouseX > 0) {
                    const dx = this.x - mouseX, dy = this.y - mouseY, dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < MOUSE_RADIUS && dist > 1) {
                        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH * this.depth
                        this.x += (dx / dist) * force; this.y += (dy / dist) * force
                    }
                }
                if (this.x < -10) this.x = W + 10; if (this.x > W + 10) this.x = -10
                if (this.y < -10) this.y = H + 10; if (this.y > H + 10) this.y = -10
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.getColor(); ctx.fill()
            }
        }

        // ═══ GLOWING ORBS ═══
        class Orb {
            constructor() { this.reset(true) }
            reset() {
                this.x = rand(0, W); this.y = rand(0, H)
                this.size = rand(3, 7); this.baseAlpha = rand(0.2, 0.5); this.alpha = this.baseAlpha
                this.vx = rand(-0.15, 0.15); this.vy = rand(-0.1, 0.1)
                this.glowSize = this.size * rand(3, 5); this.currentGlow = this.glowSize
                this.pulse = rand(0, Math.PI * 2); this.pulseSpd = rand(0.005, 0.015)
                this.rotation = rand(0, Math.PI * 2); this.rotSpd = rand(-0.005, 0.005)
            }
            update(time) {
                this.x += this.vx; this.y += this.vy
                this.x += Math.sin(time * 0.0004 + this.pulse) * 0.2
                this.y += Math.cos(time * 0.0003 + this.pulse) * 0.15
                this.rotation += this.rotSpd
                const p = Math.sin(time * this.pulseSpd + this.pulse)
                this.alpha = this.baseAlpha + p * 0.15; this.currentGlow = this.glowSize + p * 6
                if (mouseX > 0) {
                    const dx = this.x - mouseX, dy = this.y - mouseY, dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < MOUSE_RADIUS * 1.3 && dist > 1) {
                        const force = (1 - dist / (MOUSE_RADIUS * 1.3)) * 0.8
                        this.x += (dx / dist) * force; this.y += (dy / dist) * force
                    }
                }
                if (this.x < -30) this.x = W + 30; if (this.x > W + 30) this.x = -30
                if (this.y < -30) this.y = H + 30; if (this.y > H + 30) this.y = -30
            }
            draw() {
                ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation)
                const grad = ctx.createRadialGradient(0, 0, this.size * 0.3, 0, 0, this.currentGlow)
                grad.addColorStop(0, glowColor(this.alpha * 0.8))
                grad.addColorStop(0.4, glowColor(this.alpha * 0.3))
                grad.addColorStop(1, glowColor(0))
                ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(0, 0, this.currentGlow, 0, Math.PI * 2); ctx.fill()
                ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2)
                ctx.fillStyle = primaryColor(this.alpha); ctx.fill()
                ctx.restore()
            }
        }

        // ═══ NEBULA CLOUDS ═══
        class Nebula {
            constructor() { this.reset() }
            reset() {
                this.x = rand(0, W); this.y = rand(0, H)
                this.size = rand(120, 300); this.baseAlpha = rand(0.02, 0.06); this.alpha = this.baseAlpha
                this.vx = rand(-0.08, 0.08); this.vy = rand(-0.05, 0.05)
                this.pulse = rand(0, Math.PI * 2); this.pulseSpd = rand(0.002, 0.006)
                this.hueOffset = rand(-20, 20)
            }
            update(time) {
                this.x += this.vx; this.y += this.vy
                this.x += Math.sin(time * 0.0002 + this.pulse) * 0.08
                this.y += Math.cos(time * 0.00015 + this.pulse) * 0.06
                this.alpha = this.baseAlpha + Math.sin(time * this.pulseSpd + this.pulse) * 0.015
                if (mouseX > 0) {
                    const dx = mouseX - this.x, dy = mouseY - this.y, dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 400 && dist > 1) { const f = (1 - dist / 400) * 0.15; this.x += (dx / dist) * f; this.y += (dy / dist) * f }
                }
                if (this.x < -this.size) this.x = W + this.size; if (this.x > W + this.size) this.x = -this.size
                if (this.y < -this.size) this.y = H + this.size; if (this.y > H + this.size) this.y = -this.size
            }
            draw() {
                const h = ((liveHue + this.hueOffset) % 360 + 360) % 360, s = Math.max(liveSat - 10, 0)
                const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
                grad.addColorStop(0, `hsla(${h}, ${s}%, 55%, ${this.alpha})`)
                grad.addColorStop(0.5, `hsla(${h}, ${s}%, 40%, ${this.alpha * 0.5})`)
                grad.addColorStop(1, `hsla(${h}, ${s}%, 30%, 0)`)
                ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill()
            }
        }

        // ═══ SHOOTING STARS ═══
        class ShootingStar {
            constructor() {
                const side = randInt(0, 3)
                if (side === 0) { this.x = rand(0, W); this.y = -10 }
                else if (side === 1) { this.x = W + 10; this.y = rand(0, H) }
                else if (side === 2) { this.x = rand(0, W); this.y = H + 10 }
                else { this.x = -10; this.y = rand(0, H) }
                const angle = Math.atan2(rand(H * 0.2, H * 0.8) - this.y, rand(W * 0.2, W * 0.8) - this.x)
                this.speed = rand(8, 16); this.vx = Math.cos(angle) * this.speed; this.vy = Math.sin(angle) * this.speed
                this.alpha = 1; this.decay = rand(0.012, 0.025); this.size = rand(1.5, 3); this.trail = []
            }
            update() {
                this.trail.push({ x: this.x, y: this.y }); if (this.trail.length > 20) this.trail.shift()
                this.x += this.vx; this.y += this.vy; this.alpha -= this.decay
            }
            draw() {
                if (this.alpha <= 0) return
                for (let i = 0; i < this.trail.length; i++) {
                    const t = this.trail[i], ta = (i / this.trail.length) * this.alpha * 0.5, ts = this.size * (i / this.trail.length) * 0.6
                    ctx.beginPath(); ctx.arc(t.x, t.y, ts, 0, Math.PI * 2); ctx.fillStyle = glowColor(ta); ctx.fill()
                }
                const hg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4)
                hg.addColorStop(0, `hsla(0,0%,100%,${this.alpha})`); hg.addColorStop(0.3, glowColor(this.alpha * 0.7)); hg.addColorStop(1, glowColor(0))
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2); ctx.fillStyle = hg; ctx.fill()
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `hsla(0,0%,100%,${this.alpha})`; ctx.fill()
            }
            isDead() { return this.alpha <= 0 || this.x < -200 || this.x > W + 200 || this.y < -200 || this.y > H + 200 }
        }

        // ═══ METEORS ═══
        class Meteor {
            constructor() {
                const side = randInt(0, 2)
                if (side === 0) { this.x = rand(-50, W + 50); this.y = -40 }
                else if (side === 1) { this.x = W + 40; this.y = rand(-40, H * 0.4) }
                else { this.x = -40; this.y = rand(-40, H * 0.4) }
                const angle = rand(Math.PI * 0.15, Math.PI * 0.4), dir = this.x > W / 2 ? Math.PI - angle : angle
                this.speed = rand(3, 5.5); this.vx = Math.cos(dir) * this.speed; this.vy = Math.sin(dir) * this.speed
                this.size = rand(3.5, 6); this.alpha = 1; this.decay = rand(0.004, 0.008)
                this.trail = []; this.trailMax = 45; this.hueShift = rand(-10, 10); this.wobble = rand(0, Math.PI * 2)
            }
            update(time) {
                this.trail.push({ x: this.x, y: this.y, size: this.size, alpha: this.alpha })
                if (this.trail.length > this.trailMax) this.trail.shift()
                this.wobble += 0.05; this.x += this.vx + Math.sin(this.wobble) * 0.3; this.y += this.vy
                this.speed *= 0.9995; this.alpha -= this.decay
            }
            draw() {
                if (this.alpha <= 0) return
                const fh = (liveHue + 15 + this.hueShift) % 360
                for (let i = 0; i < this.trail.length; i++) {
                    const t = this.trail[i], p = i / this.trail.length, ta = p * t.alpha * 0.4, ts = t.size * p * 0.7
                    const eg = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, ts * 3)
                    eg.addColorStop(0, `hsla(${fh},${Math.max(liveSat, 60)}%,65%,${ta})`)
                    eg.addColorStop(0.5, `hsla(${(fh + 20) % 360},${Math.max(liveSat, 40)}%,45%,${ta * 0.4})`)
                    eg.addColorStop(1, `hsla(${fh},${Math.max(liveSat, 30)}%,30%,0)`)
                    ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(t.x, t.y, ts * 3, 0, Math.PI * 2); ctx.fill()
                    if (p > 0.6 && Math.random() < 0.3) {
                        ctx.beginPath(); ctx.arc(t.x + rand(-8, 8), t.y + rand(-8, 8), rand(0.3, 1), 0, Math.PI * 2)
                        ctx.fillStyle = `hsla(${(fh + 30) % 360},90%,75%,${ta * 0.8})`; ctx.fill()
                    }
                }
                const hg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5)
                hg.addColorStop(0, `hsla(0,0%,100%,${this.alpha})`); hg.addColorStop(0.15, `hsla(${fh},80%,80%,${this.alpha * 0.9})`)
                hg.addColorStop(0.4, `hsla(${fh},${Math.max(liveSat, 50)}%,55%,${this.alpha * 0.4})`); hg.addColorStop(1, `hsla(${fh},${Math.max(liveSat, 30)}%,30%,0)`)
                ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2); ctx.fill()
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2); ctx.fillStyle = `hsla(0,0%,100%,${this.alpha})`; ctx.fill()
            }
            isDead() { return this.alpha <= 0 || this.x < -300 || this.x > W + 300 || this.y < -300 || this.y > H + 300 }
        }

        // ═══ COMETS ═══
        class Comet {
            constructor() {
                const side = randInt(0, 3)
                if (side === 0) { this.x = rand(0, W); this.y = -30 }
                else if (side === 1) { this.x = W + 30; this.y = rand(0, H * 0.5) }
                else if (side === 2) { this.x = rand(0, W); this.y = H + 30 }
                else { this.x = -30; this.y = rand(0, H * 0.5) }
                const tx = this.x < W / 2 ? rand(W * 0.6, W * 1.2) : rand(-W * 0.2, W * 0.4)
                this.angle = Math.atan2(rand(H * 0.3, H * 0.9) - this.y, tx - this.x)
                this.speed = rand(2.5, 4.5); this.vx = Math.cos(this.angle) * this.speed; this.vy = Math.sin(this.angle) * this.speed
                this.curve = rand(-0.002, 0.002); this.size = rand(3, 5); this.alpha = 1; this.decay = rand(0.003, 0.006)
                this.trail = []; this.trailMax = 70; this.hueShift = rand(-30, 30)
            }
            update() {
                this.trail.push({ x: this.x, y: this.y, alpha: this.alpha }); if (this.trail.length > this.trailMax) this.trail.shift()
                this.angle += this.curve; this.vx = Math.cos(this.angle) * this.speed; this.vy = Math.sin(this.angle) * this.speed
                this.x += this.vx; this.y += this.vy; this.alpha -= this.decay
            }
            draw() {
                if (this.alpha <= 0) return
                const ch = ((liveHue + 180 + this.hueShift) % 360 + 360) % 360
                if (this.trail.length >= 2) {
                    for (let i = 1; i < this.trail.length; i++) {
                        const prev = this.trail[i - 1], curr = this.trail[i], p = i / this.trail.length
                        ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(curr.x, curr.y)
                        ctx.strokeStyle = `hsla(${ch},${Math.max(liveSat, 40)}%,75%,${p * curr.alpha * 0.25})`
                        ctx.lineWidth = (1 - p) * this.size * 2.5 + 0.5; ctx.lineCap = 'round'; ctx.stroke()
                    }
                    for (let i = 0; i < this.trail.length; i += 3) {
                        const t = this.trail[i], p = i / this.trail.length, ga = p * t.alpha * 0.08, gr = (1 - p) * this.size * 5
                        const tg = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, gr)
                        tg.addColorStop(0, `hsla(${ch},${Math.max(liveSat, 50)}%,70%,${ga})`); tg.addColorStop(1, `hsla(${ch},${Math.max(liveSat, 30)}%,50%,0)`)
                        ctx.fillStyle = tg; ctx.beginPath(); ctx.arc(t.x, t.y, gr, 0, Math.PI * 2); ctx.fill()
                    }
                }
                const hg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6)
                hg.addColorStop(0, `hsla(0,0%,100%,${this.alpha})`); hg.addColorStop(0.12, `hsla(${ch},70%,85%,${this.alpha * 0.9})`)
                hg.addColorStop(0.35, `hsla(${ch},${Math.max(liveSat, 50)}%,60%,${this.alpha * 0.35})`); hg.addColorStop(1, `hsla(${ch},30%,40%,0)`)
                ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2); ctx.fill()
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2); ctx.fillStyle = `hsla(0,0%,100%,${this.alpha})`; ctx.fill()
            }
            isDead() { return this.alpha <= 0 || this.x < -400 || this.x > W + 400 || this.y < -400 || this.y > H + 400 }
        }

        // ═══ SPATIAL GRID ═══
        function buildGrid(particles) {
            grid = {}
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i], key = Math.floor(p.x / CONNECT_DIST) + ',' + Math.floor(p.y / CONNECT_DIST)
                if (!grid[key]) grid[key] = []; grid[key].push(i)
            }
        }
        function drawLines(particles) {
            const checked = new Set();
            let hasLines = false;
            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i], gx = Math.floor(p.x / CONNECT_DIST), gy = Math.floor(p.y / CONNECT_DIST)
                for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
                    const cell = grid[(gx + dx) + ',' + (gy + dy)]
                    if (!cell) continue
                    for (const j of cell) {
                        if (j <= i) continue; const pk = i + '-' + j; if (checked.has(pk)) continue; checked.add(pk)
                        const q = particles[j], ddx = p.x - q.x, ddy = p.y - q.y, dist = Math.sqrt(ddx * ddx + ddy * ddy)
                        if (dist < CONNECT_DIST) {
                            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                            hasLines = true;
                        }
                    }
                }
            }
            if (hasLines) {
                ctx.strokeStyle = primaryColor(0.08);
                ctx.lineWidth = 0.4;
                ctx.stroke();
            }
        }

        // ═══ INIT ═══
        function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
        resize()

        function initParticles() {
            dustParticles = []; orbParticles = []; nebulaParticles = []; shootingStars = []; meteors = []; comets = []
            const scale = Math.min(1, (W * H) / (1920 * 1080))
            for (let i = 0; i < Math.max(60, Math.floor(DUST_COUNT * scale)); i++) dustParticles.push(new Dust())
            for (let i = 0; i < Math.max(6, Math.floor(ORB_COUNT * scale)); i++) orbParticles.push(new Orb())
            for (let i = 0; i < Math.max(2, Math.floor(NEBULA_COUNT * scale)); i++) nebulaParticles.push(new Nebula())
            canvas.classList.add('particles-active')
        }
        initParticles()

        // ═══ ANIMATE ═══
        function animate(time) {
            ctx.clearRect(0, 0, W, H)
            updateColors(time)

            for (const n of nebulaParticles) { n.update(time); n.draw() }
            for (const d of dustParticles) { d.update(time); d.draw() }
            buildGrid(dustParticles); drawLines(dustParticles)
            for (const o of orbParticles) { o.update(time); o.draw() }

            if (time - lastMeteor > METEOR_INTERVAL) { meteors.push(new Meteor()); lastMeteor = time }
            for (let i = meteors.length - 1; i >= 0; i--) { meteors[i].update(time); meteors[i].draw(); if (meteors[i].isDead()) meteors.splice(i, 1) }

            if (time - lastComet > COMET_INTERVAL) { comets.push(new Comet()); lastComet = time }
            for (let i = comets.length - 1; i >= 0; i--) { comets[i].update(); comets[i].draw(); if (comets[i].isDead()) comets.splice(i, 1) }

            if (time - lastShoot > SHOOT_INTERVAL) { shootingStars.push(new ShootingStar()); lastShoot = time }
            for (let i = shootingStars.length - 1; i >= 0; i--) { shootingStars[i].update(); shootingStars[i].draw(); if (shootingStars[i].isDead()) shootingStars.splice(i, 1) }

            animRef.current = requestAnimationFrame(animate)
        }
        animRef.current = requestAnimationFrame(animate)

        const handleResize = () => { resize(); initParticles() }
        const handleMouse = e => { mouseX = e.clientX; mouseY = e.clientY }
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouse)

        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouse)
        }
    }, [overrideColor])

    return <canvas ref={canvasRef} id="particle-canvas" className="particle-canvas" />
}
