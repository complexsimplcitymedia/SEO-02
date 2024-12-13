import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function ConfiguratorViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !iframeRef.current) return;
    
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    iframeRef.current.contentWindow?.postMessage({
      type: 'mouseEvent',
      eventType: 'mousedown',
      x,
      y,
      button: e.button
    }, '*');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !iframeRef.current) return;
    
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    iframeRef.current.contentWindow?.postMessage({
      type: 'mouseEvent',
      eventType: 'mousemove',
      x,
      y,
      button: e.button
    }, '*');
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!containerRef.current || !iframeRef.current) return;
    
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    iframeRef.current.contentWindow?.postMessage({
      type: 'mouseEvent',
      eventType: 'mouseup',
      x,
      y,
      button: e.button
    }, '*');
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!iframeRef.current) return;
    
    e.preventDefault();
    iframeRef.current.contentWindow?.postMessage({
      type: 'wheelEvent',
      deltaY: e.deltaY,
      deltaX: e.deltaX
    }, '*');
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative aspect-video w-full bg-black rounded-xl overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <iframe
        ref={iframeRef}
        src="http://103.91.247.12:8181/webclient/?appliId=1313152583791017984"
        className="w-full h-full border-0"
        style={{
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      />
    </motion.div>
  );
}