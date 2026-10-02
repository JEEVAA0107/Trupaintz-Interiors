param(
    [string]$OutputDir = "$PSScriptRoot\..\public\downloads"
)

$ErrorActionPreference = "Stop"

$JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:JAVA_HOME = $JAVA_HOME
$env:PATH = "$JAVA_HOME\bin;$env:PATH"

$ANDROID_SDK = "C:\Users\mmyuv\AppData\Local\Android\Sdk"
$BUILD_TOOLS = "$ANDROID_SDK\build-tools\35.0.1"
$PLATFORM_JAR = "$ANDROID_SDK\platforms\android-34\android.jar"
if (-not (Test-Path $PLATFORM_JAR)) {
    $PLATFORM_JAR = "$ANDROID_SDK\platforms\android-35\android.jar"
}

$AAPT2 = "$BUILD_TOOLS\aapt2.exe"
$D8 = "$BUILD_TOOLS\d8.bat"
$ZIPALIGN = "$BUILD_TOOLS\zipalign.exe"
$APKSIGNER = "$BUILD_TOOLS\apksigner.bat"
$JAVAC = "$JAVA_HOME\bin\javac.exe"
$KEYTOOL = "$JAVA_HOME\bin\keytool.exe"

$WorkDir = "$env:TEMP\trupaintz-build"
if (Test-Path $WorkDir) { Remove-Item -Recurse -Force $WorkDir }
New-Item -ItemType Directory -Force -Path "$WorkDir\src\com\trupaintz\app" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\res\values" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\res\mipmap" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\assets" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\bin" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\obj" | Out-Null
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

# Copy App Icon
Copy-Item "$PSScriptRoot\..\public\app-icon.png" "$WorkDir\res\mipmap\ic_launcher.png"

function Write-Utf8NoBom ($filePath, $content) {
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
}

# Write Strings
Write-Utf8NoBom "$WorkDir\res\values\strings.xml" @"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">TruPaintz &amp; Interiors</string>
</resources>
"@

# Write AndroidManifest.xml
Write-Utf8NoBom "$WorkDir\AndroidManifest.xml" @"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.trupaintz.app"
    android:versionCode="204"
    android:versionName="2.4.0">

    <uses-sdk android:minSdkVersion="26" android:targetSdkVersion="34" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />

    <application
        android:label="TruPaintz &amp; Interiors"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher"
        android:theme="@android:style/Theme.DeviceDefault.NoActionBar"
        android:usesCleartextTraffic="true"
        android:hardwareAccelerated="true">
        <activity
            android:name="com.trupaintz.app.MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
"@

