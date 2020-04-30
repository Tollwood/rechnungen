import com.moowork.gradle.node.npm.NpmTask
import org.jetbrains.kotlin.com.google.common.collect.Lists
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	val kotlinVersion = "1.3.61"
    id("com.moowork.node") version "1.3.1"
    id("org.springframework.boot") version "2.2.6.RELEASE"
	id("io.spring.dependency-management") version "1.0.8.RELEASE"
	id("org.jetbrains.kotlin.plugin.jpa") version kotlinVersion
	id ("org.jetbrains.kotlin.plugin.allopen") version kotlinVersion
	id("idea")
	kotlin("jvm") version kotlinVersion
	kotlin("plugin.spring") version kotlinVersion
}


group = "com.tollwood"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("io.jsonwebtoken:jjwt:0.9.1")

	compile("org.springframework.boot:spring-boot-devtools")
	compile("org.springframework.boot:spring-boot-starter-data-rest")
	compile("org.springframework.boot:spring-boot-starter-data-jpa")
	compile("org.springframework.boot:spring-boot-configuration-processor")
	compile("com.h2database:h2")
	compile("org.hibernate:hibernate-search-orm:5.11.4.Final")

	compile ("org.postgresql:postgresql:9.4.1212")
	compile ("com.zaxxer:HikariCP:2.6.0")
	compile("org.flywaydb:flyway-core")

	testCompile("io.github.bonigarcia:selenium-jupiter:3.3.0")

	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.junit.jupiter:junit-jupiter:5.5.1")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}

// Read more about how to configure the plugin from
// https://github.com/srs/gradle-node-plugin/blob/master/docs/node.md
node {
	download = true

	// Set the work directory for unpacking node
	workDir = file("${project.buildDir}/nodejs")

	// Set the work directory for NPM
	npmWorkDir = file("${project.buildDir}/npm")
}

tasks.test {
	useJUnitPlatform()
	testLogging.events("passed", "skipped", "failed")
	maxParallelForks = 2
}

tasks.create<NpmTask>("appNpmInstall"){
	description = "Installs all dependencies from package.json"
	setWorkingDir(file("${project.projectDir}/src/main/webapp"))
	setArgs(Lists.newArrayList("install"))
}

tasks.create<NpmTask>("appNpmBuild"){
	description = "Builds production version of the webapp"
	setWorkingDir(file("${project.projectDir}/src/main/webapp"))
	setArgs(Lists.newArrayList("run", "build"))
	dependsOn("appNpmInstall")
}

tasks.create<Copy>("copywebapp") {
	from("src/main/webapp/build")
	into("build/resources/main/static/.")
	dependsOn("appNpmBuild")
}

tasks.named("compileKotlin") {
	if (project.hasProperty("build_frontend")) {
		dependsOn("copywebapp")
	}
}

idea {
	module {
		inheritOutputDirs = false
		outputDir = file("$buildDir/classes/kotlin/main")
	}
}