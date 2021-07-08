import { useContext, useRef } from "react";
import Reward from '../Reward/Reward.js';
import { MouseContext } from "../../context/mouse-context";

export default function Wave2(props) {
  const { cursorChangeHandler } = useContext(MouseContext);
  const size = props.size;
  const styles = {
    width: size,
    height: size,
    position: "absolute",
    top: "5%",
    right: "15%"
  }
  const canvasInput = useRef(null);
  function confetti(){
    canvasInput.current.rewardMe();
  }

  return (
    <div onClick={()=>confetti()} style={styles} onMouseEnter={() => cursorChangeHandler("hovered")}
  onMouseLeave={() => cursorChangeHandler("")}>
  <svg viewBox="0 0 105 30" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-593.000000, -324.000000)">
              <g transform="translate(593.000000, 324.000000)">
                  <path d="M92.301381,30 C84.8544969,30 81.7414482,22.9968543 79.23922,17.3696735 C78.1397432,14.8956398 76.0937082,10.2913523 74.7806577,10.2913523 C73.4676073,10.2913523 71.420718,14.8956398 70.3212411,17.3696735 C67.8198672,22.9968543 64.7076728,30 57.2599345,30 C49.8121962,30 46.7000018,22.9968543 44.1986278,17.3696735 C43.099151,14.8956398 41.053116,10.2913523 39.7409198,10.2913523 C38.4278694,10.2913523 36.3809801,14.8956398 35.2815032,17.3696735 C32.7809836,22.9968543 29.6670806,30 22.2193423,30 C14.7724583,30 11.6594096,22.9968543 9.15718136,17.3696735 C8.0577045,14.8956398 6.01166948,10.2913523 4.69861904,10.2913523 C2.10327274,10.2913523 0,8.21177876 0,5.64567617 C0,3.08041826 2.10327274,1 4.69861904,1 C12.1455031,1 15.259406,8.00399033 17.76078,13.6311712 C18.8602568,16.1035156 20.9062918,20.7086477 22.2193423,20.7086477 C23.5323927,20.7086477 25.579282,16.1043602 26.6787589,13.6311712 C29.1801328,8.00399033 32.2923272,1 39.7409198,1 C47.1878038,1 50.2999982,8.00399033 52.8013722,13.6311712 C53.900849,16.1043602 55.9477383,20.7086477 57.2599345,20.7086477 C58.5721306,20.7086477 60.6190199,16.1043602 61.7184968,13.6311712 C64.2190164,8.00399033 67.3329194,1 74.7806577,1 C82.228396,1 85.3414447,8.00399033 87.8428186,13.6311712 C88.9422955,16.1035156 90.9883305,20.7086477 92.301381,20.7086477 C94.8975816,20.7086477 97,22.7890659 97,25.3543238 C97,27.9204264 94.8975816,30 92.301381,30" fill="#F4C3AE"></path>
                  <path d="M82.3767006,9.40626514 C83.7871735,9.40626514 85.5063214,13.0405039 87.1465856,16.7619645 C89.6194147,22.3749394 92.6967321,29.3586637 99.9625968,29.3586637 C102.385695,29.3586637 104.356927,27.3927543 104.356927,24.9761993 C104.356927,22.5587892 102.385695,20.5937349 99.9625968,20.5937349 C98.5529813,20.5937349 96.8338335,16.9620614 95.1944267,13.241456 C92.7181679,7.62335034 89.6408504,0.64133626 82.3767006,0.64133626 C75.110836,0.64133626 72.034376,7.62506057 69.5615469,13.2354702 C67.9212826,16.9594961 66.2012774,20.5937349 64.7908045,20.5937349 C63.3829039,20.5937349 61.6637561,16.9612063 60.0243493,13.2406009 C57.5498053,7.62506057 54.4724879,0.64133626 47.2083381,0.64133626 C39.9441883,0.64133626 36.8668708,7.62335034 34.3931843,13.2337599 C32.7520626,16.9594961 31.0320574,20.5937349 29.6232994,20.5937349 C28.2136839,20.5937349 26.4945361,16.9620614 24.8551293,13.241456 C22.3788705,7.62335034 19.301553,0.64133626 12.0374032,0.64133626 C9.61430509,0.64133626 7.64307275,2.60639056 7.64307275,5.0238007 C7.64307275,7.44035573 9.61430509,9.40626514 12.0374032,9.40626514 C13.4478761,9.40626514 15.1661665,13.0405039 16.8064307,16.7619645 C19.2801172,22.3749394 22.3574347,29.3586637 29.6232994,29.3586637 C36.8874491,29.3586637 39.9647666,22.3749394 42.4375957,16.7636747 C44.0787174,13.0405039 45.7978652,9.40626514 47.2083381,9.40626514 C48.6170961,9.40626514 50.3362439,13.0405039 51.9765082,16.7619645 C54.4501947,22.3749394 57.5275121,29.3586637 64.7908045,29.3586637 C72.0566691,29.3586637 75.1339866,22.3749394 77.6068157,16.7636747 C79.2479374,13.0405039 80.9670852,9.40626514 82.3767006,9.40626514 Z M99.9625968,30 C92.2765913,30 89.1058139,22.8042072 86.557531,17.0210643 C85.7172492,15.1133027 83.4845006,10.0476014 82.3767006,10.0476014 C81.2689007,10.0476014 79.0370095,15.1133027 78.1958703,17.0202092 C75.6475874,22.8042072 72.47681,30 64.7908045,30 C57.1065138,30 53.9357365,22.8042072 51.3883109,17.0219194 C50.5471718,15.1133027 48.3152806,10.0476014 47.2083381,10.0476014 C46.1005381,10.0476014 43.8677895,15.1133027 43.0275078,17.0202092 C40.4792248,22.8042072 37.3084474,30 29.6232994,30 C21.9372938,30 18.7665165,22.8042072 16.2182335,17.0210643 C15.3770944,15.1133027 13.1452032,10.0476014 12.0374032,10.0476014 C9.26018636,10.0476014 7,7.79351823 7,5.0238007 C7,2.25322806 9.26018636,0 12.0374032,0 C19.7208364,0 22.8916138,7.19493772 25.4407542,12.9755152 C26.2836082,14.8892626 28.5163568,19.9523986 29.6232994,19.9523986 C30.7310993,19.9523986 32.9629905,14.8858421 33.8032722,12.9789357 C36.35327,7.19493772 39.5249049,0 47.2083381,0 C54.8917713,0 58.0634061,7.19579283 60.6108316,12.9772254 C61.4536856,14.8884075 63.6838619,19.9523986 64.7908045,19.9523986 C65.8994619,19.9523986 68.1322105,14.8858421 68.9716348,12.9789357 C71.5207752,7.19579283 74.6915526,0 82.3767006,0 C90.0601339,0 93.2309112,7.19493772 95.7800516,12.9755152 C96.6229056,14.8892626 98.8556542,19.9523986 99.9625968,19.9523986 C102.739814,19.9523986 105,22.2056267 105,24.9761993 C105,27.7459168 102.739814,30 99.9625968,30 L99.9625968,30 Z" fill="#121311"></path>
              </g>
          </g>
      </g>
  </svg>
      <Reward ref={canvasInput} type='emoji' config = {{"elementCount": 5, "elementSize": 50}}></Reward>
    </div>
  )
}