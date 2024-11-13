declare type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
  email: string;
};

declare type CreateResumeParams = {
  title: string;
  photo?: string;
  summary?: string;
  experiences: IExperience[];
  education: IEducation[];
  skills: ISkill[];
  languages: ILanguage[];
};

declare type UpdateResumeParams = {
  title?: string;
  photo?: string;
  summary?: string;
  experiences?: IExperience[];
  education?: IEducation[];
  skills?: ISkill[];
  languages?: ILanguage[];
  certifications?: ICertification[];
};
