import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import './AddPost.scss'
import DelayLink from './DelayLink'

import { addNewPost } from '../features/posts/postsSlice'

export const AddPost = () => {
  const [profilePicUrl, setProfilePicUrl] = useState('https://i1.sndcdn.com/avatars-UDieApsMXg3J8MDl-yiKcHQ-t500x500.jpg');
  const [fullName, setFullName] = useState('alecbenjamin');

  const [img, setImg] = useState('')
  const [title, setTitle] = useState('')
  const [place, setPlace] = useState('')
  const [userId, setUserId] = useState(nanoid())
  const [postId, setPostId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const onAddPostClicked = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]))
    document.getElementById("uploadImg").value = null
    document.getElementById("uploadBox").style.display = "none"
    document.getElementById("wrapImg").style.display = "block"
    document.getElementById("cancelUploadedImgBtn").style.display = "block"
    document.getElementById("shareBtn").style.display = "block"
    document.getElementById("addBoxBottom").classList.add("addBoxBtmAf")
    document.getElementById("addNewPostBox").style.width = "804px"
    document.getElementById("addBoxBtmRight").style.display = "flex"
  }
  const cancelUploadedImg = () => {
    setImg('')
    document.getElementById("uploadBox").style.display = "flex"
    document.getElementById("wrapImg").style.display = "none"
    document.getElementById("cancelUploadedImgBtn").style.display = "none"
    document.getElementById("shareBtn").style.display = "none"
    document.getElementById("addBoxBottom").classList.remove("addBoxBtmAf")
    document.getElementById("addNewPostBox").style.width = "504px"
    document.getElementById("addBoxBtmRight").style.display = "none"
  }

  const getCurrentDate = (separator='-') => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`.concat(" ", time)
  }

  const onShareClick = () => {
    if (addRequestStatus === 'idle') {
      setAddRequestStatus('pending')
      const date = getCurrentDate()
      dispatch(addNewPost({ 
        id: postId,
        fullname: fullName,
        title: title,
        place: place,
        date: date,
        img_url: img
      })).unwrap()
      .then((originalPromiseResult) => {
        setTitle('')
        setPlace('')
        setUserId('')
        setPostId('')
        // setFullName('')
        console.log('idle')
        setAddRequestStatus('idle')
      })
      .catch((err) => {
        console.error('Failed to save the post: ', err)
      })
    }
  }
  const onTitleChange = (e) => setTitle(e.target.value)
  const onPlaceChange = (e) => setPlace(e.target.value)

  return(
    <div class="addPost">
      <div class="addPostBackground">
        <div class="addNewPostBox" id="addNewPostBox">
          <div class="addBoxTop">
            <svg id="cancelUploadedImgBtn" onClick={cancelUploadedImg} aria-label="返回" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" x1="1.23" x2="23.233" y1="12.004" y2="12.004"></line><polyline fill="none" points="8.919 3.817 0.733 12.004 8.919 20.19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline></svg>
            <span>建立新貼文</span>
            <DelayLink to={'/'} delay={1000}>
              <button id="shareBtn" onClick={onShareClick}>分享</button>
            </DelayLink>
          </div>
          <div class="addBoxBottom" id="addBoxBottom">
            <div class="addBoxBtmLeft">
              <div id="wrapImg">
                <div class="img">
                  <img src={img} alt=""/>
                </div>
              </div>
              <div id="uploadBox">
                <svg class="_8-yf5" aria-label="表示圖像或影片等影音素材的圖示" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96">
                  <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                  <path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                  <path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                </svg>
                <h2>上傳相片</h2>
                <label for="uploadImg" class="uploadImgBtn">選擇圖片
                  <input id="uploadImg" type="file" onChange={onAddPostClicked}/>
                </label>
              </div>
            </div>
            <div class="addBoxBtmRight" id="addBoxBtmRight">
              <div class="addBoxProfile">
                <img class="addBoxProfile" src={profilePicUrl} alt=""></img>
                <h2>{fullName}</h2>
              </div> 
              <div class="addBoxTitle">
                <textarea placeholder="撰寫說明文字......" onChange={onTitleChange}></textarea>
              </div>
              <div class="inputPlace">
                <input type="text" placeholder="新增地點" onChange={onPlaceChange}/>
                <svg aria-label="新增地點" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 48 48" width="16"><path clip-rule="evenodd" d="M24 22.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" fill-rule="evenodd"></path><path d="M24 3c8.8 0 16 7.1 16 15.9 0 9.6-9.8 20.5-16 25.8-6.2-5.3-16-16.2-16-25.8C8 10.1 15.2 3 24 3m0-3C13.5 0 5 8.5 5 18.9 5 31.3 18.4 44 22.7 47.5c.4.3.8.5 1.3.5s.9-.2 1.3-.5C29.6 44 43 31.3 43 18.9 43 8.5 34.5 0 24 0z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}