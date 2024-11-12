export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Create your Resume",
    route: "/resume/create",
    icon: "/assets/icons/create.svg",
  },
  {
    label: "My resume",
    route: "/resume",
    icon: "/assets/icons/resume.svg",
  },

  {
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
];

export enum FormActions {
  CREATE = "create",
  UPDATE = "update",
}

export const FormValues = {
  [FormActions.CREATE]: {
    loading: "Resume creation...",
    button: "Create the resume",
  },
  [FormActions.UPDATE]: {
    loading: "Updating resume...",
    button: "Update the resume",
  },
};
