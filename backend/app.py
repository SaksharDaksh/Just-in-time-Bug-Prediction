from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import joblib
import shap

from pathlib import Path

from github_service import (
    get_pull_request_metrics,
    get_repository_stats,
    parse_pr_url
)

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "https://jit-bug-prediction.vercel.app"
            ]
        }
    }
)

# ----------------------------------------------------
# Paths
# ----------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR.parent / "models" / "xgboost.pkl"
DATA_PATH = BASE_DIR.parent / "data" / "processed_data.csv"

# ----------------------------------------------------
# Load Model
# ----------------------------------------------------

model = joblib.load(MODEL_PATH)

# SHAP Explainer
explainer = shap.TreeExplainer(model)

# ----------------------------------------------------
# Load Dataset
# ----------------------------------------------------

df = pd.read_csv(DATA_PATH)

FEATURE_COLUMNS = [
    "la",
    "ld",
    "nf",
    "nd",
    "ns",
    "ent",
    "ndev",
    "age",
    "nuc",
    "aexp",
    "arexp",
    "asexp"
]

feature_means = (
    df[FEATURE_COLUMNS]
    .mean()
    .to_dict()
)

# ----------------------------------------------------
# Home Route
# ----------------------------------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "JIT Bug Prediction API Running"
    })


# ----------------------------------------------------
# Prediction Route
# ----------------------------------------------------

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "error": "Invalid request body."
            }), 400

        pr_url = data.get("pr_url", "").strip()

        if not pr_url:
            return jsonify({
                "success": False,
                "error": "Please enter a GitHub pull request URL."
            }), 400

        # ------------------------------------------------
        # GitHub Data
        # ------------------------------------------------

        owner, repo, pr_number = parse_pr_url(pr_url)

        pr_metrics = get_pull_request_metrics(pr_url)

        repo_stats = get_repository_stats(
            f"https://github.com/{owner}/{repo}"
        )

        # ------------------------------------------------
        # Feature Vector
        # ------------------------------------------------
        # la, ld, nf, nd, ns, ent come straight from the
        # pull request's actual file diff. Historical /
        # experience features aren't available per-PR from
        # the GitHub API, so dataset averages are used for
        # those, same as the rest of the model's training data.

        features = [[
            pr_metrics["la"],
            pr_metrics["ld"],
            pr_metrics["nf"],
            pr_metrics["nd"],
            pr_metrics["ns"],
            pr_metrics["ent"],
            feature_means["ndev"],
            feature_means["age"],
            feature_means["nuc"],
            feature_means["aexp"],
            feature_means["arexp"],
            feature_means["asexp"]
        ]]

        # ------------------------------------------------
        # Prediction
        # ------------------------------------------------

        prediction = int(
            model.predict(features)[0]
        )

        probability = float(
            model.predict_proba(features)[0][1]
        )

        # ------------------------------------------------
        # SHAP
        # ------------------------------------------------

        feature_df = pd.DataFrame(
            features,
            columns=FEATURE_COLUMNS
        )

        shap_values = explainer.shap_values(feature_df)

        if isinstance(shap_values, list):
            shap_values = shap_values[0]

        shap_dict = {}

        for i, feature in enumerate(FEATURE_COLUMNS):
            shap_dict[feature] = float(
                shap_values[0][i]
            )

        top_features = sorted(
            shap_dict.items(),
            key=lambda x: abs(x[1]),
            reverse=True
        )[:5]

        # ------------------------------------------------
        # Risk Level
        # ------------------------------------------------

        if probability >= 0.7:
            risk = "HIGH"

        elif probability >= 0.4:
            risk = "MEDIUM"

        else:
            risk = "LOW"

        # ------------------------------------------------
        # Merge Recommendation
        # ------------------------------------------------

        if risk == "LOW":
            recommendation = (
                "No significant risk indicators detected. "
                "This pull request looks safe to merge."
            )
            safe_to_merge = True

        elif risk == "MEDIUM":
            recommendation = (
                "Some risk indicators detected. Consider an "
                "additional review before merging."
            )
            safe_to_merge = False

        else:
            recommendation = (
                "High risk of introducing a defect. Thorough "
                "review and testing are strongly recommended "
                "before merging."
            )
            safe_to_merge = False

        # ------------------------------------------------
        # Response
        # ------------------------------------------------

        return jsonify({

            "success": True,

            "repository": f"{owner}/{repo}",

            "prediction": prediction,

            "bug_probability": round(
                probability * 100,
                2
            ),

            "confidence": round(
                probability * 100,
                2
            ),

            "risk": risk,

            "safe_to_merge": safe_to_merge,

            "recommendation": recommendation,

            "pull_request": {

                "number": pr_metrics.get("number"),

                "title": pr_metrics.get("title"),

                "author": pr_metrics.get("author"),

                "state": pr_metrics.get("state"),

                "base_branch": pr_metrics.get("base_branch"),

                "head_branch": pr_metrics.get("head_branch"),

                "created_at": pr_metrics.get("created_at"),

                "commits": pr_metrics.get("commits"),

                "url": pr_metrics.get("url")

            },

            "metrics": {

                "la": pr_metrics.get("la"),

                "ld": pr_metrics.get("ld"),

                "nf": pr_metrics.get("nf"),

                "nd": pr_metrics.get("nd"),

                "ns": pr_metrics.get("ns"),

                "ent": pr_metrics.get("ent")

            },

            "repository_stats": repo_stats,

            "shap_insights": [

                {
                    "feature": feature,
                    "impact": round(value, 4)
                }

                for feature, value in top_features

            ]

        })

    except Exception as e:

        import traceback

        print("\n========== ERROR ==========")
        traceback.print_exc()
        print("===========================\n")

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


# ----------------------------------------------------
# Run Server
# ----------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)