# Write Assets index.html
Write-Utf8NoBom "$WorkDir\assets\index.html" @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>TruPaintz Mobile Companion</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #0c0a09; color: #f5f5f4; min-height: 100vh; padding: 20px 16px 80px; }
    .header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid #292524; }
    .brand { font-size: 20px; font-weight: 700; color: #f59e0b; letter-spacing: -0.5px; }
    .badge { font-size: 11px; padding: 4px 8px; border-radius: 999px; background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); font-weight: 600; }
    .card { background: #1c1917; border: 1px solid #292524; border-radius: 16px; padding: 18px; margin-top: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
    .title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #a8a29e; margin-bottom: 8px; }
    .metric { font-size: 28px; font-weight: 800; color: #fafaf9; font-variant-numeric: tabular-nums; }
    .subtext { font-size: 12px; color: #10b981; margin-top: 4px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
    .btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; margin-top: 12px; transition: all 0.2s; }
    .btn-gold { background: linear-gradient(135deg, #d97706, #b45309); color: #fff; box-shadow: 0 4px 14px rgba(217,119,6,0.4); }
    .btn-outline { background: transparent; border: 1px solid #44403c; color: #e7e5e4; }
    .url-box { margin-top: 16px; background: #141210; padding: 12px; border-radius: 12px; border: 1px dashed #44403c; }
    .url-input { width: 100%; padding: 10px; background: #1c1917; border: 1px solid #292524; border-radius: 8px; color: #f5f5f4; font-size: 13px; margin-top: 6px; }
    .site-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #292524; }
    .site-name { font-size: 14px; font-weight: 600; color: #f5f5f4; }
    .site-stage { font-size: 12px; color: #a8a29e; margin-top: 2px; }
    .site-pct { font-size: 14px; font-weight: 700; color: #f59e0b; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">TruPaintz &amp; Interiors</div>
      <div style="font-size: 12px; color: #a8a29e; margin-top: 2px;">Field Operations &amp; Client App</div>
    </div>
    <span class="badge">v2.4.0 Online</span>
  </div>

  <div class="card">
    <div class="title">Active Operations Summary</div>
    <div class="grid">
      <div>
        <div style="font-size: 11px; color: #78716c;">ACTIVE SITES</div>
        <div class="metric">4</div>
        <div class="subtext">100% Mechanized</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #78716c;">TOTAL PIPELINE</div>
        <div class="metric">&#8377;33.9L</div>
        <div style="font-size: 12px; color: #a8a29e; margin-top: 4px;">Bengaluru Sites</div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="title">Live Project Feed</div>
    <div class="site-item">
      <div>
        <div class="site-name">Greenwood Heights 3BHK</div>
        <div class="site-stage">Italian Stucco &middot; Sarjapur</div>
      </div>
      <div class="site-pct">72%</div>
    </div>
    <div class="site-item">
      <div>
        <div class="site-name">The Solarium Penthouse</div>
        <div class="site-stage">Handover Audit &middot; Indiranagar</div>
      </div>
      <div class="site-pct">95%</div>
    </div>
    <div class="site-item" style="border: none;">
      <div>
        <div class="site-name">Prestige Lakeside Villa 14</div>
        <div class="site-stage">Putty &amp; Primer &middot; Varthur</div>
      </div>
      <div class="site-pct">48%</div>
    </div>
  </div>

  <div class="card">
    <div class="title">Lead Architect Hotline</div>
    <div style="font-size: 13px; color: #d6d3d1; margin-bottom: 8px;">Arun Kumar (Site Supervisor)</div>
    <a href="tel:+919876543210" class="btn btn-gold">&#128222; Call Site Architect (+91 98765-43210)</a>
    <a href="https://wa.me/919876543210?text=Hi%20Arun%2C%20checking%20my%20TruPaintz%20interior%20project%20status." class="btn btn-outline">&#128172; Open WhatsApp Chat</a>
  </div>

  <div class="card url-box">
    <div class="title">Connect to Live Portal Server</div>
    <p style="font-size: 12px; color: #a8a29e;">To load your real-time full web studio on this phone, enter your host IP (e.g., http://192.168.1.5:3000):</p>
    <input type="text" id="serverUrl" class="url-input" placeholder="http://192.168.x.x:3000" />
    <button class="btn btn-gold" onclick="loadLiveServer()" style="margin-top: 8px;">Load Live Web App</button>
  </div>

  <script>
    function loadLiveServer() {
      var val = document.getElementById('serverUrl').value.trim();
      if (!val) {
        alert('Please enter a server address (e.g. http://192.168.1.10:3000)');
        return;
      }
      if (!val.startsWith('http://') && !val.startsWith('https://')) {
        val = 'http://' + val;
      }
      window.location.href = val;
    }
  </script>
</body>
</html>
"@

# Write MainActivity.java
Write-Utf8NoBom "$WorkDir\src\com\trupaintz\app\MainActivity.java" @"
package com.trupaintz.app;

import android.app.Activity;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.graphics.Color;

public class MainActivity extends Activity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        webView = new WebView(this);
        setContentView(webView);

        webView.setBackgroundColor(Color.parseColor("#0c0a09"));

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("tel:") || url.startsWith("mailto:") || url.startsWith("whatsapp:")) {
                    try {
                        android.content.Intent intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url));
                        startActivity(intent);
                        return true;
                    } catch (Exception e) {
                        return false;
                    }
                }
                view.loadUrl(url);
                return true;
            }
        });

        webView.setWebChromeClient(new WebChromeClient());

        // Load bundled luxury mobile companion
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
"@

Write-Host "1. Compiling resources with aapt2..."
& $AAPT2 compile --dir "$WorkDir\res" -o "$WorkDir\bin\resources.zip"

Write-Host "2. Linking resources with aapt2..."
& $AAPT2 link `
    -I $PLATFORM_JAR `
    --manifest "$WorkDir\AndroidManifest.xml" `
    -A "$WorkDir\assets" `
    -o "$WorkDir\bin\app-unaligned.apk" `
    "$WorkDir\bin\resources.zip" `
    --java "$WorkDir\obj" `
    --auto-add-overlay

Write-Host "3. Compiling Java sources with javac..."
New-Item -ItemType Directory -Force -Path "$WorkDir\bin\classes" | Out-Null
$JavaFiles = Get-ChildItem -Recurse -Path "$WorkDir\src\*.java", "$WorkDir\obj\*.java" | Select-Object -ExpandProperty FullName
& $JAVAC -cp $PLATFORM_JAR -d "$WorkDir\bin\classes" $JavaFiles

Write-Host "4. Converting bytecode to DEX with d8..."
$ClassFiles = Get-ChildItem -Recurse -Path "$WorkDir\bin\classes\*.class" | Select-Object -ExpandProperty FullName
& $D8 --lib $PLATFORM_JAR --output "$WorkDir\bin" $ClassFiles

Write-Host "5. Adding classes.dex to APK..."
# We can use jar.exe from JDK to insert classes.dex into app-unaligned.apk
Push-Location "$WorkDir\bin"
& "$JAVA_HOME\bin\jar.exe" -uf "$WorkDir\bin\app-unaligned.apk" classes.dex
Pop-Location

Write-Host "6. Aligning APK with zipalign..."
$AlignedApk = "$WorkDir\bin\app-aligned.apk"
if (Test-Path $AlignedApk) { Remove-Item -Force $AlignedApk }
& $ZIPALIGN -v -p 4 "$WorkDir\bin\app-unaligned.apk" $AlignedApk

Write-Host "7. Signing APK with debug keystore..."
$Keystore = "$WorkDir\debug.keystore"
if (-not (Test-Path $Keystore)) {
    & $KEYTOOL -genkey -v -keystore $Keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
}

$SignedApk = "$WorkDir\bin\TruPaintz-Interiors.apk"
& $APKSIGNER sign --ks $Keystore --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android --out $SignedApk $AlignedApk

$FinalApk = "$OutputDir\TruPaintz-Interiors.apk"
Copy-Item $SignedApk $FinalApk -Force
Copy-Item $SignedApk "$OutputDir\TruPaintz-v2.4.0.apk" -Force
Copy-Item $SignedApk "$PSScriptRoot\..\public\TruPaintz.apk" -Force

Write-Host "APK Build successful! Generated:"
Get-Item $FinalApk | Select-Object Name, Length, LastWriteTime

