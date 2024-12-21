# Use a minimal base image for production
FROM eclipse-temurin:17-jre-alpine

# Set a working directory inside the container
WORKDIR /app

# Copy only the necessary application JAR file
COPY target/student-management-0.0.1-SNAPSHOT.jar app.jar

# Use a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
