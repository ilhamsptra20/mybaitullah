package com.ptbmn.baitullah2.services

import android.app.*
import android.content.Context
import android.content.Intent
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import com.ptbmn.baitullah2.R

class AudioForegroundService : Service() {

    private val CHANNEL_ID = "AgoraVoiceCallChannel"
    private lateinit var audioManager: AudioManager
    private lateinit var wakeLock: PowerManager.WakeLock
    private var audioFocusRequest: AudioFocusRequest? = null

    companion object {
        private const val TAG = "AudioForegroundService"
    }

    private val audioFocusChangeListener = AudioManager.OnAudioFocusChangeListener { focusChange ->
        when (focusChange) {
            AudioManager.AUDIOFOCUS_GAIN -> Log.d(TAG, "Audio focus gained")
            AudioManager.AUDIOFOCUS_LOSS -> Log.d(TAG, "Audio focus lost")
            AudioManager.AUDIOFOCUS_LOSS_TRANSIENT -> Log.d(TAG, "Audio focus temporarily lost")
        }
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Voice Call Active")
            .setContentText("Your voice call is running in the background")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()

        startForeground(1, notification)

        // Inisialisasi AudioManager
        audioManager = getSystemService(AUDIO_SERVICE) as AudioManager
        requestAudioFocus()

        val powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
        wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "Agora:VoiceCallWakeLock")
        wakeLock.acquire()
    }

    private fun requestAudioFocus() {
        val result = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            audioFocusRequest = AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                .setOnAudioFocusChangeListener(audioFocusChangeListener)
                .build()
            audioManager.requestAudioFocus(audioFocusRequest!!)
        } else {
            audioManager.requestAudioFocus(
                audioFocusChangeListener,
                AudioManager.STREAM_VOICE_CALL,
                AudioManager.AUDIOFOCUS_GAIN
            )
        }

        if (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
            Log.d(TAG, "Audio focus granted")
        } else {
            Log.d(TAG, "Audio focus denied")
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Agora Voice Call Service",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(serviceChannel)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startMicrophone()
        return START_STICKY
    }

    private fun startMicrophone() {
        audioManager.mode = AudioManager.MODE_IN_COMMUNICATION
        audioManager.isSpeakerphoneOn = false
    }

    override fun onDestroy() {
        super.onDestroy()

        // Lepaskan WakeLock jika masih aktif
        if (wakeLock.isHeld) {
            wakeLock.release()
        }

        // Hapus audio focus
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            audioFocusRequest?.let { audioManager.abandonAudioFocusRequest(it) }
        } else {
            audioManager.abandonAudioFocus(audioFocusChangeListener)
        }

        stopForeground(true)
        Log.d(TAG, "Service destroyed")
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}