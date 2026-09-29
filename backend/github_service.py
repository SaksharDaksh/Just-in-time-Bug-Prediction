import requests
import os
import math

# --------------------------------------------------
# GitHub Personal Access Token
# --------------------------------------------------
# For local testing only.
# Before publishing the project, replace this with:
# TOKEN = os.getenv("GITHUB_TOKEN")
# --------------------------------------------------

TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
}

if TOKEN:
    HEADERS["Authorization"] = f"Bearer {TOKEN}"


# --------------------------------------------------
# Helper function
# --------------------------------------------------

def github_get(url):
    response = requests.get(
        url,
        headers=HEADERS,
        timeout=15
    )

    if response.status_code == 404:
        raise Exception("Repository not found.")

    if response.status_code == 401:
        raise Exception("Invalid GitHub token.")

    if response.status_code == 403:
        data = response.json()

        message = data.get("message", "")

        if "rate limit" in message.lower():
            raise Exception("GitHub API rate limit exceeded.")

        raise Exception(message)

    response.raise_for_status()

    return response.json()


# --------------------------------------------------
# Parse Repository URL
# --------------------------------------------------

def parse_repo(repo_url):

    repo_url = repo_url.strip().rstrip("/")

    if not repo_url.startswith("https://github.com/"):
        raise Exception("Invalid GitHub repository URL.")

    parts = repo_url.split("/")

    if len(parts) < 5:
        raise Exception("Invalid GitHub repository URL.")

    owner = parts[-2]
    repo = parts[-1]

    return owner, repo


# --------------------------------------------------
# Parse Pull Request URL
# --------------------------------------------------

def parse_pr_url(pr_url):

    pr_url = pr_url.strip().rstrip("/")

    if not pr_url.startswith("https://github.com/"):
        raise Exception(
            "Invalid GitHub pull request URL. "
            "Expected format: https://github.com/owner/repo/pull/123"
        )

    parts = pr_url.split("/")

    if "pull" not in parts:
        raise Exception(
            "That looks like a repository URL, not a pull "
            "request URL. Expected format: "
            "https://github.com/owner/repo/pull/123"
        )

    try:
        pull_index = parts.index("pull")
        owner = parts[pull_index - 2]
        repo = parts[pull_index - 1]
        pr_number = int(parts[pull_index + 1])

    except (ValueError, IndexError):
        raise Exception(
            "Invalid GitHub pull request URL. "
            "Expected format: https://github.com/owner/repo/pull/123"
        )

    return owner, repo, pr_number


# --------------------------------------------------
# Pull Request Metrics
# --------------------------------------------------

def get_pull_request_metrics(pr_url):

    owner, repo, pr_number = parse_pr_url(pr_url)

    pr_api_url = (
        f"https://api.github.com/repos/"
        f"{owner}/{repo}/pulls/{pr_number}"
    )

    pr = github_get(pr_api_url)

    files_url = (
        f"https://api.github.com/repos/"
        f"{owner}/{repo}/pulls/{pr_number}/files"
    )

    files = github_get(files_url)

    if not isinstance(files, list):
        files = []

    # ---- Directories / subsystems touched ----

    directories = set()
    subsystems = set()

    for f in files:
        path = f.get("filename", "")
        segments = path.split("/")

        if len(segments) > 1:
            directories.add("/".join(segments[:-1]))
            subsystems.add(segments[0])
        else:
            directories.add(".")
            subsystems.add(".")

    # ---- Entropy of change distribution across files ----
    # Higher entropy = changes are more scattered across files,
    # which prior JIT research links to higher defect risk.

    churns = [
        f.get("additions", 0) + f.get("deletions", 0)
        for f in files
    ]

    total_churn = sum(churns)

    if total_churn > 0:
        entropy = -sum(
            (c / total_churn) * math.log2(c / total_churn)
            for c in churns if c > 0
        )
    else:
        entropy = 0.0

    return {
        "number": pr.get("number"),
        "title": pr.get("title"),
        "author": (pr.get("user") or {}).get("login"),
        "state": pr.get("state"),
        "base_branch": (pr.get("base") or {}).get("ref"),
        "head_branch": (pr.get("head") or {}).get("ref"),
        "created_at": pr.get("created_at"),
        "commits": pr.get("commits", 0),
        "url": pr.get("html_url"),

        "la": pr.get("additions", 0),
        "ld": pr.get("deletions", 0),
        "nf": pr.get("changed_files", len(files)),
        "nd": len(directories),
        "ns": len(subsystems),
        "ent": round(entropy, 4),
    }


# --------------------------------------------------
# Repository Statistics
# --------------------------------------------------

def get_repository_stats(repo_url):

    owner, repo = parse_repo(repo_url)

    repo_url_api = (
        f"https://api.github.com/repos/"
        f"{owner}/{repo}"
    )

    data = github_get(repo_url_api)

    return {

        "name": data.get("name"),

        "owner": data.get("owner", {}).get("login"),

        "description": data.get("description"),

        "stars": data.get("stargazers_count", 0),

        "forks": data.get("forks_count", 0),

        "issues": data.get("open_issues_count", 0),

        "language": data.get("language", "Unknown"),

        "watchers": data.get("watchers_count", 0),

        "default_branch": data.get("default_branch"),

        "license": (
            data.get("license", {}) or {}
        ).get("name", "None"),

        "created_at": data.get("created_at"),

        "updated_at": data.get("updated_at")
    }
