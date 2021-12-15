import React, { useState } from 'react'
import "./SignUp.scss"
import appstoreBtn from '../img/appstoreBtn.png'
import googleplayBtn from '../img/googleplayBtn.png'
import signUpMajor from '../img/signUpMajor.png'
import { Link, useNavigate } from 'react-router-dom'
import { asyncSignUp } from '../features/profile/profileSlice'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

export const SignUp = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userUserName, setUserUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userId, setUserId] = useState(nanoid())
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
    [userEmail, userFullName, userUserName, userPassword].every(Boolean) && addRequestStatus === 'idle'
    
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onSignUpClick = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        console.log('pending')
        dispatch(asyncSignUp({ 
          id: userId,
          fullname: userFullName,
          username: userUserName,
          user_email: userEmail,
          user_password: userPassword
        })).unwrap()
        setUserEmail('')
        setUserFullName('')
        setUserUserName('')
        setUserPassword('')
      } catch (err) {
        console.error('Failed to signup: ', err)
      } finally {
        console.log('idle')
        setAddRequestStatus('idle')
        alert("註冊成功")
        navigate('/login')
      }
    }
  }

  const onUserEmailChange = (e) => setUserEmail(e.target.value)
  const onUserFullNameChange = (e) => setUserFullName(e.target.value)
  const onUserUserNameChange = (e) => setUserUserName(e.target.value)
  const onUserPassword = (e) => setUserPassword(e.target.value)

  return(
    <div class="signUp"><img class="img" alt="" src=""/>
      <div class="signUpMajor">
        <img alt="" src={signUpMajor}></img>
      </div>
      <div class="signUpInputBox">
        <div class="inputBox">
          <div class="logo">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt=""/>
          </div>
          <div class="note">註冊即可查看朋友的相片和影片</div>
          <input class="userEmail" placeholder="手機號碼、用戶名稱或電子郵件地址" onChange={onUserEmailChange}/>
          <input class="userFullName" placeholder="全名" onChange={onUserFullNameChange}/>
          <input class="userUserName" placeholder="用戶名稱" onChange={onUserUserNameChange}/>
          <input class="userPassword" placeholder="密碼" onChange={onUserPassword}/>
          <button class="signUpBtn" onClick={onSignUpClick} disabled={!canSave}>註冊</button>
          <div class="policy"> <span>註冊即表示你同意我們的 </span><span class="bold">服務條款</span><span> 、 </span><span class="bold">資料政策 </span><span>和 </span><span class="bold">Cookie 政策 。</span></div>
        </div>
        <div class="signUpBox"> 
          <p>已經有帳號嗎？</p>
          <Link to={`/login`}>
            <span>登入</span>
          </Link>
        </div>
        <p class="downloadBtnsScript">下載應用程式。</p>
        <div class="downloadBtns">
          <img class="appstoreDownload" src={appstoreBtn} alt=""/>
          <img class="googleplayDownload" src={googleplayBtn} alt=""/>
        </div>
      </div>
    </div>
  )
}