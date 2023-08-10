import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdNotificationsNone } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import './navigation.scss'
import { getMyNotifications, newMessage } from '../../redux/slices/notificationSlice';
import { socket } from '../../utils/io';

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(state => state.user)
  const { notifications } = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(getMyNotifications())

    socket.on('message', data => {
      console.log(data)
      dispatch(newMessage(data))
    })
  }, [socket])

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="notification" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    { user && <div className="notification__toggle"><MdNotificationsNone size={'30px'}></MdNotificationsNone> </div> }
      {
        isOpen && (
          <ul className='notification__list'>
            {
              notifications.length > 0
                ? (notifications.map((n, i) => (
                  <li key={i} className='notification__item'>{ n.enMessage }</li>
                )))
                : <span style={{ textAlign: 'center' }}>It's empty here</span>
            }
          </ul>
        ) 
      }
    </div>
  )
}

export default React.memo(Notification)
