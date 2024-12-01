"use client"

import { TypeAnimation } from 'react-type-animation';

export default function TypeWriter(){
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chinesiologo ',
        1500, // wait 1s before replacing "Mice" with "Hamsters"
        'Massaggiatore ',
        1500,
        'Personal Trainer',
        1500
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};