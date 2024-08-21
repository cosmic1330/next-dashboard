'use client';

import { useState } from 'react';

export default function Page() {
  const [text, setText] = useState('loading');
  const run = async () => {
    const data = await fetch(
      'http://localhost:3000/api/taiwan-stock/v2/eps/1220',
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <main>
      <button onClick={run}>Run</button>
      <p>{text}</p>
    </main>
  );
}
