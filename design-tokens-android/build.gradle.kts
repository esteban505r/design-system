plugins {
    id("com.android.library")
    id("maven-publish")
}

val syncAndroidTokensFromDist = tasks.register<Copy>("syncAndroidTokensFromDist") {
    group = "build"
    description = "Copy dist/android/*.xml into this module (run: pnpm run sync)"
    from(rootProject.layout.projectDirectory.dir("dist/android"))
    include("*.xml")
    into(layout.projectDirectory.dir("src/main/res/values"))
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    doFirst {
        val dir = rootProject.layout.projectDirectory.dir("dist/android").asFile
        val hasXml = dir.exists() && dir.listFiles()?.any { it.extension == "xml" } == true
        require(hasXml) {
            "Missing dist/android/*.xml — from repo root run: pnpm run sync"
        }
    }
}

tasks.named("preBuild") {
    dependsOn(syncAndroidTokensFromDist)
}

android {
    namespace = "com.yourorg.design.tokens"
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

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }
}

val tokensVersion: String =
    (project.findProperty("tokensVersion") as String?)
        ?: System.getenv("TOKENS_VERSION")
        ?: "0.0.0-SNAPSHOT"

afterEvaluate {
    publishing {
        publications {
            create<MavenPublication>("release") {
                groupId = "com.yourorg.designsystem"
                artifactId = "tokens-android"
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
