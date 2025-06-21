import React, { useContext, useState } from 'react'
import './AsideBar.css'
import { FullScreenContext } from '../../ContextAPI/ToggleFullScreenContext'
import { ThemeContext } from '../../ContextAPI/ThemeContext';
import { LanguageContext } from '../../ContextAPI/LanguageContext';

export default function AsideBar() {
  const {isFullScreen,setFullScreen, fontSize, setFontSize,miniMap, toggleMiniMap,isSettingOpen, setSettingToOpen} = useContext(FullScreenContext);
  
  const {theme, setTheme, themeCoosed, setThemeCossed} = useContext(ThemeContext);

  const {languageChoosed , setLanguageChoosed, totalLanguage,} = useContext(LanguageContext);

  const toggleFullScreen = () => {
    const editorContainer = document.querySelector('.editor-main-div');
    
    if (!document.fullscreenElement) {
      editorContainer?.requestFullscreen().then(() => {
        setFullScreen(true);
      }).catch((err) => {
        console.error('Error entering fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setFullScreen(false);
      }).catch((err) => {
        console.error('Error exiting fullscreen:', err);
      });
    }
  };

  const handleSetting = () => {
    setSettingToOpen(!isSettingOpen);
  }

  const handleDecSize = () =>{
    setFontSize(prev => (prev === 6 ? prev : prev - 1));
  }

  const handleIncSize = () => {
    setFontSize(prev => (prev < 40 ? prev + 1 : prev));
  }

  return (
    <>
      <aside className='aside-bar'
      >
        <button
          onClick={toggleFullScreen}
          title="Toggle Full Screen"
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--logo-color)"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>
        </button>

        <button
          onClick={handleSetting}
          title="Change Settings"
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px"  viewBox="0 -960 960 960" width="24px" fill="var(--logo-color)"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg>
        </button>


        {/* Format Size Btn */}
        <button
          onClick={handleSetting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--logo-color)"><path d="M560-160v-520H360v-120h520v120H680v520H560Zm-360 0v-320H80v-120h360v120H320v320H200Z"/></svg>
        </button>

        <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--logo-color)"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg></button>
      </aside>

      {
        isSettingOpen && (<>
          <div className='setting_div_right'
            style={{
          height: isFullScreen ? '100vh' : '88vh',
          top: isFullScreen && '0px',
        }}
          >
            <div className='setting_and_close_div'>
              <button
                className='close_setting_btn'
                onClick={()=>setSettingToOpen(false)}
              >
                <svg 
                  className='close_setting_btn_svg'
                  xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="var(--logo-color)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
              </button>
              
              <h1>Setting</h1>
            </div>
              <div className='theme_div'>
                <h3>Editor Theme:</h3>
                <select 
                  className='select-setting-right'
                  value={themeCoosed}
                  onChange={(e) => setThemeCossed(e.target.value)}
                >
                  {theme.map((item)=> {
                    return (
                      <option 
                        key={item} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
              </div>
              
              <div
                className='language_div'
              >
              <h3>Language Syntax:</h3>
              <select 
                className='select-setting-right'
                value={languageChoosed.language}
                onChange={(e) => {
                  // Find the selected language object in totalLanguage array
                  const selectedLang = totalLanguage.find(item => item.language === e.target.value);
                  if(selectedLang){
                    setLanguageChoosed(selectedLang);
                  }
                }}
              >
                  {
                    totalLanguage.map((item)=>{
                      return (
                        <option
                          key={item.language}
                        >
                          {item.language}
                        </option>
                      )
                    })
                  }
              </select> 
              
              </div>

              <div className={'font-size-div'}>
                <h3>Font Size: </h3>
                <div className='font_size_inner_div'>
                  <p
                  className='hover_pointer'
                  onClick={handleDecSize}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-440v-80h560v80H200Z"/></svg>
                  </p>
                  <p>{fontSize}</p>
                  <p
                    onClick={handleIncSize}
                    className='hover_pointer'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                  </p>
                </div>
              </div>
              
              <div className='mini_map_div'>
                  <h3>Mini Map: </h3>
                  <div
                    onClick={()=>toggleMiniMap(!miniMap)}
                    className='hover_pointer'
                  >
                  {
                    miniMap ? (
                      <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill='var(--logo-color)'><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z"/></svg>
                    ) :
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill='var(--logo-color)'><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z"/></svg>
                  }
                  </div>
              </div>
          </div>
        </>)
      }
    </>
  )
}
