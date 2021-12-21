import React, { useState } from 'react'
import "./Login.scss"
import appstoreBtn from '../img/appstoreBtn.png'
import googleplayBtn from '../img/googleplayBtn.png'
import signUpMajor from '../img/signUpMajor.png'
import { Link, useNavigate } from 'react-router-dom'
import { asyncLogin, userLogining } from '../features/profile/profileSlice'
import { useDispatch } from 'react-redux'

export const Login = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = 
    [userEmail, userPassword].every(Boolean) && addRequestStatus === 'idle'
  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onLoginClick = () => {
    if (canSave) {
      setAddRequestStatus('pending')
      console.log('pending')
      dispatch(asyncLogin({ 
        user_email: userEmail,
        user_password: userPassword
      })).unwrap()
      .then((originalPromiseResult) => {
        console.log('idle')
        // console.log(originalPromiseResult)
        setAddRequestStatus('idle')
        alert('登入成功')
        dispatch(userLogining(originalPromiseResult))
        const userNav = '/' + originalPromiseResult.fullname
        navigate(userNav)
      })
      .catch((err) => {
        console.log('idle')
        console.log('帳號或密碼錯誤')
        setAddRequestStatus('idle')
        alert('帳號或密碼錯誤')
        console.error('Failed to login: ', err)
      })
    }
  }

  const onUserEmailChange = (e) => setUserEmail(e.target.value)
  const onUserPassword = (e) => setUserPassword(e.target.value)

  return(
    <div class="login">
      <div class="loginBox"><img class="img" alt="" src=""/>
        <div class="loginMajor">
          <img alt="" src={signUpMajor}></img>
        </div>
        <div class="loginInputBox">
          <div class="inputBox">
            <div class="loginLogo">
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt=""/>
            </div>
            <input id="userEmail" class="userEmail" placeholder="手機號碼、用戶名稱或電子郵件地址" onChange={onUserEmailChange}/>
            <input id="userPassword" class="userPassword" placeholder="密碼" type="password" onChange={onUserPassword}/>
            <button class="loginBtn" onClick={onLoginClick} disabled={!canSave}>登入</button>
          </div>
          <div class="loginBox"> 
            <p>沒有帳號嗎？</p>
            <Link to={`/signUp`}>
              <span>註冊</span>
            </Link>
          </div>
          <p class="downloadBtnsScript">下載應用程式。</p>
          <div class="downloadBtns">
            <img class="appstoreDownload" src={appstoreBtn} alt=""/>
            <img class="googleplayDownload" src={googleplayBtn} alt=""/>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="refs">
          <div class="ref">Meta</div>
          <div class="ref">關於</div>
          <div class="ref">部落格</div>
          <div class="ref">工作機會</div>
          <div class="ref">使用說明</div>
          <div class="ref">API</div>
          <div class="ref">隱私</div>
          <div class="ref">使用條款</div>
          <div class="ref">熱門帳號</div>
          <div class="ref">主題標籤</div>
          <div class="ref">地點</div>
          <div class="ref">instagram Lite</div>
        </div>
        <div class="copyrights">
          <div class="language">中文（台灣）</div>
          <div class="cr">© 2021Instagram from Meta</div>
        </div>
      </div>
    </div>
  )
}