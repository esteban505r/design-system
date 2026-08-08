plugins {
    `kotlin-dsl`
}

repositories {
    google()
    mavenCentral()
    gradlePluginPortal()
}

// The convention plugin configures the Android and Kotlin extensions, so their
// plugin classes must be on buildSrc's compile classpath. Versions must match
// the ones declared in the root build.gradle.kts.
dependencies {
    implementation("com.android.tools.build:gradle:8.5.2")
    implementation("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.24")
}
