# Just-In-Time Software Bug Prediction

> Predicting the merge risk of a GitHub pull request at the moment it's proposed — using Machine Learning trained on the ApacheJIT dataset.

---

## Current Status

✅ Exploratory Data Analysis (EDA)

✅ Data Preprocessing

✅ Logistic Regression (Baseline Model)

✅ Random Forest Classifier

✅ XGBoost Implementation

✅ SHAP Explainability Analysis

✅ Pull Request–Based Web Application

**Project Status: Completed**

---

## Live Demo

| Component | Platform | Link |
| --------- | -------- | ---- |
| Frontend  | Vercel   | [jit-bug-prediction.vercel.app](https://jit-bug-prediction.vercel.app) |
| Backend API | Render | [jit-bug-prediction-1.onrender.com](https://jit-bug-prediction-1.onrender.com) |

Paste a **GitHub pull request URL** — not just a repository — to get a real-time merge-risk assessment for that exact set of proposed changes, powered by the XGBoost model.

---

## Project Overview

Software defects introduced during development significantly increase maintenance costs and reduce software reliability. Traditional defect prediction approaches operate at the file or module level and often identify defects too late — after code has already reached the main branch.

**Just-In-Time (JIT) Bug Prediction** addresses this by evaluating a pull request at the exact moment someone is deciding whether to merge it. Rather than flagging risk after the fact, the tool studies the pull request's actual diff and returns a risk level with a clear merge recommendation, so reviewers can act *before* the change ships.

This project was carried out as a **2-Credit Summer Research Project** under the supervision of **Dr. Kumar Rajnish**, Department of Computer Science & Engineering, Birla Institute of Technology, Mesra.

---

## Project Information

| Field         | Details                              |
| ------------- | ------------------------------------ |
| Project Title | Just-In-Time Software Bug Prediction |
| Student       | Parv Chaturvedi (BTECH/10408/23)     |
| Department    | Computer Science & Engineering       |
| Institute     | Birla Institute of Technology, Mesra |
| Supervisor    | Dr. Kumar Rajnish                    |
| Project Type  | Summer Research Project              |
| Credits       | 2                                    |

---

## Problem Statement

Software bugs are among the primary causes of software failures and maintenance overhead. Detecting defect-inducing changes at the pull request stage — before they're merged — enables:

* Improved software quality
* Reduced debugging effort
* Faster, more focused code review
* Lower maintenance costs
* More reliable software releases

The objective of this project was to build machine learning models capable of identifying potentially buggy changes using commit/PR-level software metrics, and to deploy the best-performing model as a pull-request-aware web application that gives a clear merge recommendation.

---

## Dataset

### ApacheJIT Dataset

The models are trained on ApacheJIT, a widely used benchmark dataset for Just-In-Time defect prediction research.

| Property             | Value                          |
| --------------------- | ------------------------------- |
| Dataset Name          | ApacheJIT                      |
| Total Commits         | 106,674                        |
| Bug-Inducing Commits  | 28,239                         |
| Clean Commits         | 78,435                         |
| Projects              | 14 Apache Open Source Projects |
| Time Period           | 2003–2019                      |
| Source                | Zenodo Repository              |

Dataset Source: https://zenodo.org/records/5907002

---

## Feature Set

### Code Change Metrics (computed live from each pull request's diff)

| Feature | Description                    |
| ------- | -------------------------------- |
| LA      | Lines Added                    |
| LD      | Lines Deleted                  |
| NF      | Number of Modified Files       |
| ND      | Number of Modified Directories |
| NS      | Number of Modified Subsystems  |
| ENT     | Entropy of Changes (how scattered the change is across files) |

### Historical & Developer Experience Metrics (currently dataset averages — see [Known Limitations](#known-limitations))

| Feature | Description                                 |
| ------- | -------------------------------------------- |
| NDEV    | Number of Developers Who Modified the Files |
| AGE     | Average Time Between Changes                |
| NUC     | Number of Unique Changes                    |
| AEXP    | Overall Developer Experience                |
| AREXP   | Recent Developer Experience                 |
| ASEXP   | Subsystem Experience                        |

### Target Variable

| Variable | Description                                |
| -------- | -------------------------------------------- |
| BUGGY    | 1 = Bug-Inducing Change, 0 = Clean Change |

---

## Data Preprocessing

* Removal of non-predictive identifier columns
* Feature selection for software metrics
* Time-aware chronological sorting
* Chronological train-test split (80:20)
* Class imbalance handling using SMOTE
* Feature normalization using StandardScaler (for Logistic Regression)
* Prevention of data leakage by applying transformations only on training data

---

## Methodology

```text
Raw ApacheJIT Dataset
          │
          ▼
Exploratory Data Analysis
          │
          ▼
Data Preprocessing
          │
          ▼
Time-Aware Train/Test Split
          │
          ▼
SMOTE Oversampling
          │
          ▼
Feature Scaling (LR)
          │
          ▼
Machine Learning Models (LR / RF / XGBoost)
          │
          ▼
Model Evaluation & Comparison
          │
          ▼
SHAP Explainability Analysis
          │
          ▼
Pull-Request-Based Web Application
```

---

## Models Implemented

### 1. Logistic Regression (Baseline Model)

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 69.24% |
| Precision | 30.46% |
| Recall    | 68.64% |
| F1 Score  | 42.19% |
| ROC-AUC   | 0.7612 |

### 2. Random Forest Classifier

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 68.18% |
| Precision | 31.57% |
| Recall    | 80.97% |
| F1 Score  | 45.43% |
| ROC-AUC   | 0.8084 |

### 3. XGBoost Classifier (Final Deployed Model)

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 72.16% |
| Precision | 33.95% |
| Recall    | 74.23% |
| F1 Score  | 46.59% |
| ROC-AUC   | 0.8031 |

---

## Model Comparison

| Metric    | Logistic Regression | Random Forest | XGBoost |
| --------- | -------------------- | -------------- | ------- |
| Accuracy  | 69.24%               | 68.18%         | **72.16%** |
| Precision | 30.46%                | 31.57%         | **33.95%** |
| Recall    | 68.64%                | **80.97%**     | 74.23%  |
| F1 Score  | 42.19%                | 45.43%         | **46.59%** |
| ROC-AUC   | 0.7612                | **0.8084**     | 0.8031  |

### Key Findings

* Random Forest achieves the highest Recall and ROC-AUC — best when minimizing missed defects is the top priority.
* XGBoost achieves the highest Accuracy, Precision, and F1 Score — the best overall balance, and the model selected for deployment.
* Both ensemble methods clearly outperform the Logistic Regression baseline.
* Only XGBoost is currently wired into the live application; Random Forest and Logistic Regression remain trained but unused in production (see [Future Work](#future-work)).

---

## Explainability (SHAP Analysis)

SHAP (SHapley Additive exPlanations) is used to interpret XGBoost's predictions, both globally across the dataset and locally per pull request, as surfaced live in the deployed app.

### Global Feature Importance (Mean SHAP Value)

| Rank | Feature                | Mean SHAP Value |
| ---- | ------------------------ | ------------------ |
| 1    | LA (Lines Added)        | 0.9872              |
| 2    | ENT (Entropy)           | 0.4948              |
| 3    | NF (Modified Files)     | 0.3697              |
| 4    | AGE                      | 0.2908              |
| 5    | ASEXP (Subsystem Exp.)  | 0.2710              |

The most influential factors associated with defect-inducing changes are large code additions, highly scattered modifications, changes touching many files, older files, and lower subsystem experience — consistent with prior software engineering literature on defect prediction.

---

## Web Application

### How It Works

1. User pastes a **GitHub pull request URL** (e.g. `https://github.com/owner/repo/pull/123`) into the frontend.
2. The backend calls the GitHub API to fetch that PR's real file diff — additions, deletions, files/directories/subsystems touched, and change entropy.
3. Historical/experience features not available per-PR from the GitHub API are filled in using dataset-wide averages (see [Known Limitations](#known-limitations)).
4. The XGBoost model predicts a bug probability and risk level (LOW / MEDIUM / HIGH).
5. SHAP computes the top features driving that specific prediction.
6. The app returns a **merge recommendation** — "Safe to Merge" for low risk, or "Review Recommended" for medium/high risk — along with a direct link to the pull request on GitHub.

### Architecture

```text
┌───────────────────┐        POST /predict        ┌───────────────────────┐
│  Frontend (Vercel)  │ ───────────────────────────▶│  Backend (Render)      │
│  React + Vite        │                             │  Flask API              │
│                       │◀───────────────────────────│  XGBoost + SHAP          │
└───────────────────┘        JSON response          └───────────────────────┘
                                                                │
                                                                ▼
                                                       GitHub REST API
                                                (pull request diff + repo stats)
```

---

## Known Limitations

* **Partial live data.** Of the 12 model features, 6 (`LA, LD, NF, ND, NS, ENT`) are computed from the pull request's real diff. The remaining 6 (`NDEV, AGE, NUC, AEXP, AREXP, ASEXP`) are currently dataset-wide averages rather than values specific to the PR, author, or repository, since the GitHub API doesn't expose these cheaply. This means the risk score is only partly personalized to the specific PR being analyzed.
* **Only one of three trained models is deployed.** Random Forest and Logistic Regression are trained and evaluated but not currently used in the live prediction endpoint.
* **No CI / review status shown.** The app does not yet surface whether a PR's checks are passing, whether it has merge conflicts, or whether it already has human reviewer approval — all of which matter for a real merge decision alongside the model's score.
* **Rate limits.** GitHub API requests are limited to 60/hour unauthenticated, or 5,000/hour with a `GITHUB_TOKEN` configured on the backend.

---

## Repository Structure

```text
jit-bug-prediction/
│
├── data/
│   ├── apachejit.csv
│   ├── processed.csv
│   └── processed_data.csv
│
├── notebooks/
│   ├── 01_EDA.ipynb
│   ├── 02_Preprocessing.ipynb
│   ├── 03_LR_Model_Training.ipynb
│   ├── 04_Random_Forest.ipynb
│   ├── 05_XGBoost.ipynb
│   ├── 06_Model_Comparison.ipynb
│   └── 07_SHAP_Analysis.ipynb
│
├── models/
│   ├── logistic_regression.pkl
│   ├── logistic_scaler.pkl
│   ├── random_forest.pkl
│   └── xgboost.pkl
│
├── outputs/
│   ├── plots/
│   └── tables/
│
├── backend/
│   ├── app.py
│   ├── github_service.py
│   ├── requirements.txt
│   ├── runtime.txt
│   └── Procfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── README.md
├── requirements.txt
└── .gitignore
```

---

## Technology Stack

| Category              | Tools                            |
| ---------------------- | ----------------------------------- |
| Programming Language  | Python, JavaScript                 |
| ML Development         | Google Colab                       |
| Data Processing        | Pandas, NumPy                      |
| Machine Learning       | Scikit-Learn, XGBoost, Imbalanced-Learn |
| Explainability          | SHAP                                |
| Visualization           | Matplotlib, Seaborn                |
| Model Persistence      | Joblib                              |
| Backend Framework      | Flask, Flask-CORS                   |
| Frontend Framework     | React, Vite, Tailwind CSS           |
| Backend Hosting        | Render                              |
| Frontend Hosting       | Vercel                              |
| External API            | GitHub REST API (Pull Requests)     |
| Version Control         | Git & GitHub                        |

---

## Reproducibility

### Machine Learning Pipeline

```bash
pip install -r requirements.txt
```

Run notebooks in order:

```text
01_EDA.ipynb
↓
02_Preprocessing.ipynb
↓
03_LR_Model_Training.ipynb
↓
04_Random_Forest.ipynb
↓
05_XGBoost.ipynb
↓
06_Model_Comparison.ipynb
↓
07_SHAP_Analysis.ipynb
```

### Running the Web App Locally

**Backend:**

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Set a `GITHUB_TOKEN` environment variable to raise the GitHub API rate limit from 60 to 5,000 requests/hour.

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

### Example Usage

```
Input:  https://github.com/facebook/react/pull/1234
Output: Risk Level, Bug Probability, Safe-to-Merge Recommendation,
        Top SHAP Features, Pull Request Details
```

---

## Current Best Model

### XGBoost Classifier (Deployed in Production)

| Metric   | Score  |
| -------- | ------ |
| Accuracy | 72.16% |
| F1 Score | 46.59% |
| ROC-AUC  | 0.8031 |

XGBoost offered the strongest overall balance of accuracy, precision, and F1 score among the evaluated models and was selected as the model powering the live prediction service.

---

## Future Work

* Replace dataset-average features (`NDEV, AGE, NUC, AEXP, AREXP, ASEXP`) with real values computed from GitHub's per-file and per-author commit history
* Surface all three trained models (or an agreement-based confidence score) in the UI instead of XGBoost alone
* Show CI check status, merge conflicts, and reviewer approval alongside the model's risk score
* Add caching to avoid re-analyzing the same pull request repeatedly
* Support batch analysis of multiple pull requests
* Add user authentication and prediction history tracking

---

## References

1. Kamei, Y., et al. (2013). *A Large-Scale Empirical Study of Just-In-Time Quality Assurance*. IEEE Transactions on Software Engineering.
2. Ni, C., et al. (2022). *Just-In-Time Defect Prediction on JavaScript Projects: A Replication Study*. MSR 2022.
3. Lundberg, S. M., & Lee, S.-I. (2017). *A Unified Approach to Interpreting Model Predictions*. NeurIPS.
4. ApacheJIT Dataset: https://zenodo.org/records/5907002

---

## Supervisor

**Dr. Kumar Rajnish**

Department of Computer Science & Engineering

Birla Institute of Technology, Mesra

---

*Research Project | Software Engineering | Machine Learning | Defect Prediction*
