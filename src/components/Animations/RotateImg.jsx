import React, { useState } from 'react'
import './animations.scss'
import { useSpring, useTransition, animated, config } from 'react-spring';

export default function RotateImg() {
  const [flipped, set] = useState(false)

  const { opacity, transform } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(900px) rotateX(${flipped ? 180 : 0}deg)`,
    config: config.gentle
  });

  return (
    <div className='rotateImg'>
      <div onClick={() => set(!flipped)} className='rotateImg__container'>
        <animated.div
          className="rotateImg__c rotateImg__back"
          style={{
            opacity: opacity.to(o => 1 - o),
            transform
          }}
        />
        <animated.div
          className="rotateImg__c rotateImg__front"
          style={{
            opacity,
            transform: transform.to(t => `${t} rotateX(180deg)`)
          }}
        />
      </div>
    </div>
  )
}
