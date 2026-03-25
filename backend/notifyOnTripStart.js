// backend/notifyOnTripStart.js
// Listens for trip_status changes in Supabase and sends FCM notifications to students

const { createClient } = require('@supabase/supabase-js');
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Initialize Firebase Admin
const serviceAccount = require(path.resolve(__dirname, '../src/campus-shutle-firebase-adminsdk-fbsvc-6b7d1e7074.json'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
});

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Listen for trip_status changes (polling approach)
async function pollTripStatus() {
  let lastStatus = null;
  while (true) {
    const { data, error } = await supabase
      .from('shuttle_route')
      .select('trip_status')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    if (error) {
      console.error('Supabase error:', error);
      await new Promise(r => setTimeout(r, 5000));
      continue;
    }
    if (data && data.trip_status === 'started' && lastStatus !== 'started') {
      await sendNotifications();
    }
    lastStatus = data ? data.trip_status : lastStatus;
    await new Promise(r => setTimeout(r, 3000));
  }
}

// Send FCM notifications to all students
async function sendNotifications() {
  // Get all student FCM tokens from your users table (adjust table/column names as needed)
  const { data: users, error } = await supabase
    .from('users')
    .select('fcm_token')
    .not('fcm_token', 'is', null);
  if (error) {
    console.error('Error fetching users:', error);
    return;
  }
  const tokens = users.map(u => u.fcm_token).filter(Boolean);
  if (tokens.length === 0) {
    console.log('No FCM tokens found.');
    return;
  }
  const message = {
    notification: {
      title: 'Shuttle Trip Started',
      body: 'The driver has started the trip. Please be ready!'
    },
    tokens,
  };
  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log('Notifications sent:', response.successCount);
  } catch (err) {
    console.error('FCM error:', err);
  }
}

pollTripStatus();
