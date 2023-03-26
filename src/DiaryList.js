import DiaryItem from "./DiaryItem";
import {useContext} from "react";
import {DiaryStateContext} from "./App";

const DiaryList = () => {

  const diaryList = useContext(DiaryStateContext); //useContext 를 사용하여 Context 에서 데이터를 가져옵니다
  return (
      <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
          {diaryList.map((it) => (
              <DiaryItem key={it.id} {...it}/>
          ))}
        </div>
      </div>
  );
};

DiaryList.defaultProps ={
  diaryList:[],
};

export default DiaryList;
