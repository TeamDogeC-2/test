/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { ReactComponent as MoreInfo } from '../../img/moreicon.svg';
import { ReactComponent as ReviewSmallHeart } from '../../img/ReviewSmallHeart.svg';
import { ReactComponent as ReviewSmallHeartActive } from '../../img/ReviewSmallHeartActive.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReviewStarView from './reviewStarView';
import ReviewMoreStarView from './reviewMoreStarView';
import ReviewMoreHeartInfo from './reviewMoreHeartInfo';
import { ReactComponent as RightIcon } from '../../img/icon_right.svg';
import { ReactComponent as LeftIcon } from '../../img/icon_left.svg';
import cn from 'clsx';

const reviewWrite = () => {
  const [reviewList, setReviewList] = useState<any>([]);
  const [clickMoreButton, isClickMoreButton] = useState<boolean>(false);
  const state = useLocation<any>();
  const [page, setPage] = useState<any>(0);
  const [clickPage, setClickPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [sort, setSort] = useState<string>('liked');
  const restaurantNumber = state.state[0];
  const saveMemberId = sessionStorage.getItem('memberId');
  const url = `/restaurant/${restaurantNumber}/reviews`;
  useEffect(() => {
    axios
      .post(
        url,
        {
          restaurantId: restaurantNumber,
          memberId: saveMemberId,
        },
        {
          params: {
            page,
            sorted: sort,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        setReviewList(res.data.content);
        setTotalPage(res.data.totalPages);
      })
      .catch(err => {
        console.error(err);
      });
  }, [clickPage, sort]);

  const handleClickPage = (e: any) => {
    setClickPage(e);
  };

  const handleMoreButton = () => {
    isClickMoreButton(!clickMoreButton);
  };

  return (
    <>
      <div className="flex flex-row">
        <div
          onClick={() => {
            setSort('newest');
          }}
          className={cn('ml-[21px] mt-[13px] w-[70px] h-[29px] border-[1px] rounded-[10px]', {
            'border-[#FF611D] text-[#FF611D]': sort === 'newest',
            'border-[#9C9C9C] text-[#9C9C9C]': sort !== 'newest',
          })}
        >
          <div className="ml-[11.5px] mt-[2px] font-[400] text-[16px] leading-[21px] flex items-center">
            최신순
          </div>
        </div>
        <div
          onClick={() => {
            setSort('liked');
          }}
          className={cn('ml-[7px] mt-[13px] w-[70px] h-[29px] border-[1px]  rounded-[10px]', {
            'border-[#FF611D] text-[#FF611D]': sort === 'liked',
            'border-[#9C9C9C] text-[#9C9C9C]': sort !== 'liked',
          })}
        >
          <div className="ml-[11.5px] mt-[2px] font-[400] text-[16px] leading-[21px] flex items-center">
            추천순
          </div>
        </div>
        <div className="mt-[20px] ml-[195px] mr-[26px] w-[351px] h-[16px] fw-400 text-[13px] leading-[17px] flex items-center text-[#9F9F9F]">
          ※홍보 및 비방 등 부적절한 평가는 평점 산정에서 제외될수있습니다.
        </div>
      </div>
      {clickMoreButton ? (
        <>
          <div className="ml-[25px] mt-[20px] w-[687px] h-[1px] border border-[#D5D5D5] bg-[#D5D5D5] "></div>
          <div className="w-[743px] h-[1100px]">
            <div className="flex flex-col">
              {reviewList.map((school: any) => (
                <>
                  <div className="w-[743px] h-[320px] border-1">
                    <div className="flex flex-row">
                      <div className="flex flex-row" key={school.restaurantReviewId}>
                        {school.memberProfileImageName ? (
                          <img
                            key={school.restaurantReviewId}
                            src={`/image/${school.memberProfileImageName}`}
                            className="ml-[32px] mt-[27px] w-[74px] h-[74px] rounded-full"
                          />
                        ) : (
                          <div className="ml-[32px] mt-[27px] w-[74px] h-[74px] border-[5px] border-[#D9D9D9] bg-[#D9D9D9] rounded-full"></div>
                        )}
                        <div className="flex flex-col">
                          <div className="ml-[12px] mt-[37px] h-[16px] font-normal leading-[28px] text-[20px] flex items-center text-[#515151]">
                            {school.nickName}
                            <ReviewMoreHeartInfo {...school} school={school} />
                          </div>
                          <div className="flex flex-row">
                            <ReviewMoreStarView {...school} school={school} />
                            <div className="ml-[9.4px] mt-[2px] font-normal text-[16px] leading-[21px] flex items-center text-[#A5A5A5]">
                              {school.writeDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-rows">
                      <div className="ml-[118px] w-[146px] h-[135px] border-[1px] border-[#A5A5A5]"></div>
                      <div className="ml-[3px] w-[146px] h-[135px] border-[1px] border-[#A5A5A5]"></div>
                      <div className="ml-[3px] w-[146px] h-[135px] border-[1px] border-[#A5A5A5]"></div>
                      <div className="ml-[3px] w-[146px] h-[135px] border-[1px] border-[#A5A5A5]"></div>
                    </div>
                    <div>
                      <div className="w-[593px] h-[14px] mt-[10px] ml-[118px] text-[16px] font-normal leading-[21px] text-[#6B6B6B]">
                        {school.content}
                      </div>
                    </div>
                  </div>
                  <div className="mt-[35px] ml-[25px] w-[687px] h-[1px] bg-[#BCBCBC]"></div>
                </>
              ))}
              <div className="ml-[20px] flex flex-row mb-[55px]">
                <LeftIcon
                  onClick={() => {
                    setClickPage(clickPage - 1);
                    if (clickPage === 1) {
                      alert('첫번째 페이지 입니다.');
                      setClickPage(1);
                      setPage(0);
                    }
                  }}
                  className="ml-[234px] mt-[55.63px] cursor-pointer"
                />
                <div
                  onClick={() => {
                    setClickPage(1);
                    setPage(0);
                  }}
                  className={cn(
                    'ml-[9.5px] mt-[43px] w-[38px] h-[38px] border border-[#FF611D] rounded-full cursor-pointer',
                    {
                      'font-bold bg-[#FF611D] text-[#FFFFFF]': clickPage === 1,
                      'font-normal text-[#FF611D]': clickPage !== 1,
                    },
                  )}
                >
                  <div className="ml-[12.3px] mt-[4px] text-[20px] leading-[26px] flex">1</div>
                </div>
                <div
                  onClick={() => {
                    setClickPage(2);
                    setPage(1);
                  }}
                  className={cn(
                    'ml-[9.5px] mt-[43px] w-[38px] h-[38px] border border-[#FF611D] rounded-full cursor-pointer',
                    {
                      'font-bold bg-[#FF611D] text-[#FFFFFF]': clickPage === 2,
                      'font-normal text-[#FF611D]': clickPage !== 2,
                    },
                  )}
                >
                  <div className="ml-[12.3px] mt-[4px] text-[20px] leading-[26px] flex">2</div>
                </div>
                <div
                  onClick={() => {
                    setClickPage(3);
                    setPage(2);
                  }}
                  className={cn(
                    'ml-[9.5px] mt-[43px] w-[38px] h-[38px] border border-[#FF611D] rounded-full cursor-pointer',
                    {
                      'font-bold bg-[#FF611D] text-[#FFFFFF]': clickPage === 3,
                      'font-normal text-[#FF611D]': clickPage !== 3,
                    },
                  )}
                >
                  <div className="ml-[12.3px] mt-[4px] text-[20px] leading-[26px] flex">3</div>
                </div>
                <div
                  onClick={() => {
                    setClickPage(4);
                    setPage(3);
                  }}
                  className={cn(
                    'ml-[9.5px] mt-[43px] w-[38px] h-[38px] border border-[#FF611D] rounded-full cursor-pointer',
                    {
                      'font-bold bg-[#FF611D] text-[#FFFFFF]': clickPage === 4,
                      'font-normal text-[#FF611D]': clickPage !== 4,
                    },
                  )}
                >
                  <div className="ml-[12.3px] mt-[4px] text-[20px] leading-[26px] flex">4</div>
                </div>
                <div
                  onClick={() => {
                    setClickPage(5);
                    setPage(4);
                  }}
                  className={cn(
                    'ml-[9.5px] mt-[43px] w-[38px] h-[38px] border border-[#FF611D] rounded-full cursor-pointer',
                    {
                      'font-bold bg-[#FF611D] text-[#FFFFFF]': clickPage === 5,
                      'font-normal text-[#FF611D]': clickPage !== 5,
                    },
                  )}
                >
                  <div className="ml-[12.3px] mt-[4px] text-[20px] leading-[26px] flex">5</div>
                </div>
                <RightIcon
                  onClick={() => {
                    setClickPage(clickPage + 1);
                    if (clickPage === 5) {
                      alert('마지막 페이지 입니다.');
                      setClickPage(5);
                      setPage(4);
                    }
                  }}
                  className="ml-[15px] mt-[53.63px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="ml-[25px] mt-[20px] w-[687px] h-[1px] border border-[#D5D5D5] bg-[#D5D5D5] "></div>
          <div className="grid grid-cols-[235px_minmax(235px,_0fr)_235px]">
            {reviewList.map((school: any) => (
              <>
                <div
                  key={school.restaurantReviewId}
                  className="ml-[20px] mt-[18px] w-[220px] h-[312px] border-[1px] border-[#D2D2D2] shadow-[1px_1px_4px_rgba(0,0,0,0.07)] rounded-[5px]"
                >
                  <div className="flex flex-row">
                    {school.memberProfileImageName ? (
                      <img
                        key={school.restaurantReviewId}
                        src={`/image/${school.memberProfileImageName}`}
                        className="w-[39px] h-[40px] ml-[13px] mt-[15px] border rounded-full border-[#9C9C9C]"
                      />
                    ) : (
                      <div className="w-[39px] h-[40px] ml-[13px] mt-[15px] border rounded-full border-[#9C9C9C] bg-[#9C9C9C]"></div>
                    )}
                    <div className="">
                      <div className="ml-[4px] mt-[21px] w-[82px] h-[10px] font-[400] text-[12px] leading-[20px] flex items-center">
                        {school.nickName}
                      </div>
                      <ReviewStarView {...school} school={school} />
                    </div>
                  </div>
                  <div className="ml-[20px] mt-[13.12px] w-[180px] h-[120px] border border-[#DDDDDD] rounded-[10px] text-center bg-[#DDDDDD]">
                    이미지
                  </div>
                  <div className="ml-[20px] mt-[11px] w-[184px] h-[62px] font-[400] text-[12px] leading-[16px] text-[#6B6B6B]">
                    {school.content}
                  </div>
                  <div className="flex flex-row w-[209px]">
                    <div className="ml-[20px] mt-[18px] h-[16px] font-normal text-[11px] leading-[14px] flex items-center text-[#A5A5A5]">
                      {school.writeDate}
                    </div>
                    {school.like ? (
                      <ReviewSmallHeartActive className="ml-[99px] mt-[18px]" />
                    ) : (
                      <ReviewSmallHeart className="ml-[99px] mt-[18px]" />
                    )}
                    <div className="ml-[3.31px] mt-[15px] w-[18px] h-[16px] font-normal text-[11px] leading-[14px] flex items-center text-[#A5A5A5]">
                      {school.likedCount}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="ml-[25px] mt-[13px] w-[687px] h-[1px] border border-[#D5D5D5] bg-[#D5D5D5] "></div>
          <div
            onClick={handleMoreButton}
            className="mt-[13px] mb-[20px] ml-[649px] font-[400] text-[16px] leading-[22px] flex items-center cursor-pointer"
          >
            더보기
            <div className="w-[14px] h-[14px] rounded-full border border-[#FF611D] bg-[#FF611D]">
              <MoreInfo className="ml-[2.22px] mt-[3.5px]" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default reviewWrite;
