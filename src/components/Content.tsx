'use client';

import React from 'react';
import BlurText from './BlurText';

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

const Content = () => {
  return (
    <div className="w-full px-4 py-20 max-w-3xl mx-auto text-center">
      <BlurText
        text="Tired of long, clunky URLs cluttering your posts and messages? ShrinkerKit transforms them into short, clean, and memorable links. Built on a robust Java backend and a lightning-fast Next.js frontend, our service is engineered for speed and reliability. Whether you're a marketer, developer, or just sharing a link with a friend, ShrinkerKit makes it simple."
        delay={100}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-2xl text-slate-300 leading-relaxed"
      />
    </div>
  );
};

export default Content;
