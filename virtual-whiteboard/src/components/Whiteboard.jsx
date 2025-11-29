import React, { useRef, useEffect } from 'react'

function Whiteboard() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    const initCanvas = () => {
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    resizeCanvas()
    initCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="whiteboard">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Whiteboard
