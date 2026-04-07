// src/components/ToggleButton.jsx
import { useState } from 'react';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn((prev) => !prev)}>
      {isOn ? 'Turn Off' : 'Turn On'}
    </button>
  );
};

export default ToggleButton;