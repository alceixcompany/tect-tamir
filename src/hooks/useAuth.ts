import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkAuthState, logoutUser, checkDatabaseAdmins, changePassword, clearError, clearSuccessMessage } from '@/store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isAuthenticated, hasDatabaseAdmins, error, successMessage } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Component mount'ta veritabanında admin var mı kontrol et
    dispatch(checkDatabaseAdmins());
    
    // Eğer localStorage'dan kullanıcı yüklenmemişse auth state'i kontrol et
    if (!user) {
      dispatch(checkAuthState());
    }
  }, [dispatch, user]);

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Çıkış yapılırken bir hata oluştu';
      return { success: false, error: errorMessage };
    }
  };

  const changeUserPassword = async (currentPassword: string, newPassword: string) => {
    try {
      // Önce eski mesajları temizle
      dispatch(clearError());
      dispatch(clearSuccessMessage());
      
      await dispatch(changePassword({ currentPassword, newPassword })).unwrap();
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Şifre değiştirilirken bir hata oluştu';
      return { success: false, error: errorMessage };
    }
  };

  return {
    user,
    loading: isLoading,
    isAuthenticated,
    hasDatabaseAdmins,
    error,
    successMessage,
    logout,
    changePassword: changeUserPassword,
  };
};
