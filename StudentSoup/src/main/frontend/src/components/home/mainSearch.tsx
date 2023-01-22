import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import cn from 'clsx';
import { ReactComponent as Search } from '../../img/search_icon.svg';
import { useHistory } from 'react-router-dom';

const MainSearch = () => {
  const history = useHistory();

  const [searchSchool, setSearchSchool] = useState<any[]>();
  const [posts, setPosts] = useState<any[]>();

  const [inputSchool, setInputSchool] = useState<string>();
  const [listSchool, setListSchool] = useState<string>('');

  const getSchool = () => {
    axios
      .get('/home')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getSchool();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSchool(value);
    if (value.length === 0 || value === '' || value === null || value === undefined) {
      setSearchSchool(undefined);
      return;
    }
    const resultArray = posts?.filter(post => post.schoolName.includes(e.target.value));
    const compareResult = posts?.filter(post => post.schoolName.includes(e.target.value));
    setSearchSchool(resultArray);
    setListSchool(compareResult?.shift().schoolName);
  };

  const handleClick = (e: any) => {
    setInputSchool(e.target.innerText);
    const resultArray = posts?.filter(post => post.schoolName.includes(e.target.innerText));
    const compareResult = posts?.filter(post => post.schoolName.includes(e.target.value));
    setSearchSchool(resultArray);
    setListSchool(compareResult?.shift().schoolName);
  };

  const handlePushRestaurant = () => {
    if (
      inputSchool === '' ||
      inputSchool === undefined
    ) {
      alert('학교 정보가 올바르지 않습니다.');
    } else if (inputSchool === listSchool) {
      history.push('/restaurant', inputSchool);
    }
  };

  return (
    <div className="w-full flex flex-col mt-[290px] items-center">
      <div
        className={cn(
          'flex flex-col text-center relative bottom-[88px]',
          'after:flex after:flex-col after:text-center after:relative after:bottom-[88px]',
        )}
      >
        <span className="text-[45px] fw-400 leading-[59px] text-white">대학생을 위한</span>
        <span className="text-[65px] fw-400 leading-[93px] text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.25)]">
          대학 주변 맛집 추천
        </span>
        <div className="mt-[28px] w-full h-[60px] rounded-[5px] bg-white flex flex-row">
          <Search className="mx-[16px] my-[15px]" />
          <input
            onChange={handleChange}
            name="text"
            value={inputSchool}
            placeholder="지역 학교 명을 입력하세요."
            className="w-[500px] h-[58px] text-[25px] fw-400 leading-[33px] text-[#A0A0A0] border-none"
          ></input>
          <button
            onClick={handlePushRestaurant}
            className="w-[94px] h-[60px] text-[25px] fw-400 leading-[33px] text-white bg-[#FF611D] border-none rounded-[5px]"
          >
            검색
          </button>
        </div>
        {searchSchool?.map(school => (
          <div key={school.schoolId} className="w-[654px] h-[58px] rounded-[5px] bg-white">
            <span
              onClick={handleClick}
              id={school.schoolId}
              className="flex text-[16px] mt-[15px] ml-[20px] items-center font-medium"
            >
              {school.schoolName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSearch;
