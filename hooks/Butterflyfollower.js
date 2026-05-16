'use client'

import { useEffect, useRef } from 'react'

/**
 * ButterflyFollower
 * - Custom cursor kupu-kupu dengan partikel emas
 * - Broadcast posisi kupu-kupu via window.dispatchEvent('butterfly:move')
 *   agar komponen lain bisa bereaksi (misal: efek emas pada nama)
 */
export default function ButterflyFollower() {
  const containerRef = useRef(null)
  const rafRef       = useRef(null)
  const stateRef     = useRef({
    bx: -999, by: -999,
    vx: 0,    vy: 0,
    mx: -9999, my: -9999,
    heading: 0,
    flapT: 0,
    lastSpawn: 0,
    lastSpawnIdle: 0,
    prevNow: 0,
    W: 0, H: 0,
    opacity: 0,
    targetOpacity: 0,
    lastBroadcast: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const container = containerRef.current
    if (!container) return

    const pC = container.querySelector('#bf-particle')
    const bC = container.querySelector('#bf-butterfly')
    const pX = pC.getContext('2d')
    const bX = bC.getContext('2d')

    const SCALE = 0.38

    const POOL_SIZE = 200
    const COLORS = [
      'rgba(255,200,40,',
      'rgba(255,175,0,',
      'rgba(255,220,80,',
      'rgba(240,160,20,',
      'rgba(255,235,120,',
    ]
    const pool = Array.from({ length: POOL_SIZE }, () => ({
      active: false, x: 0, y: 0, vx: 0, vy: 0,
      life: 0, decay: 0, r: 0, ci: 0, tw: 0,
    }))

    function getParticle() {
      for (let i = 0; i < POOL_SIZE; i++) if (!pool[i].active) return pool[i]
      return null
    }

    function spawnParticle(bx, by, speed) {
      const p = getParticle(); if (!p) return
      const a = Math.random() * Math.PI * 2
      const s = 0.2 + Math.random() * Math.max(speed, 0.4)
      p.active = true
      p.x = bx + (Math.random() - 0.5) * 10
      p.y = by + (Math.random() - 0.5) * 10
      p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s
      p.life = 1
      p.decay = 0.020 + Math.random() * 0.028
      p.r = 0.5 + Math.random() * 1.2
      p.ci = Math.floor(Math.random() * COLORS.length)
      p.tw = Math.random() * Math.PI * 2
    }

    const lerp = (a, b, t) => a + (b - a) * t
    function angleLerp(a, b, t) {
      let d = b - a
      while (d >  Math.PI) d -= Math.PI * 2
      while (d < -Math.PI) d += Math.PI * 2
      return a + d * t
    }

    function drawWingPath(ctx) {
      ctx.beginPath()
      ctx.moveTo(0, -2)
      ctx.bezierCurveTo(18, -55, 75, -70, 90, -40)
      ctx.bezierCurveTo(105, -15, 85, 20, 55, 30)
      ctx.bezierCurveTo(35, 38, 18, 52, 10, 65)
      ctx.bezierCurveTo(5, 75, -2, 70, -1, 55)
      ctx.bezierCurveTo(-3, 38, -5, 10, 0, -2)
      ctx.closePath()
    }

    function drawButterfly(ctx, spread, bob) {
      ctx.save()
      ctx.translate(0, bob)

      function drawOneSide(side) {
        ctx.save()
        ctx.scale(side * spread, 1)
        drawWingPath(ctx)
        const wg = ctx.createLinearGradient(5, 0, 90, 0)
        wg.addColorStop(0,    '#cbbde8')
        wg.addColorStop(0.35, '#9080c8')
        wg.addColorStop(0.65, '#6254a0')
        wg.addColorStop(1,    '#3e3272')
        ctx.fillStyle = wg; ctx.fill()
        ctx.strokeStyle = 'rgba(100,80,180,0.3)'; ctx.lineWidth = 1.5; ctx.stroke()

        ctx.save(); drawWingPath(ctx); ctx.clip()

        const pg1 = ctx.createLinearGradient(55, -30, 75, 10)
        pg1.addColorStop(0, 'rgba(255,180,40,0.55)'); pg1.addColorStop(1, 'rgba(255,120,0,0.0)')
        ctx.fillStyle = pg1; ctx.beginPath(); ctx.ellipse(68, -28, 20, 18, Math.PI*0.15, 0, Math.PI*2); ctx.fill()

        const pg2 = ctx.createLinearGradient(25, 55, 15, 75)
        pg2.addColorStop(0, 'rgba(255,160,20,0.5)'); pg2.addColorStop(1, 'rgba(255,100,0,0.0)')
        ctx.fillStyle = pg2; ctx.beginPath(); ctx.ellipse(20, 65, 14, 12, -Math.PI*0.1, 0, Math.PI*2); ctx.fill()

        ctx.strokeStyle = 'rgba(220,205,255,0.13)'; ctx.lineWidth = 1.0
        ;[[0,-2,30,-35],[0,-2,55,-15],[0,-2,45,25],[0,-2,18,55]].forEach(([x1,y1,x2,y2]) => {
          ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
        })

        ctx.beginPath(); ctx.arc(50,-18,8,0,Math.PI*2); ctx.fillStyle='rgba(200,160,0,0.65)'; ctx.fill()
        ctx.beginPath(); ctx.arc(50,-18,5,0,Math.PI*2); ctx.fillStyle='rgba(10,5,30,0.85)';   ctx.fill()
        ctx.beginPath(); ctx.arc(48,-20,1.5,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fill()

        ctx.restore(); ctx.restore()
      }

      drawOneSide(1); drawOneSide(-1)

      for (let i = 0; i < 6; i++) {
        ctx.beginPath(); ctx.ellipse(0, i*6-10, 5-i*0.5, 3.2, 0, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${30+i*3},${20+i*2},${60-i*3},0.9)`; ctx.fill()
      }
      ctx.beginPath(); ctx.ellipse(0,-14,6,5,0,0,Math.PI*2); ctx.fillStyle='rgba(40,25,80,0.92)'; ctx.fill()
      ctx.beginPath(); ctx.arc(0,-20,4.5,0,Math.PI*2); ctx.fillStyle='rgba(35,20,70,0.95)'; ctx.fill()
      ;[[-3,-20],[3,-20]].forEach(([ex,ey]) => {
        ctx.beginPath(); ctx.arc(ex,ey,2,0,Math.PI*2); ctx.fillStyle='rgba(200,160,0,0.9)'; ctx.fill()
        ctx.beginPath(); ctx.arc(ex,ey,1,0,Math.PI*2); ctx.fillStyle='rgba(10,5,30,0.9)';   ctx.fill()
      })
      ctx.strokeStyle='rgba(180,140,255,0.6)'; ctx.lineWidth=1.0
      ;[[-1,-24],[1,-24]].forEach(([sx,sy],i) => {
        const ex=i===0?-18:18, ey=-52
        ctx.beginPath(); ctx.moveTo(sx,sy); ctx.quadraticCurveTo(sx+(i===0?-10:10),sy-16,ex,ey); ctx.stroke()
        ctx.beginPath(); ctx.arc(ex,ey,2.5,0,Math.PI*2); ctx.fillStyle='rgba(220,170,0,0.9)'; ctx.fill()
      })
      ctx.restore()
    }

    function resize() {
      const W = window.innerWidth, H = window.innerHeight
      stateRef.current.W = W; stateRef.current.H = H
      ;[pC, bC].forEach(c => { c.width = W; c.height = H })
    }

    function isLoadingActive() { return !!document.querySelector('.kl-loading') }

    function frame(now) {
      rafRef.current = requestAnimationFrame(frame)
      const s = stateRef.current
      const { W, H } = s
      if (s.bx === -999) { s.bx = W/2; s.by = H/2 }

      s.targetOpacity = isLoadingActive() ? 0 : 1
      s.opacity = lerp(s.opacity, s.targetOpacity, 0.07)
      const visible = s.opacity > 0.01

      const cx = s.mx > -999 ? s.mx : W/2
      const cy = s.my > -999 ? s.my : H/2
      const dx = cx - s.bx, dy = cy - s.by
      const dist = Math.sqrt(dx*dx + dy*dy)

      s.flapT += 0.07 + Math.min(dist/200, 0.14)
      s.vx = lerp(s.vx, dx*0.07, 0.16)
      s.vy = lerp(s.vy, dy*0.07, 0.16)
      s.bx += s.vx; s.by += s.vy

      if (dist > 1) s.heading = angleLerp(s.heading, Math.atan2(dy,dx)+Math.PI/2, 0.1)

      const spread       = 0.14 + Math.abs(Math.sin(s.flapT)) * 0.86
      const bob          = Math.sin(s.flapT*2) * 2.5
      const speed        = Math.sqrt(s.vx*s.vx + s.vy*s.vy)
      const isMoving     = speed > 0.5
      const isDownstroke = Math.abs(Math.sin(s.flapT)) > 0.72

      // ── Broadcast posisi ke komponen lain (throttle 30ms) ──
      if (visible && now - s.lastBroadcast > 30) {
        window.dispatchEvent(new CustomEvent('butterfly:move', {
          detail: { x: s.bx, y: s.by, opacity: s.opacity }
        }))
        s.lastBroadcast = now
      }

      // ── Partikel ───────────────────────────────────────────
      pX.clearRect(0, 0, W, H)
      if (visible) {
        if      (isMoving && isDownstroke && now-s.lastSpawn>18)    { const n=3+Math.floor(Math.random()*2); for(let i=0;i<n;i++) spawnParticle(s.bx,s.by,speed*0.3); s.lastSpawn=now }
        else if (isMoving && now-s.lastSpawn>40)                    { const n=1+Math.floor(Math.random()*2); for(let i=0;i<n;i++) spawnParticle(s.bx,s.by,speed*0.18); s.lastSpawn=now }
        else if (!isMoving && now-s.lastSpawnIdle>150)              { spawnParticle(s.bx,s.by,0.3); s.lastSpawnIdle=now }
      }

      pX.globalAlpha = s.opacity
      for (let i = 0; i < POOL_SIZE; i++) {
        const p = pool[i]; if (!p.active) continue
        p.vy+=0.025; p.vx*=0.97; p.x+=p.vx; p.y+=p.vy; p.life-=p.decay; p.tw+=0.14
        if (p.life<=0) { p.active=false; continue }
        if (!visible) continue
        const alpha = p.life*(0.7+0.3*Math.sin(p.tw))
        const col   = COLORS[p.ci]
        const grd   = pX.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3.5)
        grd.addColorStop(0, col+(alpha*0.7).toFixed(3)+')'); grd.addColorStop(1, col+'0)')
        pX.fillStyle=grd; pX.beginPath(); pX.arc(p.x,p.y,p.r*3.5,0,Math.PI*2); pX.fill()
        pX.fillStyle=col+alpha.toFixed(3)+')'; pX.beginPath(); pX.arc(p.x,p.y,p.r,0,Math.PI*2); pX.fill()
        if (p.r>1.0&&p.life>0.4) {
          const cs=p.r*2.0; pX.strokeStyle=col+(alpha*0.8).toFixed(3)+')'; pX.lineWidth=0.5
          pX.beginPath(); pX.moveTo(p.x,p.y-cs); pX.lineTo(p.x,p.y+cs); pX.moveTo(p.x-cs,p.y); pX.lineTo(p.x+cs,p.y); pX.stroke()
        }
      }
      pX.globalAlpha = 1

      // ── Kupu-kupu ──────────────────────────────────────────
      bX.clearRect(0, 0, W, H)
      if (visible) {
        bX.save(); bX.globalAlpha=s.opacity
        bX.translate(s.bx,s.by); bX.rotate(s.heading); bX.scale(SCALE,SCALE)
        drawButterfly(bX, spread, bob)
        bX.restore()
      }
    }

    const onMouseMove  = e => { stateRef.current.mx=e.clientX; stateRef.current.my=e.clientY }
    const onMouseLeave = () => { stateRef.current.mx=-9999; stateRef.current.my=-9999 }

    window.addEventListener('mousemove', onMouseMove, { passive:true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    resize()
    stateRef.current.prevNow = performance.now()
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
      <div ref={containerRef} aria-hidden="true"
        style={{ position:'fixed', inset:0, zIndex:99999, pointerEvents:'none' }}>
        <canvas id="bf-particle"  style={{ position:'absolute', top:0, left:0 }} />
        <canvas id="bf-butterfly" style={{ position:'absolute', top:0, left:0 }} />
      </div>
    </>
  )
}
