# HireMe - Job Posting Platform (Backend API)

A scalable, role-based job posting backend API built with **TypeScript**, **Express.js**, **MongoDB**, **Mongoose**, **JWT**, **Stripe**, **Zod**, and **Multer**. This platform supports job creation, secure applications with CV uploads, payment processing, and an admin approval system.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based user authentication
* Role-based access control: `ADMIN`, `EMPLOYEE`, `JOB_SEEKER`

### 💼 Job Management (EMPLOYEE only)

* Create, update, delete jobs
* View own posted jobs

### 📄 Application System (JOB\SEEKER only)

* Upload CV (PDF/DOCX, max 5MB)
* Create Stripe payment intent
* Confirm application with payment & file
* Prevent duplicate applications
* View own applications

### 🛡 Admin Panel (ADMIN only)

* View all applications
* Approve or reject submitted applications

---

## 📁 Folder Structure

```
src/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── validations/
├── utils/
├── uploads/
├── app.ts
├── server.ts
├── config/
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/mdashikkhan04/HireMe-Job-Posting-Platform.git
cd HireMe_backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

### 3. Start Development Server

```bash
npm run dev
```

---

## 📮 API Endpoints Summary

### 🔐 Auth

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register user         |
| POST   | `/api/auth/login`    | Login & get JWT token |

### 💼 Job Routes (EMPLOYEE only)

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | `/api/jobs/`        | Create a job  |
| GET    | `/api/jobs/my-jobs` | View own jobs |
| PUT    | `/api/jobs/:id`     | Update job    |
| DELETE | `/api/jobs/:id`     | Delete job    |

### 📄 Application Routes (JOB\_SEEKER only)

| Method | Endpoint                                  | Description             |
| ------ | ----------------------------------------- | ----------------------- |
| POST   | `/api/applications/create-payment-intent` | Create Stripe intent    |
| POST   | `/api/applications/confirm-application`   | Apply with payment + CV |
| GET    | `/api/applications/my-applications`       | View own applications   |

### 🛡 Admin Routes (ADMIN only)

| Method | Endpoint                             | Description           |
| ------ | ------------------------------------ | --------------------- |
| GET    | `/api/admin/applications`            | View all applications |
| PATCH  | `/api/admin/applications/:id/status` | Approve/Reject        |

---

## 🧠 Roles Summary

| Role        | Access                          |
| ----------- | ------------------------------- |
| ADMIN       | View + moderate applications    |
| EMPLOYEE    | Manage jobs                     |
| JOB\_SEEKER | Apply to jobs with CV & payment |

---

## 💳 Payment Flow

1. Job Seeker creates Stripe PaymentIntent
2. Job Seeker uploads CV & confirms application
3. Payment is verified via Stripe API
4. Invoice created & linked to application

---

## 🛠 Tech Stack

* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Auth:** JWT + Role Middleware
* **Validation:** Zod
* **Payment:** Stripe API
* **File Upload:** Multer (CVs)
* **Docs:** Postman, ERD

---

## 🧪 Postman Collection

✅ `HireMe.postman_collection.json` — ready to import.

---

## 🧾 ERD (Entity Relationship Diagram)

✅ `HireMe_ERD.pdf` — included in repo

### Entities:

* **User** → has many Jobs, Applications, Invoices
* **Job** → posted by Employee
* **Application** → has CV, user, job, status
* **Invoice** → linked with Application & user

---

## ✅ Deliverables Checklist

| Item                         | Included?                          |
| ---------------------------- | ---------------------------------- |
| ✅ GitHub repo                | ✅                                  |
| ✅ Clean code + comments      | ✅                                  |
| ✅ README with setup + routes | ✅                                  |
| ✅ ERD (PDF)                  | ✅ `HireMe_ERD.pdf`                 |
| ✅ Postman JSON               | ✅ `HireMe.postman_collection.json` |
| ✅ Hosted API (optional)      | ❌                                  |

---

## 📜 License

MIT License. Feel free to fork, modify, and use.
