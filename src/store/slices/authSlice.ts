import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  isStaticAdmin?: boolean;
  isDatabaseAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated: boolean;
  hasDatabaseAdmins: boolean;
}

// Statik admin bilgileri
const STATIC_ADMIN = {
  email: 'demirbas@admin.com',
  password: 'Demirbas123',
  uid: 'static-admin-uid',
  displayName: 'Demirbaş Admin'
};

// LocalStorage key for auth persistence
const AUTH_STORAGE_KEY = 'demirbas_auth_state';

// Helper functions for localStorage
const saveAuthToStorage = (user: User | null) => {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user,
        timestamp: new Date().toISOString()
      }));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error saving auth to localStorage:', error);
  }
};

const loadAuthFromStorage = (): User | null => {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Check if stored data is not older than 7 days
      const storedDate = new Date(data.timestamp);
      const now = new Date();
      const daysDiff = (now.getTime() - storedDate.getTime()) / (1000 * 3600 * 24);
      
      if (daysDiff <= 7) {
        return data.user;
      } else {
        // Clear expired data
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  } catch (error) {
    console.error('Error loading auth from localStorage:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
  return null;
};

const initialState: AuthState = {
  user: loadAuthFromStorage(), // Load from localStorage on init
  isLoading: false,
  error: null,
  successMessage: null,
  isAuthenticated: !!loadAuthFromStorage(), // Set based on stored user
  hasDatabaseAdmins: false,
};

// Veritabanında admin var mı kontrol et
export const checkDatabaseAdmins = createAsyncThunk(
  'auth/checkDatabaseAdmins',
  async (_, { rejectWithValue }) => {
    try {
      const adminsRef = collection(db, 'admins');
      const q = query(adminsRef, where('isAdmin', '==', true));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size > 0;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Statik admin ile giriş
export const loginWithStaticAdmin = createAsyncThunk(
  'auth/loginWithStaticAdmin',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Statik admin bilgilerini kontrol et
      if (email === STATIC_ADMIN.email && password === STATIC_ADMIN.password) {
        const userData: User = {
          uid: STATIC_ADMIN.uid,
          email: STATIC_ADMIN.email,
          displayName: STATIC_ADMIN.displayName,
          isStaticAdmin: true,
          isDatabaseAdmin: false,
        };
        return userData;
      } else {
        throw new Error('Geçersiz e-posta veya şifre');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Veritabanı admin ile giriş
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Kullanıcının admin olup olmadığını kontrol et
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (!adminDoc.exists() || !adminDoc.data()?.isAdmin) {
        throw new Error('Bu kullanıcının admin yetkisi bulunmamaktadır.');
      }

      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        isStaticAdmin: false,
        isDatabaseAdmin: true,
      };
      
      return userData;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Yeni admin oluştur
export const createAdmin = createAsyncThunk(
  'auth/createAdmin',
  async ({ email, password, displayName }: { email: string; password: string; displayName: string }, { rejectWithValue }) => {
    try {
      // Firebase Auth ile kullanıcı oluştur
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore'da admin bilgilerini kaydet
      await setDoc(doc(db, 'admins', user.uid), {
        email: user.email,
        displayName: displayName,
        isAdmin: true,
        createdAt: new Date().toISOString(),
        createdBy: 'static-admin',
      });

      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        isStaticAdmin: false,
        isDatabaseAdmin: true,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Şifre değiştirme
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const user = state.auth.user;

      if (!user) {
        throw new Error('Kullanıcı bulunamadı');
      }

      // Statik admin için şifre değiştirme desteklenmiyor
      if (user.isStaticAdmin) {
        throw new Error('Statik admin için şifre değiştirme desteklenmiyor');
      }

      // Veritabanı admin için şifre değiştirme
      if (user.isDatabaseAdmin) {
        const { updatePassword, reauthenticateWithCredential, EmailAuthProvider } = await import('firebase/auth');
        const { updateDoc, doc } = await import('firebase/firestore');
        
        // Önce kullanıcıyı yeniden doğrula
        const credential = EmailAuthProvider.credential(user.email || '', currentPassword);
        await reauthenticateWithCredential(auth.currentUser!, credential);
        
        // Firebase Auth'da şifreyi güncelle
        await updatePassword(auth.currentUser!, newPassword);
        
        // Firestore'da güncelleme tarihi kaydet
        await updateDoc(doc(db, 'admins', user.uid), {
          passwordUpdatedAt: new Date().toISOString(),
        });

        return { success: true };
      }

      throw new Error('Desteklenmeyen kullanıcı tipi');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, { dispatch, getState }) => {
    return new Promise<User | null>((resolve) => {
      const state = getState() as { auth: AuthState };
      
      // Eğer localStorage'dan kullanıcı yüklendiyse ve hala geçerliyse, direkt döndür
      if (state.auth.user && state.auth.isAuthenticated) {
        resolve(state.auth.user);
        return;
      }

      // Eğer zaten statik admin olarak giriş yapılmışsa, Firebase Auth kontrolü yapma
      if (state.auth.user?.isStaticAdmin) {
        resolve(state.auth.user);
        return;
      }

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // Kullanıcının admin olup olmadığını kontrol et
          getDoc(doc(db, 'admins', user.uid)).then((adminDoc) => {
            if (adminDoc.exists() && adminDoc.data()?.isAdmin) {
              const userData: User = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                isStaticAdmin: false,
                isDatabaseAdmin: true,
              };
              dispatch(setUser(userData));
              resolve(userData);
            } else {
              // Admin değilse çıkış yap
              signOut(auth);
              dispatch(setUser(null));
              resolve(null);
            }
          });
        } else {
          dispatch(setUser(null));
          resolve(null);
        }
        unsubscribe();
      });
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.error = null;
      saveAuthToStorage(action.payload); // Save to localStorage
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHasDatabaseAdmins: (state, action: PayloadAction<boolean>) => {
      state.hasDatabaseAdmins = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Check database admins
    builder
      .addCase(checkDatabaseAdmins.fulfilled, (state, action) => {
        state.hasDatabaseAdmins = action.payload;
      });

    // Static admin login
    builder
      .addCase(loginWithStaticAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithStaticAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        saveAuthToStorage(action.payload); // Save to localStorage
      })
      .addCase(loginWithStaticAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Database admin login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        saveAuthToStorage(action.payload); // Save to localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Create admin
    builder
      .addCase(createAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.hasDatabaseAdmins = true;
        state.error = null;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Change password
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.successMessage = 'Şifreniz başarıyla güncellendi!';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.successMessage = null;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        saveAuthToStorage(null); // Save to localStorage
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      });

    // Check auth state
    builder
      .addCase(checkAuthState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthState.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuthState.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, clearError, clearSuccessMessage, setLoading, setHasDatabaseAdmins } = authSlice.actions;
export default authSlice.reducer;
