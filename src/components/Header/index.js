import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiLogOut } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";
import { PiLightbulbFilamentLight } from "react-icons/pi";
import { GoBell } from "react-icons/go";
import { CiGlobe } from "react-icons/ci";
import { AdminContext } from '@/context/AdminContext';

import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { VscBellDot } from 'react-icons/vsc';

export default function Header() {
  const [canGoBack, setCanGoBack] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCounts, setNotificationCounts] = useState({
    pendingDrivers: 0,
    submittedComplaints: 0,
    pendingTransactions: 0
  });
  const notificationRef = useRef(null);
  const { admin } = useContext(AdminContext);
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
    router.replace('/');
  };
  const fetchNotificationCounts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/admin/getNotificationsForHeader`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      // console.log(data);
      setNotificationCounts({
        pendingDrivers: data.pendingDrivers || 0,
        submittedComplaints: data.submittedComplaints || 0,
        pendingTransactions: data.pendingTransactions || 0
      });
    } catch (error) {
      console.error('Error fetching notification counts:', error);
    }
  };

  useEffect(() => {
    fetchNotificationCounts();

    const interval = setInterval(fetchNotificationCounts, 300000);

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    } else {4

      router.push('/home/overview');
    }
  };

  const handleReload = () => {
    window.location.reload();
  }

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const hasPendingNotifications = notificationCounts.pendingDrivers > 0 || notificationCounts.submittedComplaints > 0 || notificationCounts.pendingTransactions > 0;

  return (
    <header className={styles.header}>
      <div className={`${styles.left} hover:cursor-pointer hover:border`}>
        <button>
          <FiArrowLeft size={24} className={styles.backButton} onClick={handleBack} />
        </button>
      </div>
      <div>
        <h1><b>Rapidx Dashboard</b></h1>
      </div>
      <div className={styles.right}>
        <div className={styles.adminProfile} >
          <h3 className={styles.username}>{admin?.username}</h3>
          {/* <img className={styles.admin_profile_picture} src={admin?.admin_profile_picture} alt="Admin Profile" /> */}
          <Image
            src={admin?.adminProfilePicture || 'https://res.cloudinary.com/dr1b4ezct/image/upload/v1726221792/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector_clnchm.jpg'}
            alt="Admin Profile"
            width={50}
            height={50}
            className={styles.admin_profile_picture}
          />
        </div>

        <div className={styles.icons}>
          <CiGlobe size={22} className={styles.icon} />
          {/* <GoBell size={22} className={`${styles.icon} ${showNotifications ? styles.active : ''}`} onClick={() => setShowNotifications((prev) => !prev)} /> */}
          {hasPendingNotifications ? (
            <VscBellDot
              size={22}
              color="orange"
              className={`${styles.icon} ${showNotifications ? styles.active : ''}`}
              onClick={() => setShowNotifications((prev) => !prev)}
            />
          ) : (
            <GoBell
              size={22}
              className={`${styles.icon} ${showNotifications ? styles.active : ''}`}
              onClick={() => setShowNotifications((prev) => !prev)}
            />
          )}
          {/* <PiLightbulbFilamentLight size={22} className={styles.icon} /> */} 
          <TfiReload size={18} className={styles.icon} onClick={handleReload} />
          <FiLogOut size={22} className={styles.logoutIcon} onClick={handleLogout} />
        </div>
        {showNotifications && (
          <div ref={notificationRef} className={styles.notificationDropdown}>
            <h4>Notifications</h4>
            <ul>
              <li><Link href="/drivers/pending-verification"> Pending Drivers: {notificationCounts.pendingDrivers}</Link></li>
              <li><Link href="/complaints">Unreviewed Complaints: {notificationCounts.submittedComplaints}</Link></li>
              <li><Link href="/accounting/withdrawalRequests">Pending Transactions: {notificationCounts.pendingTransactions}</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}