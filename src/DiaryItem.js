import React, {useContext, useEffect, useRef, useState} from "react";
import {DiaryDispatchContext} from "./App";

const DiaryItem = ({  //onEdit, onRemove : 재생성될 수 밖에 없는 녀석,, 최적화 필요!
    //함수

    //데이터 (content 를 제외한 나머지는 변화할 수 없는 데이터)
  author, // author '문자열'을 props 로 받아옴
  content,// content '문자열'을 props 로 받아옴,
  created_date,// created_date '숫자'를 props 로 받아옴
  emotion, id// id '숫자'를 props 로 받아옴
}) => {

  const {onEdit, onRemove} = useContext(DiaryDispatchContext); //useContext 를 사용하여 Context 에서 데이터를 가져옵니다

  const [isEdit, setIsEdit] = useState(false); //수정중인지 아닌지 상태
  const toggleIsEdit = () => setIsEdit(!isEdit); //위의 isEdit 참/거짓 값을 바꿈

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까`)) {
      onRemove(id);
    }
  }
  const handleQuitEdit = () =>{
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () =>{

    if (localContent.length < 5){
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){
      onEdit(id,localContent);
      toggleIsEdit(); // 수정 폼 닫기
    }
  }


  return (<div className="DiaryItem">
        <div className="info">
      <span>
        작성자 : {author} | 감정 점수: {emotion}
      </span>
          <br/>

          <span className="date">
        {new Date(created_date).toLocaleString()}
      </span>

        </div>

        <div className="content">
          {isEdit ? <><textarea
              ref={localContentInput}
              value={localContent}
              onChange={(event) => setLocalContent((event.target.value))}
          />
          </> : <>
            {content}
          </>}
        </div>

        {isEdit ? (
            <>
              <button onClick={handleQuitEdit}>수정 취소</button>
              <button onClick={handleEdit}>수정 완료</button>
            </>
        ) : (
            <>
              <button onClick={handleRemove}>삭제하기</button>
              <button onClick={toggleIsEdit}>수정하기</button>
            </>
        )}
      </div>
  );
};

export default React.memo(DiaryItem);
