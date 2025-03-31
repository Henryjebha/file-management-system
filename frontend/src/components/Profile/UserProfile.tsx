import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/user.service';
import { User } from '../../types/user.types';
import AddressList from './AddressList';
import ProfileForm from './ProfileForm';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
      setError('');
    } catch (err) {
      setError('Failed to load user profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleProfileUpdate = () => {
    fetchUserData();
  };

  if (loading) return <div className="text-center py-4">Loading profile...</div>;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!user) return <div className="text-center py-4">No user data found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <ProfileForm 
            user={user} 
            onUpdate={handleProfileUpdate}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Addresses</h2>
          <AddressList 
            addresses={user.addresses || []} 
            onUpdate={handleProfileUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;