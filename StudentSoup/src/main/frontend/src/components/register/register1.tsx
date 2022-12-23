import RegisterNavbar from "../common/registerNavbar";

const Register = () => {
  return (
    <div>
      <RegisterNavbar />
      <div className="w-full h-[calc(100vh-88px)] flex flex-col justify-center items-center">
        <div className="flex flex-col text-center w-[530px]">
          <span className="text-[40px] fw-400 leading-[56px] flex justify-center font-bold">
            신규 회원가입
          </span>
          <div className="flex flex-row  justify-center items-center mt-[47px]">
            <div className="flex flex-col items-center">
              <div className='w-[45px] h-[45px] bg-[url("./img/circle1.jpg")] bg-cover relative top-[12px]'></div>
              <div className='w-[8px] h-[23px] bg-[url("./img/number1.jpg")] bg-cover relative bottom-[22px] right-[1px]'></div>
              <span className="text-[#FF611D] text-[16px] fw-400 leading-[21px]">이용약관 동의</span>
            </div>
            <span className="w-[110px] h-[3px] bg-[#D9D9D9] relative bottom-[10px]"></span>
            <div className="flex flex-col items-center">
              <div className='w-[45px] h-[45px] bg-[url("./img/circle2.jpg")] bg-cover relative top-[12px]'></div>
              <div className='w-[15px] h-[23px] bg-[url("./img/number2.jpg")] bg-cover relative bottom-[22px]'></div>
              <span className="text-[#D9D9D9] text-[16px] fw-400 leading-[21px]">개인정보 수집 동의</span>
            </div>
            <span className="w-[110px] h-[3px] bg-[#D9D9D9] relative bottom-[10px]"></span>
            <div className="flex flex-col items-center">
              <div className='w-[45px] h-[45px] bg-[url("./img/circle2.jpg")] bg-cover relative top-[12px]'></div>
              <div className='w-[15px] h-[23px] bg-[url("./img/number3.jpg")] bg-cover relative bottom-[22px]'></div>
              <span className="text-[#D9D9D9] text-[16px] fw-400 leading-[21px]">개인 정보수집</span>
            </div>
          </div>
          <div className="mt-[49px]">
            <span className="flex text-[26px] leading-[37px] text-left text-[#161616] font-bold">
              SFOO 서비스 이용약관에
              <br />동의해주세요.
            </span>
          </div>
          <div className="flex text-left mt-[46px] mb-[53px]">
            <input type="checkbox" className="w-[20px] h-[20px] mr-[8px]" />
            <span className="text-[16px] fw-400 leading-[21px]">모든 약관에 동의 합니다.</span>
          </div>
          <span className="w-[530px] h-[1px] bg-[#D9D9D9]"></span>
          <div className="flex-col justify-center items-center">
            <div className="flex flex-row items-center my-[11px]">
              <div className='w-[15px] h-[11px] bg-[url("./img/Vector7.jpg")] bg-cover mr-[11px]'></div>
              <span className="flex text-left">[필수] 개인정보 수집 및 이용동의</span>
            </div>
            <div className="flex flex-row items-center my-[22px]">
              <div className='w-[15px] h-[11px] bg-[url("./img/Vector7.jpg")] bg-cover mr-[11px]'></div>
              <span className="flex text-left">[필수] 개인정보 보유기간 및 이용기간</span>
            </div>
            <div className="flex flex-row items-center my-[22px]">
              <div className='w-[15px] h-[11px] bg-[url("./img/Vector7.jpg")] bg-cover mr-[11px]'></div>
              <span className="flex text-left">[선택] 광고성 정보 수신 및 마케팅 활용 동의</span>
            </div>
            <span className="text-[12px] fw-400 leading-[16px] text-[#939393] mt-[28px]">고객님께서는 동의를 거부할 수 있습니다. 단, 필수항목 동의 거부 시에는 회원가입이 제한됩니다.</span>
          </div>
          <div className="w-[530px] h-[54px] mt-[56px] bg-[#B8B8B8] flex justify-center items-center">
            <button className="w-full h-full text-[16px] fw-400 leading-[22px] text-white">동의하고 가입하기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register