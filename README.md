<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="mindforge-backend.png" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# MINDFORGE-BACKEND

<em>Empowering Learning Connections for Every Student's Success</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/last-commit/Kukuliak-Dmytro/mindforge-backend?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/Kukuliak-Dmytro/mindforge-backend?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/Kukuliak-Dmytro/mindforge-backend?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
<br>
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
<img src="https://img.shields.io/badge/Zod-3E67B1.svg?style=flat&logo=Zod&logoColor=white" alt="Zod">

</div>
<br>

---

## 📄 Table of Contents

- [Overview](#-overview)
- [Getting Started](#-getting-started)
    - [Prerequisites](#-prerequisites)
    - [Installation](#-installation)
    - [Usage](#-usage)
    - [Testing](#-testing)
- [Features](#-features)
- [Project Structure](#-project-structure)
    - [Project Index](#-project-index)
- [Roadmap](#-roadmap)
- [Acknowledgment](#-acknowledgment)

---

## ✨ Overview

Mindforge-backend is a powerful TypeScript-based API designed to connect students with qualified tutors, enhancing the learning experience through seamless interactions.

**Why Mindforge-backend?**

This project aims to facilitate personalized education by providing a robust platform for students and tutors. The core features include:

- **🔒 Secure User Management:** Ensures safe authentication and role-based access control for enhanced security.
- **📦 TypeScript-based API:** Promotes type safety and maintainability, reducing runtime errors and improving developer experience.
- **💬 Real-time Communication:** Supports chat functionalities, fostering better interaction between students and tutors.
- **📅 Comprehensive Order Management:** Streamlines the creation, updating, and management of tutoring sessions.
- **🚀 Scalable Architecture:** Built with Docker and Prisma for easy deployment and efficient database interactions.
- **📚 Detailed Documentation:** Offers extensive guides and API documentation, aiding developers in integration and usage.

---

## 📌 Features

|      | Component       | Details                              |
| :--- | :-------------- | :----------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>RESTful API design</li><li>Modular structure with controllers and services</li><li>TypeScript for type safety</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>TypeScript for static typing</li><li>Consistent code style enforced via linters</li><li>Use of `zod` for schema validation</li></ul> |
| 📄 | **Documentation** | <ul><li>API documentation in Markdown</li><li>Dockerfile for containerization instructions</li><li>Schema definitions in `schema.prisma`</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Supabase for database management</li><li>JWT for authentication</li><li>Express.js for server framework</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Separation of concerns with distinct modules</li><li>Reusable components across the application</li><li>Service layer for business logic</li></ul> |
| 🧪 | **Testing**       | <ul><li>Unit tests with TypeScript</li><li>Integration tests for API endpoints</li><li>Use of `nodemon` for development</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimized database queries with Prisma</li><li>Asynchronous request handling with Express</li><li>Lightweight Docker images for faster deployment</li></ul> |
| 🛡️ | **Security**      | <ul><li>JWT for secure user authentication</li><li>Input validation with `zod`</li><li>CORS configuration for API access control</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Core: TypeScript, Express, Prisma</li><li>Dev: Nodemon, TypeScript types</li><li>Database: Supabase client</li></ul> |
| 🚀 | **Scalability**   | <ul><li>Containerized with Docker for easy scaling</li><li>Stateless API design for horizontal scaling</li><li>Database connections managed by Prisma</li></ul> |

---

## 📁 Project Structure

```sh
└── mindforge-backend/
    ├── Dockerfile
    ├── PROJECT_OVERVIEW.md
    ├── README.md
    ├── TASKS.md
    ├── TECHNICAL_SPECIFICATION.md
    ├── api.ts
    ├── docs
    │   ├── CREATE_ORDER_GUIDE.md
    │   ├── GET_ALL_TUTORS_GUIDE.md
    │   ├── student-types-usage.md
    │   ├── student-types.md
    │   ├── tutor-api-guide.md
    │   ├── tutor-api-types.md
    │   ├── tutor-profile-update-guide.md
    │   ├── tutor-types.md
    │   └── update-student-profile.md
    ├── migrations
    │   └── 20240320_fix_user_trigger.sql
    ├── package-lock.json
    ├── package.json
    ├── prisma
    │   ├── migrations
    │   └── schema.prisma
    ├── schema.mmd
    ├── schema.sql
    ├── src
    │   ├── clients
    │   ├── controllers
    │   ├── middleware
    │   ├── middlewares
    │   ├── routes
    │   ├── services
    │   ├── types
    │   └── utils
    └── tsconfig.json
```

---

### 📑 Project Index

<details open>
	<summary><b><code>MINDFORGE-BACKEND/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the configuration and dependencies for the Mindforge backend project, facilitating the development and deployment of a TypeScript-based API<br>- It streamlines the development process with scripts for testing, starting, and managing Docker containers, while integrating essential libraries for database interaction, authentication, and request handling<br>- This structure supports a robust and scalable architecture for building and maintaining the backend services.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/schema.sql'>schema.sql</a></b></td>
					<td style='padding: 8px;'>- Defines the database schema for a tutoring platform, establishing essential tables for users, profiles, tutor qualifications, subjects, orders, sessions, reviews, chats, and messages<br>- Facilitates user management, educational background tracking, session scheduling, and communication between students and tutors<br>- Enhances data integrity and performance through relationships, constraints, and indexing, supporting a robust architecture for seamless interactions within the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/schema.mmd'>schema.mmd</a></b></td>
					<td style='padding: 8px;'>- Defines the entity-relationship model for a tutoring platform, outlining the relationships between users, profiles, tutor qualifications, subjects, orders, sessions, reviews, and messaging<br>- This schema facilitates user interactions, such as students booking sessions with tutors, managing profiles, and exchanging messages, thereby supporting the overall architecture of the application in delivering a seamless educational experience.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Configures TypeScript compiler options to enhance code quality and maintainability within the project<br>- By enabling source maps and strict type-checking, it ensures a robust development experience<br>- The output is directed to a designated distribution folder, facilitating organized builds<br>- Compatibility with modern JavaScript features is supported, promoting seamless integration and interoperability across various modules in the codebase architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/TECHNICAL_SPECIFICATION.md'>TECHNICAL_SPECIFICATION.md</a></b></td>
					<td style='padding: 8px;'>- Technical specification outlines the development of the Mind Forge platform, designed to connect students with tutors<br>- It emphasizes user authentication via Supabase Auth, ensuring secure access to backend services through JWT tokens<br>- The architecture supports user profiles, order management, reviews, and real-time chat functionalities, catering to the needs of students and tutors while adhering to best practices in security and data management.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Mind Forge serves as an innovative platform connecting students with qualified mentors to enhance learning across various subjects<br>- By facilitating personalized education, it offers features such as user roles for students and tutors, a comprehensive order management system, real-time communication, and a robust evaluation mechanism<br>- The architecture supports scalability and security, ensuring a seamless educational experience while paving the way for future enhancements like payment integration and mobile applications.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/api.ts'>api.ts</a></b></td>
					<td style='padding: 8px;'>- Establishes an Express.js server that serves as the backbone of the application, facilitating communication between the client and various routes<br>- It incorporates essential middleware for handling requests, enabling CORS, and managing errors, ensuring a robust and user-friendly API experience<br>- The server listens on a specified port, ready to process incoming requests efficiently.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/Dockerfile'>Dockerfile</a></b></td>
					<td style='padding: 8px;'>- Facilitates the creation of a Docker image for a Node.js application, optimizing the build process through a multi-stage approach<br>- It ensures that all dependencies are installed and the application is prepared for production while maintaining a minimal and secure runtime environment<br>- This setup enhances efficiency and security, allowing for streamlined deployment of the application in various environments.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/PROJECT_OVERVIEW.md'>PROJECT_OVERVIEW.md</a></b></td>
					<td style='padding: 8px;'>- Mind Forge-Project Overview## SummaryThe <code>PROJECT_OVERVIEW.md</code> file serves as a comprehensive guide for the Mind Forge project, which is designed to connect students with tutors<br>- This document outlines the projects purpose, technical stack, and overall architecture, providing essential information for users and developers alike<br>- It includes sections on environment setup, project execution, development practices, testing protocols, and deployment strategies, ensuring that all stakeholders have a clear understanding of how to effectively engage with the platform<br>- By offering a structured overview, this file plays a crucial role in facilitating collaboration and enhancing the user experience within the Mind Forge ecosystem.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/TASKS.md'>TASKS.md</a></b></td>
					<td style='padding: 8px;'>- TASKS.md SummaryThe <code>TASKS.md</code> file outlines the development tasks for the API of the Mind Forge project<br>- It serves as a foundational document that provides general instructions and architectural guidelines for the codebase<br>- The main purpose of this file is to ensure consistency and clarity in the API's design and implementation.Key highlights include the inheritance of all controllers from a base class, <code>BaseController</code>, which promotes code reuse and standardization<br>- The document also specifies the standard response structure for API calls, ensuring that all responses are uniform and easily interpretable<br>- Additionally, it emphasizes the use of JWT tokens for user identification, enhancing security and user management within the application.Overall, this file is crucial for guiding developers in maintaining a coherent and efficient API architecture, facilitating collaboration and adherence to best practices throughout the project.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- docs Submodule -->
	<details>
		<summary><b>docs</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ docs</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/student-types-usage.md'>student-types-usage.md</a></b></td>
					<td style='padding: 8px;'>- Provides a comprehensive guide for utilizing student types within the project, detailing their integration in components, API interactions, form validation, and error handling<br>- It emphasizes best practices for type safety and data management, ensuring a robust architecture that enhances the development experience and maintains consistency across the application<br>- This resource is essential for developers working with student-related data structures.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/update-student-profile.md'>update-student-profile.md</a></b></td>
					<td style='padding: 8px;'>- Implementing the Update Student Profile feature enables authenticated students to modify their profile information within the Node.js backend<br>- This functionality ensures that user data is validated and securely updated in the database, enhancing user experience and data integrity<br>- It integrates seamlessly with the overall architecture, leveraging Express for routing, Prisma for database interactions, and Zod for input validation.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/student-types.md'>student-types.md</a></b></td>
					<td style='padding: 8px;'>- Student types documentation serves as a comprehensive guide for understanding and utilizing the various student-related types defined within the codebase<br>- It outlines essential type definitions, provides usage examples for integration in components and API interactions, and emphasizes best practices for effective implementation<br>- This documentation is crucial for maintaining consistency and clarity in handling student data throughout the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/tutor-types.md'>tutor-types.md</a></b></td>
					<td style='padding: 8px;'>- Provides comprehensive documentation for tutor-related types utilized throughout the project<br>- It defines essential structures for managing tutor information, including profiles, education, and experience, while facilitating API interactions and form validations<br>- This documentation serves as a guide for developers to effectively implement and integrate these types within the application, ensuring consistency and clarity in handling tutor data across various components.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/tutor-api-guide.md'>tutor-api-guide.md</a></b></td>
					<td style='padding: 8px;'>- Provides comprehensive guidance for interacting with the Tutor API, detailing essential endpoints for retrieving and updating tutor profiles<br>- It outlines the required authentication, response structures, and validation rules, ensuring users can effectively manage tutor information, including education, experience, and subjects offered<br>- This documentation serves as a crucial resource for developers integrating with the Tutor API, promoting best practices and security considerations.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/tutor-profile-update-guide.md'>tutor-profile-update-guide.md</a></b></td>
					<td style='padding: 8px;'>- Guide for updating a tutors profile, including experience, education, and subjects through the API<br>- It outlines the necessary authentication, request structure, and response format, ensuring seamless integration within the overall codebase architecture<br>- The guide emphasizes the ability to perform multiple updates in a single request while maintaining data integrity and validation, enhancing the user experience for tutors managing their profiles.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/CREATE_ORDER_GUIDE.md'>CREATE_ORDER_GUIDE.md</a></b></td>
					<td style='padding: 8px;'>- Guide for creating an order in the Mind Forge backend outlines the process for utilizing the API to submit order requests<br>- It details the required endpoint, necessary authentication, and the structure of request and response data<br>- This guide ensures users can effectively create orders, whether recurring or non-recurring, while adhering to the specified requirements for each order type.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/tutor-api-types.md'>tutor-api-types.md</a></b></td>
					<td style='padding: 8px;'>- Profile API documentation defines the structure and types used for managing tutor and student profiles within the application<br>- It facilitates the retrieval and updating of user information, including basic details, education, experience, and subjects for tutors, as well as orders and reviews for students<br>- This ensures a consistent and efficient interaction with the API, enhancing user experience and data integrity across the platform.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/docs/GET_ALL_TUTORS_GUIDE.md'>GET_ALL_TUTORS_GUIDE.md</a></b></td>
					<td style='padding: 8px;'>- Guide for fetching all tutors from the Mind Forge backend outlines the process to access tutor data via a specific API endpoint<br>- It details the expected response format, including tutor information such as names, emails, and bios, while emphasizing that no authentication is required for access<br>- This functionality is integral to the project, enabling users to retrieve and display tutor profiles efficiently.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<!-- routes Submodule -->
			<details>
				<summary><b>routes</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.routes</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/routes/healthRoutes.ts'>healthRoutes.ts</a></b></td>
							<td style='padding: 8px;'>- Defines a health check route within the application, facilitating the monitoring of system status<br>- By integrating with the HealthController, it provides a straightforward endpoint for external services to verify the operational health of the application<br>- This functionality is essential for maintaining reliability and ensuring that the application is running smoothly within the overall architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/routes/tutor.routes.ts'>tutor.routes.ts</a></b></td>
							<td style='padding: 8px;'>- Facilitates the management of tutor profiles within the application by defining routes for retrieving and updating profile information<br>- It ensures that all interactions with these endpoints are secured through authentication, thereby protecting sensitive user data<br>- This component plays a crucial role in the overall architecture by enabling personalized user experiences for tutors while maintaining security and data integrity.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/routes/public.routes.ts'>public.routes.ts</a></b></td>
							<td style='padding: 8px;'>- Defines routing for public API endpoints within the application, facilitating access to categories and subjects<br>- It connects incoming requests to the appropriate controller methods, enabling users to retrieve lists of categories and subjects or specific details based on provided identifiers<br>- This structure enhances the overall architecture by promoting a clear separation of concerns and improving maintainability.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/routes/index.ts'>index.ts</a></b></td>
							<td style='padding: 8px;'>- Centralizes the routing logic for the application by integrating various route modules, including health checks, tutor, student, public, order, and user functionalities<br>- This organization enhances maintainability and scalability, allowing for a clear separation of concerns within the codebase<br>- By directing incoming requests to the appropriate handlers, it streamlines the overall request processing flow in the application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/routes/user.routes.ts'>user.routes.ts</a></b></td>
							<td style='padding: 8px;'>- Facilitates user-related routing within the application by defining endpoints for user interactions<br>- Specifically, it establishes a route to retrieve all tutors, leveraging the user controller to handle the request and response<br>- This integration enhances the overall architecture by promoting a clear separation of concerns, allowing for streamlined user management and improved maintainability across the codebase.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/routes/student.routes.ts'>student.routes.ts</a></b></td>
							<td style='padding: 8px;'>- Student routes facilitate the management of student profiles within the application<br>- By enforcing authentication, these routes ensure that only authorized users can access or modify their profile information<br>- The integration with the studentProfileController allows for retrieving and updating student data, thereby enhancing user experience and maintaining data integrity across the codebase.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/routes/order.routes.ts'>order.routes.ts</a></b></td>
							<td style='padding: 8px;'>- Order routing functionality is established within the application, facilitating the management of order-related operations<br>- It enables the creation, updating, retrieval, and deletion of orders while ensuring secure access through token authentication<br>- This component integrates seamlessly with the overall architecture, providing essential endpoints that interact with the order controller to handle business logic and data management effectively.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- utils Submodule -->
			<details>
				<summary><b>utils</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.utils</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/utils/prisma.ts'>prisma.ts</a></b></td>
							<td style='padding: 8px;'>- Establishes a centralized Prisma client instance for seamless database interactions within the project<br>- This utility enhances the codebase architecture by providing a consistent interface for data operations, promoting efficient data management and reducing redundancy across various modules<br>- Its integration supports the overall functionality and scalability of the application, ensuring robust communication with the underlying database.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- middleware Submodule -->
			<details>
				<summary><b>middleware</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.middleware</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/middleware/auth.ts'>auth.ts</a></b></td>
							<td style='padding: 8px;'>- Authentication middleware enhances the security of the application by verifying user tokens and managing user sessions<br>- It integrates with Supabase to create role-based clients, ensuring that users have the appropriate access rights<br>- By decoding JWTs and handling errors gracefully, it provides a robust mechanism for user authentication, facilitating secure interactions within the broader codebase architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- clients Submodule -->
			<details>
				<summary><b>clients</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.clients</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/clients/supabaseAdmin.ts'>supabaseAdmin.ts</a></b></td>
							<td style='padding: 8px;'>- Establishes a Supabase client instance for administrative tasks within the project<br>- By utilizing environment variables for configuration, it enables secure interactions with the Supabase backend, facilitating operations such as data management and authentication<br>- This integration plays a crucial role in the overall architecture, ensuring that the application can leverage Supabases capabilities effectively while maintaining security and scalability.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- types Submodule -->
			<details>
				<summary><b>types</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.types</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/types/category-types.ts'>category-types.ts</a></b></td>
							<td style='padding: 8px;'>- Defines the structure and validation rules for category-related data within the project<br>- It establishes interfaces for category entities, including their creation and update requests, ensuring consistency across the codebase<br>- Additionally, it provides a standardized response format for category data retrieval, facilitating seamless integration and communication between different components of the application<br>- This enhances overall data integrity and usability in managing categories.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/types/tutor-types.ts'>tutor-types.ts</a></b></td>
							<td style='padding: 8px;'>- Defines common types and interfaces for managing tutor profiles within the application<br>- It encapsulates essential tutor information, education, experience, and subjects, facilitating structured data handling<br>- Additionally, it establishes validation rules for profile updates, ensuring data integrity and consistency across the codebase<br>- This foundational structure supports seamless interactions between the frontend and backend, enhancing the overall user experience in the tutoring platform.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/types/student-types.ts'>student-types.ts</a></b></td>
							<td style='padding: 8px;'>- Defines common types and interfaces for managing student-related data within the application<br>- It encapsulates essential student information, order details, and review structures, facilitating seamless interactions with student profiles<br>- Additionally, it establishes validation rules for profile updates and standardizes API response formats, ensuring consistency and clarity across the codebase architecture<br>- This foundational layer supports robust data handling and enhances the overall user experience.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/types/subject-types.ts'>subject-types.ts</a></b></td>
							<td style='padding: 8px;'>- Defines the structure and validation rules for subjects within the project, facilitating the management of subject-related data<br>- It outlines the properties of a subject, including its identification, description, and optional attributes, while also providing interfaces for creating and updating subjects<br>- This ensures consistency and integrity in handling subject information across the codebase, enhancing the overall architectures robustness and usability.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/types/ApiResponse.ts'>ApiResponse.ts</a></b></td>
							<td style='padding: 8px;'>- Defines a standardized structure for API responses, enhancing consistency across the codebase<br>- It facilitates the creation of both successful and error responses through a dedicated ResponseBuilder class, ensuring that all API interactions convey clear success indicators, messages, and data or error details<br>- This approach streamlines error handling and improves the overall user experience by providing meaningful feedback from the API.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/types/User.ts'>User.ts</a></b></td>
							<td style='padding: 8px;'>- Defines user-related types and interfaces essential for managing authentication and authorization within the application<br>- It establishes a clear structure for user roles, including STUDENT, TUTOR, and ADMIN, while extending the JWT payload to include user-specific information<br>- This facilitates secure handling of user data in requests, ensuring that role-based access control is effectively implemented throughout the codebase.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/types/AppError.ts'>AppError.ts</a></b></td>
							<td style='padding: 8px;'>- Error handling is streamlined through the implementation of a custom error hierarchy that enhances the clarity and management of application errors<br>- By defining specific error types such as NotFoundError, BadRequestError, and UnauthorizedError, the architecture ensures that different error scenarios are effectively communicated, improving the overall robustness and user experience of the application<br>- This structure supports operational awareness and facilitates better debugging and error reporting.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/types/common-types.ts'>common-types.ts</a></b></td>
							<td style='padding: 8px;'>- Defines common types utilized throughout the application, ensuring consistency and clarity in data handling<br>- It establishes foundational structures for responses, including both successful and error scenarios, which facilitates seamless communication between different components of the codebase<br>- By standardizing data formats such as UUIDs and ISO date strings, it enhances interoperability and reduces potential errors in data processing across the project.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- controllers Submodule -->
			<details>
				<summary><b>controllers</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.controllers</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/controllers/studentProfile.controller.ts'>studentProfile.controller.ts</a></b></td>
							<td style='padding: 8px;'>- StudentProfileController manages student profile functionalities within the application, enabling retrieval and updating of student information<br>- It ensures that only authorized users can access or modify their profiles, validating input data for updates<br>- By integrating with the Prisma client, it facilitates seamless interaction with the database, enhancing the overall user experience for students in the system.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/controllers/user.controller.ts'>user.controller.ts</a></b></td>
							<td style='padding: 8px;'>- Facilitates the retrieval of tutor information within the application by defining a UserController that interacts with the UserService<br>- It handles incoming requests to fetch all tutors, processes the data, and returns it in a structured JSON format<br>- Additionally, it manages error responses, ensuring robust communication with the client in case of failures, thereby enhancing the overall user experience in the codebase architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/controllers/BaseController.ts'>BaseController.ts</a></b></td>
							<td style='padding: 8px;'>- BaseController serves as an abstract foundation for handling API responses within the project<br>- It provides standardized methods for sending successful responses and managing errors, ensuring consistent communication with clients<br>- By centralizing response logic, it enhances maintainability and readability across various controllers in the codebase, promoting a cohesive architecture for error handling and success messaging in the application.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/controllers/tutorProfile.controller.ts'>tutorProfile.controller.ts</a></b></td>
							<td style='padding: 8px;'>- TutorProfileController manages the retrieval and updating of tutor profiles within the application<br>- It ensures that tutors can access their personal information, including education, experience, and subjects taught, while also allowing for updates to their profile details<br>- By integrating validation and authorization checks, it maintains data integrity and security, contributing to a seamless user experience in the overall codebase architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/controllers/public.controller.ts'>public.controller.ts</a></b></td>
							<td style='padding: 8px;'>- PublicController serves as a key component in the project architecture, facilitating the retrieval of categories and subjects from the database<br>- It provides endpoints to access all categories and subjects, as well as specific entries by their IDs<br>- By leveraging Prisma for database interactions, it ensures efficient data management and enhances the overall functionality of the application, contributing to a seamless user experience.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/controllers/order.controller.ts'>order.controller.ts</a></b></td>
							<td style='padding: 8px;'>- OrderController manages the lifecycle of orders within the application, facilitating the creation, updating, deletion, and retrieval of orders<br>- It ensures that only authenticated users can perform these actions, enhancing security<br>- By interacting with the OrderService, it provides a structured interface for handling order-related operations, contributing to the overall architecture by maintaining a clear separation of concerns between the controller and service layers.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/controllers/HealthController.ts'>HealthController.ts</a></b></td>
							<td style='padding: 8px;'>- HealthController serves as a vital component of the application, providing an endpoint to assess the health status of the API<br>- It returns essential information such as the current status, uptime, timestamp, and environment, ensuring that users and monitoring systems can verify the operational state of the service<br>- This functionality enhances reliability and facilitates proactive maintenance within the overall codebase architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- services Submodule -->
			<details>
				<summary><b>services</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.services</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/services/user.service.ts'>user.service.ts</a></b></td>
							<td style='padding: 8px;'>- UserService facilitates the retrieval of tutor information within the application, specifically targeting users with the TUTOR role<br>- By providing essential details such as names, email addresses, and bios, it enhances the user experience and supports functionalities related to tutor management<br>- This service plays a crucial role in the overall architecture by ensuring seamless access to tutor data for other components of the codebase.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/services/invite.service.ts'>invite.service.ts</a></b></td>
							<td style='padding: 8px;'>- InviteService facilitates the management of invites within the application, enabling the creation, acceptance, refusal, and retrieval of invites related to tutoring orders<br>- By interacting with the database, it ensures that users can efficiently manage their invitations, enhancing the overall user experience in the tutoring platform<br>- This service plays a crucial role in connecting tutors and students through a structured invitation process.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/services/order.service.ts'>order.service.ts</a></b></td>
							<td style='padding: 8px;'>- OrderService manages the lifecycle of orders within the application, enabling students to create, update, delete, and retrieve orders<br>- It ensures proper validation based on category types, particularly for recurring sessions, and facilitates filtering orders by student or tutor<br>- This service plays a crucial role in maintaining order integrity and enhancing user experience in the overall codebase architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- middlewares Submodule -->
			<details>
				<summary><b>middlewares</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.middlewares</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/middlewares/errorHandler.ts'>errorHandler.ts</a></b></td>
							<td style='padding: 8px;'>- Error handling middleware enhances the robustness of the application by managing errors consistently across the codebase<br>- It captures both custom application errors and generic server errors, providing structured responses to clients<br>- By integrating this middleware, the project ensures that error information is communicated clearly, improving the overall user experience and facilitating easier debugging for developers.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/middlewares/corsMiddleware.ts'>corsMiddleware.ts</a></b></td>
							<td style='padding: 8px;'>- Enables Cross-Origin Resource Sharing (CORS) functionality within the application, facilitating secure interactions between the server and client across different origins<br>- By managing HTTP headers, it ensures that resources can be accessed by web applications hosted on different domains, thereby enhancing the overall flexibility and interoperability of the codebase architecture<br>- This middleware plays a crucial role in maintaining security while allowing necessary data exchanges.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/src/middlewares/authMiddleware.ts'>authMiddleware.ts</a></b></td>
							<td style='padding: 8px;'>- AuthMiddleware serves as a crucial component in the projects architecture by managing user authentication and authorization processes<br>- It ensures that only authenticated users can access protected routes, thereby enhancing the security of the application<br>- By validating tokens and user credentials, it streamlines the flow of user interactions, contributing to a robust and secure user experience throughout the codebase.</td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- prisma Submodule -->
	<details>
		<summary><b>prisma</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ prisma</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Kukuliak-Dmytro/mindforge-backend/blob/master/prisma/schema.prisma'>schema.prisma</a></b></td>
					<td style='padding: 8px;'>- Defines the data model and relationships for a tutoring platform, facilitating user management, order processing, and communication between students and tutors<br>- It establishes roles, educational backgrounds, subjects, and categories, while enabling the tracking of orders, sessions, reviews, and chat interactions<br>- This schema serves as the backbone for the application, ensuring efficient data handling and integrity across various functionalities.</td>
				</tr>
			</table>
		</blockquote>
	</details>
</details>

---

## 🚀 Getting Started

### 📋 Prerequisites

This project requires the following dependencies:

- **Programming Language:** TypeScript
- **Package Manager:** Npm
- **Container Runtime:** Docker

### ⚙️ Installation

Build mindforge-backend from the source and intsall dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/Kukuliak-Dmytro/mindforge-backend
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd mindforge-backend
    ```

3. **Install the dependencies:**

**Using [docker](https://www.docker.com/):**

```sh
❯ docker build -t Kukuliak-Dmytro/mindforge-backend .
```
**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

### 💻 Usage

Run the project with:

**Using [docker](https://www.docker.com/):**

```sh
docker run -it {image_name}
```
**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### 🧪 Testing

Mindforge-backend uses the {__test_framework__} test framework. Run the test suite with:

**Using [docker](https://www.docker.com/):**

```sh
echo 'INSERT-TEST-COMMAND-HERE'
```
**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

## 📈 Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## ✨ Acknowledgments

- Credit `contributors`, `inspiration`, `references`, etc.

<div align="left"><a href="#top">⬆ Return</a></div>

---
