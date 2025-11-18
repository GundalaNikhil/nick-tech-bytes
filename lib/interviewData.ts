import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
  TopicKey,
} from "./interviewTypes";
import { dockerQuestions, dockerResources } from "./topics/docker";
import { hldQuestions, hldResources } from "./topics/hld";
import { javaQuestions, javaResources } from "./topics/java";
import { lldQuestions, lldResources } from "./topics/lld";
import { reactQuestions, reactResources } from "./topics/react";
import { springBootQuestions, springBootResources } from "./topics/springBoot";

export type {
  Answer,
  DifficultyLevel,
  InterviewQuestionsMap,
  InterviewResourcesMap,
  Question,
  Section,
  TopicKey,
} from "./interviewTypes";

export const topicsList: TopicKey[] = [
  "Java",
  "SpringBoot",
  "ReactJS",
  "HLD",
  "LLD",
  "Docker",
];

export const interviewQuestions: InterviewQuestionsMap = {
  Java: javaQuestions,
  SpringBoot: springBootQuestions,
  ReactJS: reactQuestions,
  HLD: hldQuestions,
  LLD: lldQuestions,
  Docker: dockerQuestions,
};

export const interviewResources: InterviewResourcesMap = {
  Java: javaResources,
  SpringBoot: springBootResources,
  ReactJS: reactResources,
  HLD: hldResources,
  LLD: lldResources,
  Docker: dockerResources,
};
