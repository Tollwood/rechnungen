import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val kotlin_version: String = "1.2.71"



plugins {
	val kotlinVersion = "1.2.71"
	id("org.springframework.boot") version "2.1.7.RELEASE"
	id("io.spring.dependency-management") version "1.0.8.RELEASE"
	id("org.jetbrains.kotlin.plugin.jpa") version kotlinVersion
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

	compile("org.springframework.boot:spring-boot-starter-data-rest")
	compile("org.springframework.boot:spring-boot-starter-data-jpa")
	compile("com.h2database:h2")

	compile ("org.postgresql:postgresql:9.4.1212")
	compile ("com.zaxxer:HikariCP:2.6.0")
	compile("org.flywaydb:flyway-core")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}
