import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React,{useCallback, useEffect, useMemo, useReducer, useRef} from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case 'init': {
      return action.data; //action.data 를 state 에 넣어줍니다
    }
    case 'create': {
      const created_date = new Date().getTime();
      const newItem = [
        action.data, created_date];
      return [newItem, ...state];
    }
    case 'remove': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'edit': {
      return state.map(
          (it) => it.id === action.targetId ? {...it, content: action.newContent}
              : it)}
    default:
      return state;
    }
  }
  export const DiaryStateContext = React.createContext();
  export const DiaryDispatchContext = React.createContext();
  function App() {
    // const [data, setData] = useState([]);
    const [data, dispatch] = useReducer(reducer, []); //useReducer 를 활용하여 데이터를 관리합니다

    const dataId = useRef(0);
    const getData = async () => {
      const res = await fetch(
          'https://jsonplaceholder.typicode.com/comments').then(
          (res) => res.json());

      const initData = res.slice(0, 20).map((it) => {
        return {
          author: it.email,
          content: it.body,
          emotion: Math.floor(Math.random() * 5) + 1,
          created_date: new Date().getTime(),
          id: dataId.current++
        }
      })
      dispatch({type: 'init', data: initData}); //reducer 에게 데이터를 넘겨줍니다, action 의 type 은 init 으로 합니다
    };

    useEffect(() => {
      getData();
    }, []) //컴포넌트 mount 시 (로드시) 1회만 실행가능합니다.

    const onCreate = useCallback(
        (author, content, emotion) => {
          dispatch({
            type: 'create',
            data: {author, content, emotion, id: dataId.current}
          }); //reducer 에게 데이터를 넘겨줍니다, action 의 type 은 create 으로 합니다
          dataId.current += 1;
        }, []); //빈 배열을 넣어주면 컴포넌트가 처음 렌더링 될 때만 함수 생성

    const onRemove = useCallback((targetId) => {

      dispatch({type: 'remove', data: targetId}); //reducer 에게 데이터를 넘겨줍니다, action 의 type 은 remove 으로 합니다
    }, []);

    const onEdit = useCallback((targetId, newContent) => {
      dispatch({type: 'edit', targetId, newContent}); //reducer 에게 데이터를 넘겨줍니다, action 의 type 은 edit 으로 합니다
    }, []);

    const memoizedDispatches = useMemo(() => { //useMemo 를 활용하여 함수를 재생성하지 않습니다
      return {onCreate, onRemove, onEdit};
    },[]);

    const getDiaryAnalysis = useMemo(
        () => {
          const goodCount = data.filter((it) => it.emotion >= 3).length;
          const badCount = data.length - goodCount;
          const goodRatio = (goodCount / data.length) * 100;
          return {goodCount, badCount, goodRatio};
        }, [data.length]
    );

    const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

    return (
        <DiaryStateContext.Provider value={data}>
          <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor/>
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList/>
        </div>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
  }

  export default App;






















