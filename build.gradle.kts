// Intentionally empty.
//
// The Android and Kotlin plugins reach the brand modules through the
// `design-tokens-brand-module` convention plugin in buildSrc, so their versions
// are declared once in buildSrc/build.gradle.kts. Re-declaring them here with a
// version fails the build: buildSrc has already put them on the classpath, and
// Gradle cannot check a version against a classpath entry it did not resolve.
