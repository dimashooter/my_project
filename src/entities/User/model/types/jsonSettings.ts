import { Theme } from "@/app/providers/ThemeProvider";

export interface JsonSettings {
  theme?:Theme,
  isFirstVisited?:boolean,
  isArticlePageWasOpened?:boolean
}