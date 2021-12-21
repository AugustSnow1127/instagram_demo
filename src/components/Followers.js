import React, { useState } from 'react'
import './Followers.scss'
import { Link, useNavigate } from 'react-router-dom'
import fakeMainPage from '../img/fakeMainPage.png'

export const Followers = () => {
  const navigate = useNavigate();
  const onGoBackwardClick = () => navigate(-1)

  return(
    <div>
      <img class="fakeMainPage" src={fakeMainPage} alt=""></img>
      <div class="fansBg">
        <div class="fans">
          <div class="fansTop">
            <h1>粉絲</h1>
            <svg class="goBackward" onClick={onGoBackwardClick} aria-label="關閉" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
              <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line>
              <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line>
            </svg>
          </div>
          <div class="fansBtm">
            <div class="fan">
              <div class="fanLeft">
                <div class="fanHeader"><img src="https://scontent.ftpe1-3.fna.fbcdn.net/v/t1.6435-9/166409312_292147312476330_2278325417504080769_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=-vA7z7dJX7YAX-NH9zK&_nc_ht=scontent.ftpe1-3.fna&oh=00_AT_Clj6VsmCGUDlxfaKVpea8jUF8l8WtdKHr5VNE71h3NQ&oe=61E20653" alt=""/></div>
              </div>
              <div class="fanRight">
                <Link to='/ethanbortnick'>
                  <div class="fanFullName">ethanbortnick</div>
                </Link>
                <div class="fanUserName">e T H A n</div>
                <button class="cancelSub">移除</button>
              </div>
            </div>
            <div class="fan">
              <div class="fanLeft">
                <div class="fanHeader"><img src="https://yt3.ggpht.com/baBykwzpMuSNU51c1FQc2bhJnmSxo2py8VevBmZJQ8iGsg2mx0xYcs23g4sVglKeYB2467Q1TQ=s900-c-k-c0x00ffffff-no-rj" alt=""/></div>
              </div>
              <div class="fanRight">
                <Link to='/alecbenjamin'>
                  <div class="fanFullName">alecbenjamin</div>
                </Link>
                <div class="fanUserName">Alec Benjamin</div>
                <button class="cancelSub">移除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}