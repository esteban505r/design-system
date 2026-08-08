// Convention plugin: everything an Android token module needs, for any brand.
//
// A brand's module is one line — `plugins { id("design-tokens-brand-module") }` —
// because the brand is identified by its directory name and every other setting
// comes from brands/<id>/brand.json. Adding a brand adds token values and a
// directory, never build logic.
//
// This lives in buildSrc rather than being applied with `apply(from = …)`:
// a script applied that way is compiled without the Android and Kotlin plugin
// classpath, so `android { }` cannot be configured from one at all.

import groovy.json.JsonSlurper

plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("maven-publish")
}

// settings.gradle.kts points each brand module at platforms/android/<id>/, so
// the directory name is the brand id — no property to pass or forget to update.
val brandId: String = project.projectDir.name
val brandDir = File(rootProject.projectDir, "brands/$brandId")
val brandManifest = File(brandDir, "brand.json")

require(brandManifest.exists()) {
    "No brands/$brandId/brand.json — the Android module directory name must match a brand id"
}

@Suppress("UNCHECKED_CAST")
val brand = JsonSlurper().parse(brandManifest) as Map<String, Any?>

val brandArtifactId = brand["artifactId"] as? String ?: "tokens-android-$brandId"
val androidNamespace = brand["androidNamespace"] as? String
    ?: "com.estebanruano.tokens.$brandId"
val composePackage = brand["composePackage"] as? String
    ?: "com.estebanruano.designtokens.$brandId"

val mavenGroupId = (rootProject.findProperty("mavenGroupId") as String?)
    ?: error("mavenGroupId missing in root gradle.properties")

// ── Generated sources ───────────────────────────────────────
// dist/<brand>/ is written by `pnpm run sync` and is the committed artifact;
// these tasks copy it into the module, where the copies stay gitignored.

val distAndroid = rootProject.layout.projectDirectory.dir("dist/$brandId/android")
val distCompose = rootProject.layout.projectDirectory.dir("dist/$brandId/compose")

val syncAndroidTokensFromDist = tasks.register<Copy>("syncAndroidTokensFromDist") {
    group = "build"
    description = "Copy dist/$brandId/android/*.xml into this module (run: pnpm run sync)"
    from(distAndroid)
    include("*.xml")
    into(layout.projectDirectory.dir("src/main/res/values"))
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    doFirst {
        val dir = distAndroid.asFile
        val hasXml = dir.exists() && dir.listFiles()?.any { it.extension == "xml" } == true
        require(hasXml) {
            "Missing dist/$brandId/android/*.xml — from repo root run: pnpm run sync"
        }
    }
}

val syncComposeTokensFromDist = tasks.register<Copy>("syncComposeTokensFromDist") {
    group = "build"
    description = "Copy dist/$brandId/compose/DesignTokens.kt into this module (run: pnpm run sync)"
    from(distCompose)
    include("DesignTokens.kt")
    // Kotlin does not require directory and package to agree, but keeping them
    // aligned is what lets each brand's DesignTokens.kt coexist in one repo.
    into(layout.projectDirectory.dir("src/main/kotlin/${composePackage.replace('.', '/')}"))
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    doFirst {
        val f = distCompose.file("DesignTokens.kt").asFile
        require(f.exists()) {
            "Missing dist/$brandId/compose/DesignTokens.kt — from repo root run: pnpm run sync"
        }
    }
}

tasks.named("preBuild") {
    dependsOn(syncAndroidTokensFromDist, syncComposeTokensFromDist)
}

// ── Android library ─────────────────────────────────────────

android {
    namespace = androidNamespace
    compileSdk = 34

    defaultConfig {
        minSdk = 24
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            consumerProguardFiles("consumer-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    sourceSets {
        getByName("main") {
            java.srcDirs("src/main/kotlin")
        }
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }
}

// Compose types used by the generated DesignTokens object.
// compileOnly: consumers already ship Compose; do not force a runtime dep or lock a version.
dependencies {
    add("compileOnly", "androidx.compose.ui:ui-graphics:1.6.8")
    add("compileOnly", "androidx.compose.ui:ui-unit:1.6.8")
}

// ── Publishing ──────────────────────────────────────────────
// One VERSION for every brand: a brand-only change bumps them all, which is
// cheap, where per-brand versions would multiply the release matrix by N.

@Suppress("UNCHECKED_CAST")
fun readRootPackageJsonVersion(): String? {
    val f = File(rootProject.projectDir, "package.json")
    if (!f.exists()) return null
    return try {
        (JsonSlurper().parse(f) as Map<*, *>)["version"] as? String
    } catch (_: Throwable) {
        null
    }
}

// VERSION at the repo root is the release-version source of truth
// (written by pipeline/set-release-version.mjs; package.json is a synced mirror).
fun readRootVersionFile(): String? {
    val f = File(rootProject.projectDir, "VERSION")
    if (!f.exists()) return null
    return f.readText().trim().takeIf { it.matches(Regex("""\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?""")) }
}

val tokensVersion: String =
    (project.findProperty("tokensVersion") as String?)
        ?: System.getenv("TOKENS_VERSION")
        ?: readRootVersionFile()
        ?: readRootPackageJsonVersion()
        ?: "0.0.0-SNAPSHOT"

afterEvaluate {
    publishing {
        publications {
            create<MavenPublication>("release") {
                groupId = mavenGroupId
                artifactId = brandArtifactId
                version = tokensVersion
                from(components["release"])
            }
        }
        val slug = System.getenv("GITHUB_REPOSITORY")
        if (slug != null) {
            repositories {
                maven {
                    name = "GitHubPackages"
                    url = uri("https://maven.pkg.github.com/$slug")
                    credentials {
                        username = System.getenv("GITHUB_ACTOR")
                        password = System.getenv("GITHUB_TOKEN")
                    }
                }
            }
        }
    }
}
