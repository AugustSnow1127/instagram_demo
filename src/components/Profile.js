import "./Profile.scss"
import axios from "axios";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Posts } from './Posts.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Profile() {
  const requestForProfile = axios.get('http://localhost:3000/profile');
  const requestForPosts = axios.get('http://localhost:3000/posts');

  // profile state
  const [fullName, setFullName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [followerCount, setFollowerCount] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);
  const [biography, setBiography] = useState(null);
  const [career, setCareer] = useState(null);

  // posts state
  const [postsData, setPostsData] = useState([]);
  // const [postsList, setPostsList] = useState(null);
  const [postsNum, setPostsNum] = useState(0);
  const postsRef = useRef(postsData);
  
  const fetchData = useCallback(() => {
    axios
      .all([requestForProfile, requestForPosts])
        .then(
          axios.spread((...res) => {
            // set profile data
            setFullName(res[0].data[0].fullname);
            setUserName(res[0].data[0].username);
            setProfilePicUrl(res[0].data[0].profile_pic_url);
            setBiography(res[0].data[0].biography);
            setCareer(res[0].data[0].career);
            if (res[0].data[0].follower_count > 10000) {
              let ts_follower_count = res[0].data[0].follower_count / 10000;
              setFollowerCount(ts_follower_count + "萬");
            }else {
              setFollowerCount(res[0].data[0].follower_count);
            }
            if (res[0].data[0].following_count > 10000) {
              let ts_following_count = res[0].data[0].following_count / 10000;
              setFollowingCount(ts_following_count + "萬");
            }else {
              setFollowingCount(res[0].data[0].following_count);
            }

            // set post data
            // console.log(res[1].data);
            postsRef.current = res[1].data;
            // console.log(postsRef.current);
            setPostsNum(postsRef.current.length);
            // if (postsRef.current) {
            //   console.log(postsRef.current[0].img_url);
            //   setPostsList(postsRef.current.map(post => (
            //     <Posts 
            //       id={post.id} 
            //       src={post.img_url}
            //     />
            //   )));
            // }
          })
        ).catch(function (error) {
          console.error(error);
      });
  }, [])

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
    return () => { isMounted = false };
  }, [fetchData]);

  return (
    <div>
      <div class="navbar">
        <div class="mainBar">
          <div class="logo">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt=""/>
          </div>
          <div class="searchBar">搜尋</div>
          <div class="navBtns">
            <svg class="home navBtn" viewBox="0 0 48 48">
              <path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z">
              </path>
            </svg>
            <svg class="msg navBtn" viewBox="0 0 48 48">
              <path d="M36.2 16.7L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.8 10.7c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9l6.8-10.7c.6-1.1-.7-2.2-1.7-1.5zM24 1C11 1 1 10.5 1 23.3 1 30 3.7 35.8 8.2 39.8c.4.3.6.8.6 1.3l.2 4.1c0 1 .9 1.8 1.8 1.8.2 0 .5 0 .7-.2l4.6-2c.2-.1.5-.2.7-.2.2 0 .3 0 .5.1 2.1.6 4.3.9 6.7.9 13 0 23-9.5 23-22.3S37 1 24 1zm0 41.6c-2 0-4-.3-5.9-.8-.4-.1-.8-.2-1.3-.2-.7 0-1.3.1-2 .4l-3 1.3V41c0-1.3-.6-2.5-1.6-3.4C6.2 34 4 28.9 4 23.3 4 12.3 12.6 4 24 4s20 8.3 20 19.3-8.6 19.3-20 19.3z">
              </path>
            </svg>
            <Link to={`/addPost`}>
              <svg class="addPost navBtn" viewBox="0 0 48 48">
                <path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path><path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path><path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z">
                </path>
              </svg>
            </Link>
            <svg class="trend navBtn" viewBox="0 0 48 48">
              <path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fill-rule="evenodd">
              </path>
            </svg>
            <svg class="like navBtn" viewBox="0 0 48 48">
              <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
              </path>
            </svg>
            <Link to={`/signUp`}>
              <img class="profileHeaderInNav navBtn" src={profilePicUrl} alt=""></img>
            </Link>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="contents">
          <div class="profileForPC">
            <div class="profileLeft">
              <img class="profileHeaderInProfile" src={profilePicUrl} alt=""></img>
            </div>
            <div class="profileRight">
              <div class="profileName">
                <h2>{fullName}</h2>
                <div class="followBtn">追蹤</div>
                <div class="extendedFollowBtn">
                  <svg viewBox="0 0 48 48" width="12">
                    <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z">
                    </path>
                  </svg>
                </div>
                <div class="others">...</div>
              </div>
              <div class="profileData">
                <div class="postNum">
                  <span class="statistic">{postsNum}</span>
                  <span> 貼文</span>
                </div>
                <div class="followers">
                  <span class="statistic">{followerCount}</span>
                  <span> 位粉絲</span>
                </div>
                <div class="followings">
                  <span class="statistic">{followingCount}</span>
                  <span> 追蹤中</span>
                </div>
              </div>
              <div class="profileInfo">
                <h1>{userName}</h1>
                <span class="profileCareer">{career}</span>
                <span class="profileDescription">{biography}</span>
              </div>
            </div>
          </div>
          <div class="profileForPhone">
            <div class="profileTop">
              <div class="profileTopLeft">
                <img class="profileHeaderInProfile" src={profilePicUrl} alt=""></img>
              </div>
              <div class="profileTopRight">
                <div class="profileTRT">
                  <h2>{fullName}</h2>
                  <div class="others">...</div>
                </div>
                <div class="profileTRB">
                  <div class="followBtn">追蹤</div>
                  <div class="extendedFollowBtn">
                    <svg viewBox="0 0 48 48" width="12">
                      <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z">
                      </path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="profileBottom">
              <div class="profileInfo">
                <h1>{userName}</h1>
                <span class="profileCareer">{career}</span>
                <span class="profileDescription">{biography}</span>
              </div>
            </div>
            <div class="profileData">
              <div class="postNum">
                <span class="statistic">{postsNum}</span>
                <span> 貼文</span>
              </div>
              <div class="followers">
                <span class="statistic">{followerCount}</span>
                <span> 位粉絲</span>
              </div>
              <div class="followings">
                <span class="statistic">{followingCount}</span>
                <span> 追蹤中</span>
              </div>
            </div>
          </div>
          <div class="highlights"></div>
          <div class="categories">
            <span class="wrapCategories">
              <svg aria-label="" class="_8-yf5 " color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 48 48" width="12"><path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg>
              <span class="mr category">貼文</span>
            </span>
            <span class="wrapCategories">
              <svg aria-label="" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path></svg>
              <span class="mr category">影片</span>
            </span>
            <span class="wrapCategories">
              <svg aria-label="" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 48 48" width="12"><path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path></svg>
              <span class="category">已標注</span>
            </span>
          </div>
          <Posts />
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
  );
}