class Template{
  constructor(title = "", description = "", key = "") {
    this.title = title;
    this.description = description;
    this.key = key;
  }
}

//aligns with templates enum on server
export const TEMPLATE_TYPES = Object.freeze({
  "SCORE_BASIC": "SCORE_BASIC",
  "SCORE_WPM": "SCORE_WPM",
  "SCORE_CUE": "SCORE_CUE",
  "SCORE_BEST_OUT_OF": "SCORE_BEST_OUT_OF"
});

export const TemplateList = {
  "score": [
    new Template(
      "Score Keeping",
      "A simple 'right or wrong' score-based trial. Create one or more tracks, give them a label and mark it as right or wrong to get the score and accuracy percentage.",
      TEMPLATE_TYPES.SCORE_BASIC
    ),
    new Template(
      "X out of Y",
      "A super simple X out of Y trial to calculate a score percentage.",
      TEMPLATE_TYPES.SCORE_BEST_OUT_OF
    ),
    new Template(
      "Cue Counting",
      "Choose this template for keeping track of how many times you assist the student with a certain cue.",
      TEMPLATE_TYPES.SCORE_CUE
    ),
    new Template(
      "Words-Per-Minute",
      "Keep count on the gross words-per-minute your student can read with a built in timer!",
      TEMPLATE_TYPES.SCORE_WPM
    )
  ],
  "frequency": [new Template("No Templates", "More templates coming soon!", "frequency")],
  "duration": [new Template("No Templates", "More templates coming soon!", "duration")],
  "other": [new Template("Task Analysis", "Analyze a task.", "taskAnalysis")]
}