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
};

declare type CreateResumeParams = {
  userId: string;
  title: string;
  summary?: string;
  experiences: IExperience[];
  education: IEducation[];
  skills: ISkill[];
  languages: ILanguage[];
  certifications: ICertification[];
};

declare type UpdateResumeParams = {
  title?: string;
  summary?: string;
  experiences?: IExperience[];
  education?: IEducation[];
  skills?: ISkill[];
  languages?: ILanguage[];
  certifications?: ICertification[];
};
