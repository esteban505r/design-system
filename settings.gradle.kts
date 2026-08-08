import groovy.json.JsonSlurper

pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "design-system-publish"

// One Android module per brand, discovered from brands/*/brand.json. Adding a
// brand means adding a directory, never editing this file.
//
// Each module's project directory is platforms/android/<id>/, which holds only
// a manifest and a three-line build file — all real logic lives in the shared
// gradle/token-module.gradle.kts.
val brandIds = file("brands")
    .listFiles()
    ?.filter { it.isDirectory && File(it, "brand.json").exists() }
    ?.map { it.name }
    ?.sorted()
    .orEmpty()

require(brandIds.isNotEmpty()) {
    "No brands found under brands/ — each brand needs a brand.json"
}

brandIds.forEach { id ->
    val moduleDir = file("platforms/android/$id")
    require(moduleDir.isDirectory) {
        "Brand \"$id\" has no Android module at platforms/android/$id — " +
            "copy platforms/android/belcorp/ and change the brandId in its build.gradle.kts"
    }
    val artifactId = (JsonSlurper().parse(File(file("brands/$id"), "brand.json")) as Map<*, *>)["artifactId"] as? String
        ?: "tokens-android-$id"
    include(":$artifactId")
    project(":$artifactId").projectDir = moduleDir
}
