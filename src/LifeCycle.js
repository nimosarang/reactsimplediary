import React, {useEffect, useState} from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      // Unmount 시점에 실행되게 됨
      console.log("Unmount")
    }
  }, []);
  return <div>Unmount Testing Component</div>
}

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
      <div style={{padding: 20}}>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest/>} {/*  단락평가로 뒤에 있는 컴포넌트를 렌더할지말지 결정 가능 */}
      </div>
  );
}

export default LifeCycle;


