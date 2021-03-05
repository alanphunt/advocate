export const SERVER_ERROR = "Oops, sorry! Something went wrong on our end, try again in a few minutes.";

export const STORAGE = sessionStorage;

export const OKAY_STATUS = 200;
export const UNAUTHORIZED_STATUS = 401;
export const FORBIDDEN_STATUS = 403;
export const BAD_REQUEST_STATUS = 400;

export const JWT_ERROR = "Authentication failed, please log back in to continue.";

export const BASIC_STUDENT_TABLE_HEADERS = ["Name", "Age", "Grade"];
export const BASIC_STUDENT_TABLE_KEYS = ["name", "age", "grade"];

export const JSON_HEADER = {"Content-Type": "application/json"};

export const FILE_UPLOAD_LIMIT = 15;
export const EMPTY_RICH_TEXT_FIELD = "This field is required.";

export const NOT_LOADING = {"":false};
export const HOME_LOADING = {"home":true};
export const CLASSROOM_LOADING = {"createClassroom":true};
export const EDIT_CLASSROOM_LOADING = {"editClassroom":true};
export const DELETE_CLASSROOM_LOADING = {"deleteClassroom":true};

export const GOAL_LOADING = {"createGoal":true};
export const COPY_GOAL_LOADING = {"copyGoal":true};
export const EDIT_GOAL_LOADING = {"editGoal":true};
export const DELETE_GOAL_LOADING = {"deleteGoal":true};

export const BASELINE_LOADING = {"createBaseline":true};
export const EDIT_BASELINE_LOADING = {"editBaseline":true};
export const DELETE_BASELINE_LOADING = {"deleteBaseline":true};

export const TRIAL_LOADING = {"createTrial":true};
export const EDIT_TRIAL_LOADING = {"editTrial":true};
export const DELETE_TRIAL_LOADING = {"deleteTrial":true};