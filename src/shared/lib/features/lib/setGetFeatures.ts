import { LOCAL_STORAGE_LAST_THEME_KEY } from "@/app/providers/ThemeProvider/lib/ThemeContext";
import { FeatureFlags } from "@/shared/types/featureFlags";

const defaultFeatures:FeatureFlags = {
  isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_LAST_THEME_KEY) === 'new'
}

let featureFlags: FeatureFlags = {
  ...defaultFeatures
}


export const setFeatureFlags = (newFlag?:FeatureFlags) => { 
  if(newFlag){
    featureFlags = newFlag
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags){
  return featureFlags?.[flag]  
}

export function getAllFeatureFlags(){
    return featureFlags
}