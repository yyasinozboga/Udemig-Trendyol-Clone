import {getApp} from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import {useMutation, useQuery} from '@tanstack/react-query';
import {INotification} from '../types/notification';

const app = getApp();
const firestore = getFirestore(app);

export const notifications_services = {
  getAll: async () => {
    try {
      const q = query(
        collection(firestore, 'Notifications'),
        orderBy('createdAt', 'desc'), // ⬅️ En yeni en üstte
      );

      const snapshot = await getDocs(q);

      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return notifications as unknown as INotification[];
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  },
  post: async (notification: Omit<INotification, 'id'>) => {
    try {
      const {title, time, desc, read} = notification;
      const db = getFirestore(app);

      // 1. Doğru doc referansını oluştur
      const newDocRef = doc(collection(db, 'Notifications')); // NOT firestore → db

      // 2. ID'yi ekleyerek set et
      await setDoc(newDocRef, {
        id: newDocRef.id,
        title,
        desc,
        time,
        read,
        createdAt: serverTimestamp(),
      });

      // 3. İsteğe göre ID dönebilirsiniz
      return newDocRef.id;
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  },
};

export const useGetNotifications = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: (): Promise<INotification[]> => notifications_services.getAll(),
  });

export const addNotification = () =>
  useMutation({
    mutationKey: ['notifications'],
    mutationFn: (notification: Omit<INotification, 'id'>) =>
      notifications_services.post(notification),
  });
