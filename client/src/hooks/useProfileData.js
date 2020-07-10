import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useProfileData = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    email: '',
    name: '',
    location: '',
    darkMode: '',
  });
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    setProfileData({
      email: user.email,
      name: user.profile.name,
      location: user.profile.location,
      darkMode: user.profile.darkMode,
    });
    setLoading(false);
  }, [
    user.profile.location,
    user.profile.name,
    user.profile.darkMode,
    user.email,
  ]);
  return [loading, profileData];
};
