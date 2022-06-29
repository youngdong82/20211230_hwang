import React, { useRef, useState } from 'react';
import EachDetail from '../components/EachDetail';
import EterZero from '../components/eters/EterZero';
import EterOne from '../components/eters/EterOne';
import EterTwo from '../components/eters/EterTwo';
import EterThree from '../components/eters/EterThree';
import EterFour from '../components/eters/EterFour';
import EterFive from '../components/eters/EterFive';
import EterSix from '../components/eters/EterSix';
import EterSeven from '../components/eters/EterSeven';
import EterEight from '../components/eters/EterEight';
import EterNine from '../components/eters/EterNine';
import EterTen from '../components/eters/EterTen';
import EterEleven from '../components/eters/EterEleven';
import EterTweleve from '../components/eters/EterTweleve';
import Spread from '../components/Spread';
import SwitchTakeSaveBtn from '../components/SwitchTakeSaveBtn';
import ClickedReck from '../components/ClickedReck';

//redux
import { connect } from 'react-redux';
import { actionCreators } from '../store.js';

// CSS
import "../style/web/route/eternal.css";
import "../style/mobile/route/eternal_m.css";
import "../style/web/component/eachEter.css";
import "../style/mobile/component/eachEter_m.css";

// 함수_리펙토링
import { useHorizontalScroll } from "../function/scroll.js";
import ToggleDetail from '../function/ToggleDetail.js';
import TakeScreenshot from '../function/TakeScreenshot.js';

//data
import Exhi_RECK from '../data/Exhi_RECK';

const Eternal = ({addToSavedReck,deleteToSavedReck}) =>  {
  // from ClickedReck to each grid
  const [dataTrans, setDataTrans] = useState(null);

  const detectMob = () => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }
  const isMobile = detectMob();
  // redux와 통신
  const saveOrRemove = (e) => {
    const {target:{id,className,src}} = e;
    if (className === 'dragablImg'){
      addToSavedReck(id,src)
    } else{
      const imgId_redux = id.split('/')[0]
      deleteToSavedReck(imgId_redux)
    }
  }
  
  const [onSpread, setOnSpread] = useState([]);

  const ref = useRef(null)
  const screenshotRef = useRef(null);
  const scrollRef = useHorizontalScroll();
  
  const showSpread = () => {
    const spread_comp = document.querySelector('#eter_spread');
    const reck_comp = document.querySelector('#eter_reck');

    if (spread_comp.className === "eter_spreadH"){
      spread_comp.className = "section_reck_eter"
      reck_comp.className = "eter_spreadH"
    } else{
      spread_comp.className = "eter_spreadH"
      reck_comp.className = "section_reck_eter"
    };
  }
  //스크린 샷 찍기
  // TakeScreenshot 사용
  // takeScreenshotPack[0]은 현재 찍은 screenshot
  // takeScreenshotPack[1]은 현재 들어있는 screenshot들
  // takeScreenshotPack[2]은 screenshot 찍는 함수
  const takeScreenshotPack = TakeScreenshot(ref,screenshotRef);

  // ToggleDetail 사용
  // shiftThumbPack[0]은 현재 detail
  // shiftThumbPack[1]은 detail 바꾸는 함수
  const toggleDetailPack = ToggleDetail();

  // Exhi_RECK에서 data 받아오기
  const detailDeck = Exhi_RECK(2)

  return (
    <section className="section">
      <div className="section_title">
        <h1>Hwang's Manual<span> of Eternal Classics</span></h1>
        <button onClick={toggleDetailPack[1]}><i className="fa-solid fa-info" /></button>
      </div>
      <div id="eter_spread" className="eter_spreadH" ref={ref} >
        <Spread 
          saveOrRemove={saveOrRemove} 
          onSpread={onSpread} 
          setOnSpread={setOnSpread} 
          screenshotRef={screenshotRef} 
          isMobile={isMobile} 
          dataTrans={dataTrans}
          setDataTrans={setDataTrans}
          />
      </div>
      <div id="eter_reck" className="section_reck_eter" ref={scrollRef}>
        <EterZero saveOrRemove={saveOrRemove}/>
        <EterFour saveOrRemove={saveOrRemove}/>
        <EterOne saveOrRemove={saveOrRemove}/>
        <EterTwo saveOrRemove={saveOrRemove}/>
        <EterThree saveOrRemove={saveOrRemove}/>
        <EterFive saveOrRemove={saveOrRemove}/>
        <EterSix saveOrRemove={saveOrRemove}/>
        <EterSeven saveOrRemove={saveOrRemove}/>
        <EterEight saveOrRemove={saveOrRemove}/>
        <EterNine saveOrRemove={saveOrRemove}/>
        <EterTen saveOrRemove={saveOrRemove}/>
        <EterEleven saveOrRemove={saveOrRemove}/>
        <EterTweleve saveOrRemove={saveOrRemove}/>
      </div>
      <SwitchTakeSaveBtn 
          showSpread={showSpread} 
          screenshot={takeScreenshotPack[0]}
          takeAndSave = {takeScreenshotPack[1]}
          preventEmpty={takeScreenshotPack[2]}/>
      {/* <Screenshots 
          screenshotReck={takeScreenshotPack[1]} 
          toLoad={saveScreenshotPack[0]} 
          setImgToLoad={saveScreenshotPack[1]} 
          screenshot_ref={screenshot_ref} /> */}
      <ClickedReck
        saveOrRemove={saveOrRemove}
        onSpread={onSpread} 
        isMobile={isMobile}
        setDataTrans={setDataTrans} />
      {
      toggleDetailPack[0] ? <EachDetail detailDeck={detailDeck} showDetail={toggleDetailPack[1]} /> : (<></>)
      }
    </section>
  );
};

const mapStateToProps = (state,ownProps) => {
  return {savedReck_rdx: state}
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    addToSavedReck: (imgId,src) => dispatch(actionCreators.addImg(imgId,src)),
    deleteToSavedReck: (imgId) => dispatch(actionCreators.deleteImg(imgId)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Eternal);

