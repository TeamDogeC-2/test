import { DesktopHeader, Mobile, MobileHeader } from '../../mediaQuery';
import './restaurantDetail.scss';
import RestaurantNavbar from './RestaurantNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Circle_human from '../../img/circle_human.png';
import empty_heart from '../../img/empty_heart.svg';
import share from '../../img/share.svg';
import review from '../../img/review.svg';
import pin from '../../img/pin.svg';
import phone from '../../img/phone.svg';
import clock from '../../img/clock.svg';
import plus_circle from '../../img/plus_circle.svg';
import restaurant_empty_heart from '../../img/restaurant_empty_heart.svg';
import restaurant_detail_star from '../../img/restaurant_detail_star.svg';
import RestaurantMenu from './RestaurantMenu';
import RestaurantReview from './RestaurantReview';
import RestaurantPhoto from './RestaurantPhoto';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { RestaurantUserInfo } from './data/RestaurantUserInfo';
const kakao = (window as any).kakao;

const RestaurantDetail = () => {
  const [clickPage, setClickPage] = useState<any>(1);
  const [heart, isHeart] = useState<boolean>();
  const [image, setImage] = useState<any>([]);
  const [restaurantDetail, setRestaurantDetail] = useState<any>([]);
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const [clickHeart, isClickHeart] = useState<boolean>();
  const [likedCount, setlikedCount] = useState<number>();
  const [memberId, setMemberId] = useState<string>();
  const navigate = useNavigate();

  const handleImgError = (e: any) => {
    e.target.src = Circle_human;
  };
  const imgArr = image.slice(1);
  const state = useLocation();
  const restaurantId = state.state.value1;
  const schoolName = state.state.value2;

  const url = `/restaurant/${restaurantId}`;

  const pageList = [
    { page: 'menu', value: 1, name: '메뉴' },
    { page: 'review', value: 2, name: '리뷰' },
    { page: 'photo', value: 3, name: '사진' },
  ];

  const isDesktop = useMediaQuery({
    query: '(min-width: 1041px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width: 769px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  useEffect(() => {
    axios
      .post(url, {
        restaurantId,
        memberId,
      })
      .then(res => {
        setImage(res.data.restaurant.fileName);
        setRestaurantDetail(res.data.restaurant);
        setLatitude(Number(res.data.restaurant.latitude));
        setLongitude(Number(res.data.restaurant.longitude));
        isHeart(res.data.restaurant.like);
      })
      .catch(err => {
        console.log(err);
        if (!restaurantId || !schoolName) {
          alert('학교가 등록되지 않았거나 없는 음식점입니다.');
          navigate(-1);
        }
      });
  }, [isDesktop, isTablet, isMobile, clickHeart]);

  useEffect(() => {
    RestaurantUserInfo()
      .then(res => {
        setMemberId(res.data.memberId);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const restaurantReivewInfo = {
    name: restaurantDetail.name,
    reviewCount: restaurantDetail.reviewCount,
    starLiked: restaurantDetail.starLiked,
    restaurantId,
  };

  const MapLocation = [longitude, latitude];

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(...MapLocation),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(...MapLocation);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  });

  const handleHeartCount = () => {
    if (!memberId) {
      if (confirm('로그인후 이용가능한 기능입니다. 로그인하시겠습니까?')) {
        navigate('/login');
      } else {
        /* empty */
      }
    } else {
      void axios
        .post(`/restaurant/${memberId}/like`, {
          restaurantId,
          memberId,
        })
        .then(res => {
          isClickHeart(res.data.data.like);
          setlikedCount(res.data.data.likedCount);
          isHeart(res.data.data.like);
        });
    }
  };

  return (
    <>
      <DesktopHeader>
        <div>
          <RestaurantNavbar />
          <div className="restaurant-detail-main">
            <div className="restaurant-detail-top">
              <div className="restaurant-detail-left">
                <div id="map" className="restaurant-detail-map"></div>
                <div className="restaurant-detail-left-info">
                  <span className="restaurant-detail-left-info-name">{restaurantDetail.name}</span>
                  <p>{restaurantDetail.tag}</p>
                  <p>
                    <img src={restaurant_detail_star} alt="" /> {restaurantDetail.starLiked}
                  </p>
                </div>
                <div className="restaurant-detail-underline"></div>
                <div className="restaurant-detail-functions">
                  <div className="restaurant-detail-heart" onClick={handleHeartCount}>
                    {heart ? (
                      <FontAwesomeIcon icon={faHeart} className="restaurant-detail-heart-icon" />
                    ) : (
                      <img src={empty_heart} alt="" />
                    )}
                    <p>좋아요</p>
                  </div>
                  <div className="restaurant-detail-vertical-underline"></div>
                  <div className="restaurant-detail-share">
                    <img src={share} alt="" />
                    <p>공유</p>
                  </div>
                  <div className="restaurant-detail-vertical-underline"></div>
                  <div className="restaurant-detail-review-function">
                    <img src={review} alt="" />
                    <p>리뷰</p>
                  </div>
                </div>
                <button className="restaurant-detail-left-button">배달가능 업체</button>
              </div>
              <div className="restaurant-detail-right">
                <div className="restaurant-detail-right-imgs">
                  <img
                    src={`/image/${image[0]}`}
                    alt=""
                    onError={handleImgError}
                    className="restaurant-detail-right-first-img"
                  />
                  <div className="restaurant-detail-right-other-imgs">
                    {imgArr.map((school: any) => (
                      <img
                        key={school}
                        src={`/image/${school}`}
                        className="restaurant-detail-right-other-img"
                      />
                    ))}
                  </div>
                </div>
                <div className="restaurant-detail-right-info">
                  <span>매장정보</span>
                  <p>
                    <img src={pin} alt="" />
                    {restaurantDetail.address}
                    <div className="restaurant-detail-school-name-info">
                      {restaurantDetail.schoolName}
                    </div>
                    에서
                    <div className="restaurant-detail-distance-info">
                      {restaurantDetail.distance}
                    </div>
                  </p>
                  <p>
                    <img src={phone} alt="" />
                    {restaurantDetail.tel}
                  </p>
                  <p>
                    <img src={clock} alt="" />
                    영업시간 AM {restaurantDetail.startTime}- PM {restaurantDetail.endTime}
                  </p>
                  <p>
                    <img src={plus_circle} alt="" />
                    {restaurantDetail.detail}
                  </p>
                  <p>
                    <img src={restaurant_empty_heart} alt="" />이 식당에{' '}
                    {clickHeart ? likedCount : restaurantDetail.likedCount}명의 좋아요한 사용자가
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="restaurant-detail-bottom">
              <div className="restaurant-detail-bottom-list-div">
                <ul className="restaurant-detail-bottom-list">
                  {pageList.map(page => (
                    <li
                      key={page.value}
                      id={page.page}
                      className={
                        clickPage.toString() === `${page.value}`
                          ? 'restaurant-detail-bottom-li active'
                          : 'restaurant-detail-bottom-li'
                      }
                      onClick={() => setClickPage(page.value)}
                    >
                      {page.name}
                    </li>
                  ))}
                </ul>
              </div>
              {clickPage === 1 && <RestaurantMenu />}
              {clickPage === 2 && <RestaurantReview {...restaurantReivewInfo} />}
              {clickPage === 3 && <RestaurantPhoto />}
            </div>
          </div>
        </div>
      </DesktopHeader>
      <MobileHeader>
        <div>
          <RestaurantNavbar />
          <div className="restaurant-tablet-detail-main">
            <div className="restaurant-tablet-detail-top">
              <div className="restaurant-tablet-detail-left">
                <div id="map" className="restaurant-tablet-detail-map"></div>
                <div className="restaurant-tablet-detail-left-info">
                  <span className="restaurant-tablet-detail-left-info-name">
                    {restaurantDetail.name}
                  </span>
                  <p>{restaurantDetail.tag}</p>
                  <p>
                    <img src={restaurant_detail_star} alt="" /> {restaurantDetail.starLiked}
                  </p>
                </div>
                <div className="restaurant-tablet-detail-underline"></div>
                <div className="restaurant-tablet-detail-functions">
                  <div className="restaurant-tablet-detail-heart" onClick={handleHeartCount}>
                    {heart ? (
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="restaurant-tablet-detail-heart-icon"
                      />
                    ) : (
                      <img src={empty_heart} alt="" />
                    )}
                    <p>좋아요</p>
                  </div>
                  <div className="restaurant-tablet-detail-vertical-underline"></div>
                  <div className="restaurant-tablet-detail-share">
                    <img src={share} alt="" />
                    <p>공유</p>
                  </div>
                  <div className="restaurant-tablet-detail-vertical-underline"></div>
                  <div className="restaurant-tablet-detail-review">
                    <img src={review} alt="" />
                    <p>리뷰</p>
                  </div>
                </div>
                <button className="restaurant-tablet-detail-left-button">배달가능 업체</button>
              </div>
              <div className="restaurant-tablet-detail-right">
                <div className="restaurant-tablet-detail-right-imgs">
                  <img
                    src={`/image/${image[0]}`}
                    alt=""
                    onError={handleImgError}
                    className="restaurant-tablet-detail-right-first-img"
                  />
                  <div className="restaurant-tablet-detail-right-other-imgs">
                    {/* {imgArr.map((school: any) => (
                    <img
                      key={school}
                      src={`/image/${school}`}
                      className="restaurant-tablet-detail-right-other-img"
                    />
                  ))} */}
                    <div className="restaurant-tablet-detail-right-other-top-imgs">
                      <img
                        src={`/image/${image[0]}`}
                        alt=""
                        onError={handleImgError}
                        className="restaurant-tablet-detail-right-other-img"
                      />
                      <img
                        src={`/image/${image[0]}`}
                        alt=""
                        onError={handleImgError}
                        className="restaurant-tablet-detail-right-other-img"
                      />
                    </div>
                    <div className="restaurant-tablet-detail-right-other-bottom-imgs">
                      <img
                        src={`/image/${image[0]}`}
                        alt=""
                        onError={handleImgError}
                        className="restaurant-tablet-detail-right-other-img"
                      />
                      <img
                        src={`/image/${image[0]}`}
                        alt=""
                        onError={handleImgError}
                        className="restaurant-tablet-detail-right-other-img"
                      />
                    </div>
                  </div>
                </div>
                <div className="restaurant-tablet-detail-right-info">
                  <span>매장정보</span>
                  <p>
                    <img src={pin} alt="" />
                    {restaurantDetail.address}
                    <div className="restaurant-tablet-detail-school-name-info">
                      {restaurantDetail.schoolName}
                    </div>
                    에서
                    <div className="restaurant-tablet-detail-distance-info">
                      {restaurantDetail.distance}
                    </div>
                  </p>
                  <p>
                    <img src={phone} alt="" />
                    {restaurantDetail.tel}
                  </p>
                  <p>
                    <img src={clock} alt="" />
                    영업시간 AM {restaurantDetail.startTime}- PM {restaurantDetail.endTime}
                  </p>
                  <p>
                    <img src={plus_circle} alt="" />
                    {restaurantDetail.detail}
                  </p>
                  <p>
                    <img src={restaurant_empty_heart} alt="" />이 식당에{' '}
                    {clickHeart ? likedCount : restaurantDetail.likedCount}명의 좋아요한 사용자가
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="restaurant-tablet-detail-bottom">
              <div className="restaurant-tablet-detail-bottom-list-div">
                <ul className="restaurant-tablet-detail-bottom-list">
                  {pageList.map(page => (
                    <li
                      key={page.value}
                      id={page.page}
                      className={
                        clickPage.toString() === `${page.value}`
                          ? 'restaurant-tablet-detail-bottom-li active'
                          : 'restaurant-tablet-detail-bottom-li'
                      }
                      onClick={() => setClickPage(page.value)}
                    >
                      {page.name}
                    </li>
                  ))}
                </ul>
              </div>
              {clickPage === 1 && <RestaurantMenu />}
              {clickPage === 2 && <RestaurantReview {...restaurantReivewInfo} />}
              {clickPage === 3 && <RestaurantPhoto />}
            </div>
          </div>
        </div>
      </MobileHeader>
      <Mobile>
        <div>
          <RestaurantNavbar />
          <div className="restaurant-mobile-detail-main">
            <div className="restaurant-mobile-detail-top">
              <div className="restaurant-mobile-detail-top-img-div">
                <div className="restaurant-mobile-detail-top-first-img">
                  <img src={`/image/${image[0]}`} alt="" onError={handleImgError} />
                </div>
                <div className="restaurant-mobile-detail-top-other-imgs">
                  {/* {imgArr.map((school: any) => (
                    <img
                      key={school}
                      src={`/image/${school}`}
                      className="restaurant-tablet-detail-top-other-img"
                    />
                  ))} */}
                  <div className="restaurant-mobile-detail-top-other-top-imgs">
                    <img
                      src={`/image/${image[0]}`}
                      alt=""
                      onError={handleImgError}
                      className="restaurant-mobile-detail-top-other-img"
                    />
                    <img
                      src={`/image/${image[0]}`}
                      alt=""
                      onError={handleImgError}
                      className="restaurant-mobile-detail-top-other-img"
                    />
                  </div>
                  <div className="restaurant-mobile-detail-top-other-bottom-imgs">
                    <img
                      src={`/image/${image[0]}`}
                      alt=""
                      onError={handleImgError}
                      className="restaurant-mobile-detail-top-other-img"
                    />
                    <img
                      src={`/image/${image[0]}`}
                      alt=""
                      onError={handleImgError}
                      className="restaurant-mobile-detail-top-other-img"
                    />
                  </div>
                </div>
              </div>
              <div className="restaurant-mobile-detail-top-info-div">
                <div className="restaurant-mobile-detail-top-info-right">
                  <div className="restaurant-mobile-detail-left-info">
                    <span className="restaurant-mobile-detail-left-info-name">
                      {restaurantDetail.name}
                    </span>
                    <p>{restaurantDetail.tag}</p>
                    <p>
                      <img src={restaurant_detail_star} alt="" /> {restaurantDetail.starLiked}
                    </p>
                  </div>
                  <div className="restaurant-mobile-detail-underline"></div>
                  <div className="restaurant-mobile-detail-functions">
                    <div className="restaurant-mobile-detail-heart" onClick={handleHeartCount}>
                      {heart ? (
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="restaurant-mobile-detail-heart-icon"
                        />
                      ) : (
                        <img src={empty_heart} alt="" />
                      )}
                      <p>좋아요</p>
                    </div>
                    <div className="restaurant-mobile-detail-vertical-underline"></div>
                    <div className="restaurant-mobile-detail-share">
                      <img src={share} alt="" />
                      <p>공유</p>
                    </div>
                    <div className="restaurant-mobile-detail-vertical-underline"></div>
                    <div className="restaurant-mobile-detail-review">
                      <img src={review} alt="" />
                      <p>리뷰</p>
                    </div>
                  </div>
                  <button className="restaurant-mobile-detail-left-button">배달가능 업체</button>
                </div>
                <div id="map" className="restaurant-mobile-detail-map"></div>
                <div className="restaurant-mobile-detail-bottom-info">
                  <span>매장정보</span>
                  <p>
                    <img src={pin} alt="" />
                    {restaurantDetail.address}
                    <div className="restaurant-mobile-detail-school-name-info">
                      {restaurantDetail.schoolName}
                    </div>
                    에서
                    <div className="restaurant-mobile-detail-distance-info">
                      {restaurantDetail.distance}
                    </div>
                  </p>
                  <p>
                    <img src={phone} alt="" />
                    {restaurantDetail.tel}
                  </p>
                  <p>
                    <img src={clock} alt="" />
                    영업시간 AM {restaurantDetail.startTime}- PM {restaurantDetail.endTime}
                  </p>
                  <p>
                    <img src={plus_circle} alt="" />
                    {restaurantDetail.detail}
                  </p>
                  <p>
                    <img src={restaurant_empty_heart} alt="" />이 식당에{' '}
                    {clickHeart ? likedCount : restaurantDetail.likedCount}명의 좋아요한 사용자가
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="restaurant-mobile-detail-bottom">
              <div className="restaurant-mobile-detail-bottom-list-div">
                <ul className="restaurant-mobile-detail-bottom-list">
                  <li
                    id="menu"
                    className={
                      clickPage === 1
                        ? 'restaurant-mobile-detail-bottom-li active'
                        : 'restaurant-mobile-detail-bottom-li'
                    }
                    onClick={() => setClickPage(1)}
                  >
                    메뉴
                  </li>
                  <li
                    id="review"
                    className={
                      clickPage === 2
                        ? 'restaurant-mobile-detail-bottom-li active'
                        : 'restaurant-mobile-detail-bottom-li'
                    }
                    onClick={() => setClickPage(2)}
                  >
                    리뷰
                  </li>
                  <li
                    id="photo"
                    className={
                      clickPage === 3
                        ? 'restaurant-mobile-detail-bottom-li active'
                        : 'restaurant-mobile-detail-bottom-li'
                    }
                    onClick={() => setClickPage(3)}
                  >
                    사진
                  </li>
                </ul>
              </div>
              {clickPage === 1 && <RestaurantMenu />}
              {clickPage === 2 && <RestaurantReview {...restaurantReivewInfo} />}
              {clickPage === 3 && <RestaurantPhoto />}
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
};

export default RestaurantDetail;
