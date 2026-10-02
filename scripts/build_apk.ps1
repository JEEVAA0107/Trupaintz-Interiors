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
New-Item -ItemType Directory -Force -Path "$WorkDir\src\com\trupaintz\interiors" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\res\values" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\res\mipmap" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\assets" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\bin" | Out-Null
New-Item -ItemType Directory -Force -Path "$WorkDir\obj" | Out-Null
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

function Write-Utf8NoBom ($filePath, $content) {
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
}

# Ensure React website is built
Write-Host "Building React production website bundle..."
Push-Location "$PSScriptRoot\.."
& node "./node_modules/vite/bin/vite.js" build
Pop-Location

# Copy actual built website into APK assets (excluding apk downloads)
Write-Host "Embedding real website into APK assets..."
Get-ChildItem "$PSScriptRoot\..\dist" | Where-Object { $_.Name -ne "downloads" -and $_.Name -notlike "*.apk" } | ForEach-Object {
    Copy-Item -Recurse -Force $_.FullName "$WorkDir\assets\"
}

# Copy App Icon
Copy-Item "$PSScriptRoot\..\public\app-icon.png" "$WorkDir\res\mipmap\ic_launcher.png"

# Write Strings
Write-Utf8NoBom "$WorkDir\res\values\strings.xml" @"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">TruPaintz &amp; Interiors</string>
</resources>
"@

# Write AndroidManifest.xml (v2.5.0)
Write-Utf8NoBom "$WorkDir\AndroidManifest.xml" @"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.trupaintz.interiors"
    android:versionCode="250"
    android:versionName="2.5.0">

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
            android:name="com.trupaintz.interiors.MainActivity"
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

# Write MainActivity.java (Loads EXACT live website + local fallback)
Write-Utf8NoBom "$WorkDir\src\com\trupaintz\interiors\MainActivity.java" @"
package com.trupaintz.interiors;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;

public class MainActivity extends Activity {
    private WebView webView;
    private ProgressBar progressBar;
    private ValueCallback<Uri[]> uploadMessage;
    private final static int FILECHOOSER_RESULTCODE = 101;
    private static final String APP_URL = "https://trupaintz-interiors.vercel.app";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.parseColor("#0a0a0a"));
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                window.setNavigationBarColor(Color.parseColor("#0a0a0a"));
            }
        }

        FrameLayout layout = new FrameLayout(this);
        layout.setBackgroundColor(Color.parseColor("#0a0a0a"));

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#0a0a0a"));

        progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        progressBar.setMax(100);
        progressBar.setProgress(0);
        progressBar.setLayoutParams(new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                10
        ));
        progressBar.setVisibility(View.GONE);

        layout.addView(webView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));
        layout.addView(progressBar);

        setContentView(layout);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setUserAgentString(settings.getUserAgentString() + " TruPaintzApp/2.5.0");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url == null) return false;
                if (url.startsWith("tel:") || url.startsWith("mailto:") || url.startsWith("whatsapp:") || url.contains("wa.me") || url.contains("instagram.com")) {
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(intent);
                        return true;
                    } catch (Exception e) {
                        return false;
                    }
                }
                view.loadUrl(url);
                return true;
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                if (request.isForMainFrame()) {
                    // If network fails, load the bundled offline website from assets
                    view.loadUrl("file:///android_asset/index.html");
                }
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (newProgress < 100) {
                    progressBar.setVisibility(View.VISIBLE);
                    progressBar.setProgress(newProgress);
                } else {
                    progressBar.setVisibility(View.GONE);
                }
            }

            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                if (uploadMessage != null) {
                    uploadMessage.onReceiveValue(null);
                    uploadMessage = null;
                }
                uploadMessage = filePathCallback;
                Intent intent = fileChooserParams.createIntent();
                try {
                    startActivityForResult(intent, FILECHOOSER_RESULTCODE);
                } catch (Exception e) {
                    uploadMessage = null;
                    return false;
                }
                return true;
            }
        });

        // Load the EXACT live TruPaintz website
        webView.loadUrl(APP_URL);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILECHOOSER_RESULTCODE) {
            if (uploadMessage == null) return;
            uploadMessage.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
            uploadMessage = null;
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
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
Push-Location "$WorkDir\bin"
& "$JAVA_HOME\bin\jar.exe" -uf "$WorkDir\bin\app-unaligned.apk" classes.dex
Pop-Location

Write-Host "6. Aligning APK with zipalign..."
$AlignedApk = "$WorkDir\bin\app-aligned.apk"
if (Test-Path $AlignedApk) { Remove-Item -Force $AlignedApk }
& $ZIPALIGN -v -p 4 "$WorkDir\bin\app-unaligned.apk" $AlignedApk

Write-Host "7. Signing APK with permanent release keystore..."
Copy-Item "$PSScriptRoot\keystore\trupaintz-release.keystore" "$WorkDir\trupaintz-release.keystore" -Force
$Keystore = "$WorkDir\trupaintz-release.keystore"
$SignedApk = "$WorkDir\bin\TruPaintz-Release-v2.5.0.apk"
& $APKSIGNER sign --ks $Keystore --ks-pass pass:trupaintzpass --ks-key-alias trupaintzkey --key-pass pass:trupaintzpass --out $SignedApk $AlignedApk

$FinalApk = "$OutputDir\TruPaintz-Release-v2.5.0.apk"
Copy-Item $SignedApk $FinalApk -Force

# Also update other alias filenames for safety
Copy-Item $SignedApk "$OutputDir\TruPaintz-v2.5.0.apk" -Force
Copy-Item $SignedApk "$OutputDir\TruPaintz-v2.4.0.apk" -Force
Copy-Item $SignedApk "$OutputDir\TruPaintz-Interiors.apk" -Force
Copy-Item $SignedApk "$PSScriptRoot\..\public\TruPaintz.apk" -Force

Write-Host "APK Build successful! Generated:"
Get-Item $FinalApk | Select-Object Name, Length, LastWriteTime
