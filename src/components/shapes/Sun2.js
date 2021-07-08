import { useContext, useRef, useEffect } from "react";
import Reward from '../Reward/Reward.js';
import { IceCreamSet } from "../Reward/MemphisSets";
import useSound from 'use-sound';
import foamSfx from '../foam.mp3';

export default function Sun2(props) {
  const size = props.size;
  const clicked = props.clicked;
  const styles = {
    width: size,
    height: size,
    position: "relative",
    top: "15%",
    left: "15%"
  }
  const styles2 = {
    width: size,
    height: size,
    position: "relative",
    top: "15%",
    left: "15%",
    transform: "translate(500px, 0) rotate(300deg)",
    transformOrigin: "right top",
    transition: "all .5s ease"
  }
  const canvasInput = useRef(null);

  function confetti(){
    canvasInput.current.rewardMe();
  }
  const [playFoam] = useSound(foamSfx);

  function handleClick() {
    confetti();
    playFoam();
  }

  return (
    <div onClick={()=>handleClick()} style={clicked ? styles2: styles}>
      <svg viewBox="0 0 68 68">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-619.000000, -39.000000)">
                  <g transform="translate(619.000000, 39.000000)">
                      <path d="M33.967625,2.05490651 L33.967625,2.05490651 C33.967625,3.13222799 34.7989007,4.03421166 35.8733505,4.10204727 C51.7509474,5.10003558 64.2700983,18.4808973 63.8837793,34.6976324 C63.5055086,50.5717402 50.5563478,63.5156946 34.6816253,63.8853411 C18.4700234,64.263036 5.0977513,51.7473658 4.10033537,35.8726831 C4.03249959,34.7982361 3.13051365,33.9669624 2.05433923,33.9669624 C0.862039142,33.9669624 -0.071565167,34.9787478 0.00431892715,36.1687453 C1.15580257,54.2055444 16.3544668,68.4194044 34.7793548,67.9905454 C52.8334455,67.5703095 67.5612835,52.8494071 67.9901436,34.7959365 C68.4282017,16.365346 54.2102819,1.1563721 36.1699883,0.00431647448 C34.9794129,-0.0715674292 33.967625,0.862609415 33.967625,2.05490651" fill="#E26141"></path>
                      <path d="M55,33.4997094 C55,21.0736291 44.9263709,11 32.4997094,11 C20.0736291,11 10,21.0736291 10,33.4997094 C10,45.9263709 20.0736291,56 32.4997094,56 C44.9263709,56 55,45.9263709 55,33.4997094" fill="#F4C3AE"></path>
                      <path d="M41.6407346,15 C43.6519348,15 44.9322436,14.4301404 46,13.7220022 C45.8096463,13.6398992 45.6181827,13.5604969 45.4244993,13.4837955 C44.471066,14.0671588 43.3455931,14.4933381 41.6407346,14.4933381 C39.0773422,14.4933381 37.8231169,13.5329492 36.495081,12.5163846 C36.2692094,12.342996 36.041118,12.1696075 35.806367,12 C35.536653,12.0183651 35.2674941,12.0383507 35,12.0664386 C35.4073457,12.3300324 35.7869431,12.6195535 36.1726452,12.9150162 C37.5123354,13.9402233 38.8975329,15 41.6407346,15" fill="#121311"></path>
                      <path d="M30.5446463,15.5549645 C33.222845,15.5549645 34.5332431,16.605792 35.9207576,17.7180851 C37.3204484,18.8398345 38.7676846,20 41.6337457,20 C44.5003865,20 45.9470429,18.8398345 47.3467337,17.7180851 C48.1602242,17.0661939 48.9487824,16.4373522 50,16.0271868 C49.8225744,15.9007092 49.6451488,15.7754137 49.4648241,15.6542553 C48.5005798,16.0910165 47.7479706,16.6914894 47.009857,17.2825059 C45.6229223,18.394208 44.3119443,19.4450355 41.6337457,19.4450355 C38.955547,19.4450355 37.6451488,18.394208 36.2576343,17.2825059 C34.8579436,16.1601655 33.4107074,15 30.5446463,15 C27.6785852,15 26.2313491,16.1601655 24.8316583,17.2825059 C23.6407035,18.2369976 22.5036722,19.1447991 20.5114032,19.3829787 C20.3362969,19.5791962 20.1687283,19.7825059 20,19.9846336 C22.5106301,19.8475177 23.8610359,18.7665485 25.168535,17.7180851 C26.5560495,16.605792 27.8670274,15.5549645 30.5446463,15.5549645" fill="#121311"></path>
                      <path d="M25.9403841,21.7180851 C27.3050307,20.6052009 28.5944021,19.5549645 31.2278906,19.5549645 C33.8619494,19.5549645 35.1507506,20.6052009 36.5153972,21.7180851 C37.8920194,22.8398345 39.3154033,24 42.1342283,24 C44.9536235,24 46.3764372,22.8398345 47.7530594,21.7180851 C49.1182763,20.6052009 50.4076477,19.5549645 53.0417065,19.5549645 C53.7938874,19.5549645 54.4342961,19.643026 55,19.7907801 C54.8237878,19.5602837 54.6430135,19.3339243 54.4582473,19.1105201 C54.0271262,19.0395981 53.5583675,19 53.0417065,19 C50.2223113,19 48.798357,20.1601655 47.4217348,21.2819149 C46.0576585,22.394208 44.768287,23.4450355 42.1342283,23.4450355 C39.5001695,23.4450355 38.2113683,22.394208 36.8467217,21.2819149 C35.4700996,20.1601655 34.0467156,19 31.2278906,19 C28.4090657,19 26.9856817,20.1601655 25.6090595,21.2819149 C24.2449832,22.394208 22.956182,23.4450355 20.3221232,23.4450355 C19.5186184,23.4450355 18.8411424,23.3463357 18.2480657,23.179078 C18.1619556,23.3445626 18.081548,23.5130024 18,23.6814421 C18.6603681,23.8794326 19.4193921,24 20.3221232,24 C23.1409482,24 24.5637619,22.8398345 25.9403841,21.7180851" fill="#121311"></path>
                      <path d="M25.6648682,26.7178153 C27.056279,25.6053907 28.3709383,24.5544391 31.0560762,24.5544391 C33.7417955,24.5544391 35.0558733,25.6053907 36.4472841,26.7178153 C37.8509053,27.8402885 39.3022055,29 42.1763147,29 C45.0510054,29 46.5017241,27.8402885 47.9053453,26.7178153 C49.2973375,25.6053907 50.6119968,24.5544391 53.2977161,24.5544391 C55.982854,24.5544391 57.2975133,25.6053907 58.6883426,26.7178153 C58.7918408,26.8005674 58.8959204,26.8833195 59,26.9660716 C58.8918502,26.6362454 58.7767231,26.3093746 58.654037,25.9866414 C57.3562398,24.9652441 55.9194759,24 53.2977161,24 C50.4230254,24 48.9711438,25.1597115 47.5675226,26.2821847 C46.1766933,27.3946093 44.862034,28.4455609 42.1763147,28.4455609 C39.4905954,28.4455609 38.1765175,27.3946093 36.7851068,26.2821847 C35.3814855,25.1597115 33.9301854,24 31.0560762,24 C28.1819669,24 26.7306668,25.1597115 25.3270456,26.2821847 C23.9362162,27.3946093 22.6221384,28.4455609 19.9364191,28.4455609 C18.2571904,28.4455609 17.1140589,28.0347559 16.1535029,27.454309 C16.0982651,27.6351815 16.0505862,27.8196004 16,28.0022461 C16.9977689,28.5797376 18.2095114,29 19.9364191,29 C22.8105283,29 24.261247,27.8402885 25.6648682,26.7178153" fill="#121311"></path>
                      <path d="M26.2276374,31.7180851 C27.592425,30.605792 28.8819298,29.5549645 31.5156904,29.5549645 C34.1500214,29.5549645 35.4389558,30.605792 36.8037434,31.7180851 C38.1805078,32.8398345 39.6040389,34 42.4231552,34 C45.2428418,34 46.6658025,32.8398345 48.042567,31.7180851 C49.4079249,30.605792 50.6974296,29.5549645 53.3317606,29.5549645 C55.9655213,29.5549645 57.255026,30.605792 58.6192433,31.7180851 C59.0601045,32.0768322 59.5060986,32.4397163 60,32.7671395 C59.9834606,32.5319149 59.9697728,32.2955083 59.9463895,32.0626478 C59.6053351,31.8150118 59.2802499,31.5508274 58.9506021,31.2819149 C57.5738376,30.1601655 56.1508769,29 53.3317606,29 C50.512074,29 49.0879726,30.1601655 47.7112082,31.2819149 C46.3469909,32.3947991 45.0574862,33.4456265 42.4231552,33.4456265 C39.7888242,33.4456265 38.4998898,32.3947991 37.1351022,31.2819149 C35.7583378,30.1601655 34.3348067,29 31.5156904,29 C28.6965742,29 27.2730431,30.1601655 25.8962786,31.2819149 C24.5320613,32.3947991 23.2431269,33.4456265 20.608796,33.4456265 C18.448405,33.4456265 17.1931198,32.7381797 16.0587435,31.8699764 C16.0353601,32.0821513 16.0171097,32.2955083 16,32.5088652 C17.1241105,33.3262411 18.4603819,34 20.608796,34 C23.4279122,34 24.850873,32.8398345 26.2276374,31.7180851" fill="#121311"></path>
                      <path d="M26.2288919,35.7180851 C27.5957524,34.605792 28.8872157,33.5549645 31.5249766,33.5549645 C34.1633088,33.5549645 35.4542009,34.605792 36.8210614,35.7180851 C38.1999169,36.8398345 39.6256101,38 42.4490082,38 C45.2729775,38 46.6980995,36.8398345 48.076955,35.7180851 C49.4443867,34.605792 50.73585,33.5549645 53.3741822,33.5549645 C56.0119431,33.5549645 57.3034064,34.605792 58.6696957,35.7180851 C59.0723855,36.0455083 59.480216,36.3758865 59.925174,36.68026 C59.9508776,36.4751773 59.9794371,36.2706856 60,36.0638298 C59.6589989,35.8161939 59.3322775,35.5514184 59.0015578,35.2819149 C57.6227023,34.1601655 56.1975802,33 53.3741822,33 C50.5502129,33 49.1239485,34.1601655 47.7450929,35.2819149 C46.3788036,36.394208 45.0873403,37.4450355 42.4490082,37.4450355 C39.8106761,37.4450355 38.519784,36.394208 37.1529235,35.2819149 C35.7740679,34.1601655 34.3483747,33 31.5249766,33 C28.7015786,33 27.2758853,34.1601655 25.8970298,35.2819149 C24.5307405,36.394208 23.2398484,37.4450355 20.6015163,37.4450355 C18.4098556,37.4450355 17.1480943,36.7192671 16,35.8356974 C16.0222765,36.0845154 16.0519784,36.3315603 16.0822515,36.5780142 C17.1875065,37.3634752 18.5115277,38 20.6015163,38 C23.4249143,38 24.8500363,36.8398345 26.2288919,35.7180851" fill="#121311"></path>
                      <path d="M26.0347941,40.7184064 C27.4013488,39.6053907 28.6925231,38.5544391 31.3296939,38.5544391 C33.9674358,38.5544391 35.2580391,39.6053907 36.6245938,40.7184064 C38.0031408,41.8402885 39.4285151,43 42.2512815,43 C45.074619,43 46.4994221,41.8402885 47.8779692,40.7184064 C49.245095,39.6053907 50.5362693,38.5544391 53.1740112,38.5544391 C55.811182,38.5544391 57.1023563,39.6053907 58.46834,40.7184064 C58.5876922,40.8153446 58.7081866,40.9128739 58.829252,41.009812 C58.8886426,40.8218466 58.9451779,40.6338811 59,40.4441423 C58.9331856,40.3903535 58.8669422,40.3365646 58.8001278,40.2821847 C57.4215808,39.1603026 55.9967776,38 53.1740112,38 C50.3506737,38 48.9247284,39.1603026 47.5461814,40.2821847 C46.1801977,41.3946093 44.8890233,42.4455609 42.2512815,42.4455609 C39.6135396,42.4455609 38.3229364,41.3946093 36.9563816,40.2821847 C35.5778346,39.1603026 34.1524603,38 31.3296939,38 C28.5069275,38 27.0815533,39.1603026 25.7030062,40.2821847 C24.3370226,41.3946093 23.0464193,42.4455609 20.4086774,42.4455609 C18.9341917,42.4455609 17.8811508,42.1169169 17,41.6328171 C17.0868016,41.885211 17.1815982,42.1334673 17.2775368,42.3817236 C18.1141447,42.7546991 19.1129346,43 20.4086774,43 C23.2314438,43 24.656247,41.8402885 26.0347941,40.7184064" fill="#121311"></path>
                      <path d="M25.2551204,45.7178153 C26.6296386,44.6053907 27.9283371,43.5544391 30.5808758,43.5544391 C33.2339888,43.5544391 34.532113,44.6053907 35.9066312,45.7178153 C37.2932116,46.8396974 38.7268921,48 41.5661079,48 C44.4058981,48 45.8390042,46.8396974 47.2255846,45.7178153 C48.6006772,44.6053907 49.8993757,43.5544391 52.5524888,43.5544391 C54.489336,43.5544391 55.7030246,44.1159712 56.7524374,44.8512827 C56.8374473,44.6869606 56.9190108,44.5208654 57,44.354179 C55.9069335,43.5999527 54.5938752,43 52.5524888,43 C49.7126986,43 48.2784437,44.1597115 46.8918633,45.2821847 C45.5179195,46.3946093 44.2192209,47.4449699 41.5661079,47.4449699 C38.9129948,47.4449699 37.6148707,46.3946093 36.2403525,45.2821847 C34.8537721,44.1597115 33.4200916,43 30.5808758,43 C27.74166,43 26.3079795,44.1597115 24.9213991,45.2821847 C23.5474553,46.3946093 22.2493311,47.4449699 19.5962181,47.4449699 C19.3888629,47.4449699 19.1918467,47.4366946 19,47.4242818 C19.1332588,47.6163849 19.2670919,47.8078969 19.4060946,47.9952713 C19.469852,47.9964535 19.5307375,48 19.5962181,48 C22.4354339,48 23.86854,46.8396974 25.2551204,45.7178153" fill="#121311"></path>
                      <path d="M30.8694258,47.5549645 C33.5176028,47.5549645 34.8133118,48.605792 36.1852728,49.7180851 C37.5692735,50.8398345 39.0002867,52 41.8342202,52 C44.668727,52 46.0991669,50.8398345 47.4831676,49.7180851 C48.8557019,48.605792 50.1519842,47.5549645 52.8001612,47.5549645 C53.4978948,47.5549645 54.0998835,47.6294326 54.6365135,47.7576832 C54.7597778,47.6004728 54.8807489,47.4408983 55,47.2807329 C54.3670519,47.105792 53.6469587,47 52.8001612,47 C49.9656544,47 48.5340679,48.1601655 47.1500672,49.2819149 C45.7786796,50.394208 44.4823972,51.4456265 41.8342202,51.4456265 C39.1860432,51.4456265 37.8903341,50.394208 36.5183732,49.2819149 C35.1343725,48.1601655 33.7033593,47 30.8694258,47 C28.0354923,47 26.6044791,48.1601655 25.2204784,49.2819149 C24.5238914,49.8475177 23.8450775,50.3959811 23,50.7996454 C23.1490639,50.9308511 23.2992744,51.0602837 23.4512049,51.1873522 C24.2532832,50.7695035 24.9091642,50.2405437 25.5535788,49.7180851 C26.9255397,48.605792 28.2218221,47.5549645 30.8694258,47.5549645" fill="#121311"></path>
                      <path d="M50,53 C49.2141939,53.2601381 48.5867832,53.622088 48,54 C48.690666,53.6980155 49.3592183,53.3654012 50,53" fill="#121311"></path>
                      <path d="M35.9277862,54.4503064 C36.7122566,55.0205169 37.5111367,55.6013856 38.5688172,56 C39.050105,55.9717559 39.5273581,55.9280576 40,55.8715694 C38.3561283,55.575806 37.3307258,54.8339995 36.2626703,54.057554 C34.8712586,53.0460965 33.4325827,52 30.583474,52 C28.4600436,52 27.1205072,52.5808686 26,53.2960298 C26.1740706,53.3887557 26.346412,53.484146 26.5233645,53.5726086 C27.5424266,52.9576339 28.7349829,52.5003997 30.583474,52.5003997 C33.2458314,52.5003997 34.5484787,53.4473754 35.9277862,54.4503064" fill="#121311"></path>
                  </g>
              </g>
          </g>
      </svg>
      <Reward ref={canvasInput} type='emoji' config = {{"emoji": IceCreamSet(), "elementCount": 1, "spread": 100, "decay": 0.91, "elementSize": 50}}></Reward>
    </div>
  )
}