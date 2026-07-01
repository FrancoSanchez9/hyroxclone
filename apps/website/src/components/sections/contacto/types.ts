export type ContactState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  sent: boolean;
  errors: Record<string, boolean>;
};

export type ContactAction =
  | { type: "setField"; field: "name" | "email" | "subject" | "message"; value: string }
  | { type: "setErrors"; errors: Record<string, boolean> }
  | { type: "submit" }
  | { type: "reset" };
