export type TopicKey =
  | "Java"
  | "SpringBoot"
  | "ReactJS"
  | "HLD"
  | "LLD"
  | "Docker";

export type Answer = {
  text?: string;
  points?: string[];
  code?: string;
  language?: string;
  note?: string;
  examples?: string[];
};

export type Question = {
  question: string;
  answer: Answer;
};

export type Section = {
  title: string;
  questions: Question[];
};

export type InterviewQuestionsMap = Record<
  TopicKey,
  {
    icon: string;
    sections: Section[];
  }
>;

export type InterviewResourcesMap = Record<
  TopicKey,
  {
    icon: string;
    resources: {
      title: string;
      description: string;
      url: string;
      type: string;
    }[];
    keyTopics: string[];
  }
>;
