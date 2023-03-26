import React, {useEffect, useState} from "react";

const CountA = React.memo(({count})=>{
  useEffect(() => {
    console.log(`CountA Update - count: ${count}`);
  });
  return <div>{count}</div>;
});

const CountB = ({obj})=>{
  useEffect(() => {
    console.log(`CountB Update - count: ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
  // return true // 이전 프롭스 값과 다음 프롭스 값이 같다면 리렌더링을 하지 않음
  // return false  // 이전 프롭스 값과 다음 프롭스 값이 다르다면 리렌더링을 함
}

const MemorizedCountB = React.memo(CountB, areEqual); // areEqual 함수를 통해 리렌더링 여부를 결정
const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
      <div style={{padding: 50}}>

        <div>
          <h2>Count A</h2>
          <CountA count={count}/>
          <button onClick={() => setCount(count)}>A button</button>
        </div>

        <div>
          <h2>Count B</h2>
          <MemorizedCountB  obj={obj}/>
          <button onClick={() => setObj({count: obj.count,})}>B button</button>
        </div>

      </div>
  );
};

export default OptimizeTest;
