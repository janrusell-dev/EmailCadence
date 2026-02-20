<a name="readme-top"></a>

# Email Cadence

<p align="center"> <a href="https://github.com/janrusell-dev/EmailCadence"> </a> <h3 align="center">Email Cadence</h3> <p align="center"> A TypeScript monorepo for creating and running email workflows with Temporal.io. <br /> <a href="https://github.com/janrusell-dev/EmailCadence"><strong>Explore the repo »</strong></a> </p> </p>

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Monorepo Scripts](#monorepo-scripts)

---

## About The Project

Email Cadence is a monorepo TypeScript project to:

- Create an email cadence with multiple steps (SEND_EMAIL, WAIT).

- Enroll contacts and execute workflows sequentially.

- Update running cadences in real-time — workflows adapt automatically.

- Mock email sending (no real emails are sent).

**Tech stack:** Next.js (frontend), NestJS (API), Temporal.io (worker), Turborepo (monorepo), PNPM (package management).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Built With

- ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white) – Frontend framework
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) + ![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) / ![ShadCN](https://img.shields.io/badge/ShadCN-8B5CF6?style=for-the-badge&logo=shadcn&logoColor=white) – UI components
- ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) – API framework
- ![Temporal](https://img.shields.io/badge/Temporal-F4B400?style=for-the-badge&logo=temporal&logoColor=white) – Workflow engine
- ![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white) – Monorepo management
- ![PNPM](https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white) – Package management

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js >= 20

- PNPM >= 9

- Temporal.io server (local or remote)

```bash
npm install -g pnpm@latest
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

1. Clone the repository:

```bash

git clone https://github.com/janrusell-dev/EmailCadence.git
cd EmailCadence
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure Temporal.io in a .env file (API & Worker apps):

```env
TEMPORAL_NAMESPACE=default
TEMPORAL_TASK_QUEUE=email-cadence
TEMPORAL_SERVER_ADDRESS=localhost:7233
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

1. Run the monorepo:

```bash
pnpm dev
```

2. Individual apps:

```bash
pnpm dev:web # Next.js frontend
pnpm dev:api # NestJS API
pnpm dev:worker # Temporal.io Worker
pnpm dev:temporal # Start Temporal.io server locally

```

### API Examples

#### Create a cadence (POST /cadences)

```json
{
  "id": "cad_123",
  "name": "Welcome Flow",
  "steps": [
    { "id": "1", "type": "SEND_EMAIL", "subject": "Welcome", "body": "Hello!" },
    { "id": "2", "type": "WAIT", "seconds": 10 },
    {
      "id": "3",
      "type": "SEND_EMAIL",
      "subject": "Follow up",
      "body": "Checking in"
    }
  ]
}
```

#### Enroll a contact (POST /enrollments)

```json
{
  "cadenceId": "cad_123",
  "contactEmail": "user@example.com"
}
```

#### Poll enrollment state (GET /enrollments/:id)

Returns currentStepIndex, status, and stepsVersion.

#### Update a running cadence (POST /enrollments/:id/update-cadence)

```json
{
  "steps": [
    {
      "id": "1",
      "type": "SEND_EMAIL",
      "subject": "Updated Email",
      "body": "Hello!"
    }
  ]
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

```bash
EmailCadence/
├── apps/
│   ├── web/      # Next.js frontend
│   ├── api/      # NestJS API
│   └── worker/   # Temporal.io Worker
├── packages/shared/
├── package.json
├── tsconfig.base.json
├── turbo.json
└── README.md
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Monorepo Scripts

| Script       | Description                         |
| ------------ | ----------------------------------- |
| dev          | Run web + api + worker concurrently |
| dev:web      | Start Next.js frontend              |
| dev:api      | Start NestJS API                    |
| dev:worker   | Start Temporal.io worker            |
| dev:temporal | Start Temporal.io server locally    |
| build        | Build all apps via Turborepo        |
| lint         | Run linters via Turborepo           |
| format       | Prettier code formatting            |
| check-types  | TypeScript type check via Turborepo |

<p align="right">(<a href="#readme-top">back to top</a>)</p>
