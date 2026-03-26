# Gemini API & CLI Quotas (March 2026)

### 1. Gemini API (Google AI Studio) - Free Tier
*Note: Data may be used for model training on the free tier.*

| Model | Rate Limit (RPM) | Daily Limit (RPD) | Context Window |
| :--- | :--- | :--- | :--- |
| **Gemini 2.5 Flash** | 15 Requests / Min | 1,000 Requests / Day | 1 Million Tokens |
| **Gemini 2.5 Pro** | 5 Requests / Min | 100 Requests / Day | 1 Million Tokens |
| **Gemini 2.5 Flash-Lite** | 15 Requests / Min | 1,000 Requests / Day | 1 Million Tokens |

### 2. Gemini CLI Specific Quotas
Quotas depend on the authentication method used:
- **Unpaid API Key:** 10 RPM / 250 RPD (Limited to Flash models).
- **Google Account (Code Assist):** 60 RPM / 1,000 RPD.

### 3. Gemini Web App (Consumer/Personal)
- **General Access:** Unlimited basic chatting (subject to capacity).
- **Deep Research:** 5 reports/month.
- **Image Generation:** 20 images/day.
- **Audio Overviews:** 20/day.

## Available Gemini CLI Tools & Sub-Agents

### Available Tools
Tools allow the model to interact with the local environment, access information, and perform actions.

| Category | Tool | Description |
| :--- | :--- | :--- |
| **Execution** | `run_shell_command` | Executes arbitrary shell commands. |
| **File System** | `glob` | Finds files matching specific patterns. |
| | `grep_search` | Searches for patterns within file contents. |
| | `list_directory` | Lists files and subdirectories in a path. |
| | `read_file` | Reads the content of a specific file (text, images, audio, PDF). |
| | `read_many_files` | Reads and concatenates content from multiple files (triggered by `@`). |
| | `replace` | Performs precise text replacement within a file. |
| | `write_file` | Creates or overwrites a file with new content. |
| **Interaction** | `ask_user` | Requests clarification or missing information from the user. |
| | `write_todos` | Maintains an internal list of subtasks to track progress. |
| **Memory** | `activate_skill` | Loads specialized procedural expertise (skills) from `.gemini/skills`. |
| | `get_internal_docs` | Accesses Gemini CLI's own documentation. |
| | `save_memory` | Persists facts and project details to the `GEMINI.md` file. |
| **Planning** | `enter_plan_mode` | Switches to a read-only mode for researching complex changes. |
| | `exit_plan_mode` | Finalizes a plan and requests approval to start implementation. |
| **System** | `complete_task` | Finalizes a sub-agent's mission (internal use only). |
| **Web** | `google_web_search` | Performs a Google Search for up-to-date information. |
| | `web_fetch` | Retrieves and processes content from specific URLs. |

### Available Sub-agents
Sub-agents are specialized agents that handle complex tasks within a separate context loop.

- **`codebase_investigator`**: Analyzes the codebase, reverse engineers logic, and understands complex dependencies.
- **`cli_help`**: An expert agent for Gemini CLI itself, providing information on commands, configuration, and documentation.
- **`generalist_agent`**: Used internally to route tasks to the appropriate specialized sub-agent.
- **`browser_agent` (experimental)**: Automates web browser tasks such as navigating sites, filling forms, and extracting information.
