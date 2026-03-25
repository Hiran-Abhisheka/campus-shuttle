import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { supabase } from "./supabaseClient";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function registerForPushNotifications(userId: string) {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js')
    });
    console.log("FCM token:", token, "User ID:", userId);
    if (token) {
      const { error } = await supabase
        .from("student")
        .update({ fcm_token: token })
        .eq("user_id", userId);
      if (error) {
        console.error("Supabase update error:", error);
      } else {
        console.log("FCM token saved to student table.");
      }
    } else {
      console.warn("No FCM token generated. Check notification permissions.");
    }
  } catch (err) {
    console.error("FCM registration failed", err);
  }
}

onMessage(messaging, (payload) => {
  if (payload.notification) {
    alert(payload.notification.title + ": " + payload.notification.body);
  } else {
    console.warn("Received FCM message without notification payload", payload);
  }
});
