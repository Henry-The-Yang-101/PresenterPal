import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebSocket } from 'react-native-reanimated';

const App = () => {
  const doubleTapRef = useRef(null);
  const [tapCount, setTapCount] = useState(0);

  const socket = new WebSocket('ws://10.32.101.255:3000');

  useEffect(() => {
    let timer;
    if (tapCount === 1) {
      timer = setTimeout(() => {
        setTapCount(0);
      }, 400);
    } else if (tapCount === 2) {
      timer = setTimeout(() => {
        console.log('Double Tap Detected!');
        socket.send(JSON.stringify({ action: 'nextSlide' }));
        setTapCount(0);
      }, 300);
    } else if (tapCount === 3) {
      console.log('Triple Tap Detected!');
      socket.send(JSON.stringify({ action: 'prevSlide' }));
      
      setTapCount(0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [tapCount]);

  const handleSingleTap = () => {
    // Increment tapCount on each single tap
    setTapCount((prevTapCount) => prevTapCount + 1);
  };

  const handleDoubleTap = () => {
    // Increment tapCount on each double tap
    setTapCount((prevTapCount) => prevTapCount + 1);
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleSingleTap} onDoubleTap={handleDoubleTap}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey' }}>
        <Text>yes</Text>
      </View>
    </TouchableOpacity>
  );
};

export default App;